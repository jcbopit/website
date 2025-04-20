let t = 0;
let trace = [];
let velocityHistory = [];
let lastVelocity = 0;
let cameraScale = 20;
let targetScale = 1.5;
let transitionSpeed = 0.017;

let hasSnapped = false;
let aboutShown = false;
let continueClicked = false;

let sparkCanvas, sparkCtx;

// Smooth transition variables
let cameraTransitioningToStatic = false;
let staticTransitionStartTime = 0;
let cameraTransitionDuration = 3000;
let cameraIsNowStatic = false;
let staticCameraScale = 1.5;
let staticCameraX = 0;
let staticCameraY = 0;
let currentCameraX = 0;
let currentCameraY = 0;
let currentCameraScale = 20;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("animation");
  canvas.style("z-index", "0");
  colorMode(HSB, 360, 100, 100, 100);
  strokeWeight(2.5);
  noFill();

  document.getElementById("continue-btn").addEventListener("click", () => {
    document.getElementById("about-overlay").style.opacity = "0";
    document.getElementById("about-overlay").style.pointerEvents = "none";
    document.getElementById("equation").style.opacity = "1";
    continueClicked = true;
  });

  sparkCanvas = document.getElementById("spark");
  sparkCanvas.width = window.innerWidth;
  sparkCanvas.height = 40;
  sparkCtx = sparkCanvas.getContext("2d");
}

function draw() {
  background(160, 10, 5);
  drawGrid();

  const numLayers = 5;
  const baseAmp = 110;
  const freqBase = 2;
  const phase = HALF_PI;

  let x = 0, y = 0, vx = 0, vy = 0;
  for (let i = 0; i < numLayers; i++) {
    const freq = pow(Math.E, i) * freqBase;
    const amp = baseAmp * pow(0.5, i);
    const angle = freq * t * TWO_PI + phase;
    x += amp * cos(angle);
    y += amp * sin(angle);
    vx += -amp * sin(angle) * freq * TWO_PI;
    vy += amp * cos(angle) * freq * TWO_PI;
  }

  const velocity = sqrt(vx * vx + vy * vy);
  const delta = velocity - lastVelocity;
  lastVelocity = velocity;

  trace.unshift(createVector(x, y));
  if (trace.length > 250) trace.pop();

  push();
  translate(width / 2, height / 2);

  if (!hasSnapped && !cameraTransitioningToStatic) {
    cameraScale = lerp(cameraScale, targetScale, transitionSpeed);
    scale(cameraScale);
    translate(-x, -y);
    if (abs(cameraScale - targetScale) < 0.1) {
      currentCameraScale = cameraScale;
      currentCameraX = x;
      currentCameraY = y;
      staticTransitionStartTime = millis();
      cameraTransitioningToStatic = true;
    }
  } else if (cameraTransitioningToStatic) {
    const elapsed = millis() - staticTransitionStartTime;
    const progress = constrain(elapsed / cameraTransitionDuration, 0, 1);
    const ease = 1 - pow(1 - progress, 3); // Cubic ease-out

    const camX = lerp(currentCameraX, staticCameraX, ease);
    const camY = lerp(currentCameraY, staticCameraY, ease);
    cameraScale = lerp(currentCameraScale, staticCameraScale, ease);

    scale(cameraScale);
    translate(-camX, -camY);

    if (progress >= 1) {
      cameraTransitioningToStatic = false;
      hasSnapped = true;
      if (!aboutShown) {
        setTimeout(() => {
          showAboutOverlay();
          aboutShown = true;
        }, 300);
      }
    }
  } else {
    scale(staticCameraScale);
    translate(continueClicked ? -x : 0, continueClicked ? -y : 0);
  }

  x = 0;
  y = 0;
  let prevX, prevY;

  for (let i = 0; i < numLayers; i++) {
    const freq = pow(Math.E, i) * freqBase;
    const amp = baseAmp * pow(0.5, i);
    const angle = freq * t * TWO_PI + phase;

    prevX = x;
    prevY = y;
    x += amp * cos(angle);
    y += amp * sin(angle);

    const hue = map(i, 0, numLayers - 1, 100, 160);

    stroke(hue, 80, 100);
    strokeWeight(2.5);
    noFill();
    ellipse(prevX, prevY, amp * 2);

    strokeWeight(1.5);
    stroke(hue, 90, 100);
    line(prevX, prevY, x, y);

    drawArrow(prevX, prevY, x, y, amp * 0.1, hue);
  }

  noFill();
  beginShape();
  for (let i = 0; i < trace.length; i++) {
    const v = trace[i];
    const alpha = map(i, 0, trace.length, 0, 100);
    stroke(160, 90, 100, alpha);
    vertex(v.x, v.y);
  }
  endShape();
  pop();

  t += 0.00035;

  updateMetrics(velocity, delta);
  renderEquation();
}

function drawArrow(x1, y1, x2, y2, size, hue) {
  const angle = atan2(y2 - y1, x2 - x1);
  push();
  translate(x2, y2);
  rotate(angle);
  fill(hue, 80, 100);
  noStroke();
  triangle(0, 0, -size, size / 2, -size, -size / 2);
  pop();
}

function drawGrid() {
  const spacing = 22;
  stroke(140, 20, 30);
  strokeWeight(0.3);
  for (let x = 0; x < width; x += spacing) {
    line(x, 0, x, height);
  }
  for (let y = 0; y < height; y += spacing) {
    line(0, y, width, y);
  }
}

function updateMetrics(v, delta) {
  const r = trace[0] ? trace[0].mag().toFixed(2) : "0.00";
  const deltaElem = document.getElementById("metric-delta");
  const velElem = document.getElementById("metric-velocity");
  const rElem = document.getElementById("metric-radius");

  rElem.textContent = r;
  velElem.textContent = v.toFixed(2);
  deltaElem.textContent = delta.toFixed(2);
  deltaElem.className = delta > 0 ? "value positive" : "value negative";

  document.getElementById("metric-t").textContent = t.toFixed(2);

  velocityHistory.push(v);
  if (velocityHistory.length > 200) velocityHistory.shift();
  drawVelocitySparkline();
}

function drawVelocitySparkline() {
  sparkCtx.clearRect(0, 0, sparkCanvas.width, sparkCanvas.height);
  sparkCtx.beginPath();
  sparkCtx.strokeStyle = "#00ffcc";
  sparkCtx.lineWidth = 1.3;

  const maxV = Math.max(...velocityHistory);
  const minV = Math.min(...velocityHistory);

  velocityHistory.forEach((val, i) => {
    const x = (i / velocityHistory.length) * sparkCanvas.width;
    const y = sparkCanvas.height - ((val - minV) / (maxV - minV + 1e-3)) * sparkCanvas.height;
    if (i === 0) sparkCtx.moveTo(x, y);
    else sparkCtx.lineTo(x, y);
  });

  sparkCtx.stroke();
}

function renderEquation() {
  const eq = String.raw`
    \vec{r}(t) = \sum_{i=0}^{n-1} A_i \cdot
    \begin{bmatrix}
    \cos(2\pi f_i t + \phi) \\\\
    \sin(2\pi f_i t + \phi)
    \end{bmatrix}
  `;
  const eqElement = document.getElementById("equation");
  if (window.katex && eqElement) {
    katex.render(eq, eqElement, {
      throwOnError: false,
      displayMode: true
    });
  }
}

function showAboutOverlay() {
  const overlay = document.getElementById("about-overlay");
  overlay.style.opacity = "1";
  overlay.style.pointerEvents = "auto";
  document.getElementById("equation").style.opacity = "0";
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (sparkCanvas) {
    sparkCanvas.width = window.innerWidth;
  }
}
