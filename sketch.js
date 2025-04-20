let t = 0;
let trace = [];
let cameraScale = 17.5;
let targetScale = 1.5;
let transitionSpeed = 0.017;

let hasSnapped = false;
let aboutShown = false;
let continueClicked = false;
let usingIntroAnimation = true;

let boids = [];
const numBoids = 15;
let flameParticles = [];
let backgroundStars = [];
let nebulaParticles = [];

let cameraTransitioningToStatic = false;
let staticTransitionStartTime = 0;
let cameraTransitionDuration = 4200;
let staticCameraScale = 1.5;
let staticCameraX = 0;
let staticCameraY = 0;
let currentCameraX = 0;
let currentCameraY = 0;
let currentCameraScale = 20;

let isMobile = false;

function setup() {
  isMobile = windowWidth < 600; 
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("animation");
  canvas.style("z-index", "0");
  colorMode(HSB, 360, 100, 100, 100);
  strokeWeight(isMobile ? 1.5 : 2.5);
  noFill();

  document.getElementById("continue-btn").addEventListener("click", () => {
    document.getElementById("about-overlay").style.opacity = "0";
    document.getElementById("about-overlay").style.pointerEvents = "none";
    document.getElementById("equation").style.opacity = "1";
    continueClicked = true;
    usingIntroAnimation = false;
    resetCamera();
  });

  for (let i = 0; i < numBoids; i++) {
    boids.push(new Boid(random(width), random(height)));
  }

  for (let i = 0; i < 200; i++) {
    backgroundStars.push({
      x: random(-width, 2 * width),
      y: random(-height, 2 * height),
      size: random(0.5, isMobile ? 1.8 : 2.5),
      depth: random(0.1, 1)
    });
  }

  for (let i = 0; i < (isMobile ? 10 : 20); i++) {
    nebulaParticles.push(new NebulaParticle());
  }
}

function draw() {
  background(0, 0, 0);
  drawParallaxStars();
  drawNebula();

  const numLayers = 4;
  const baseAmp = isMobile ? 55 : 110;
  const freqBase = 2;
  const phase = HALF_PI;

  let x = 0, y = 0;
  let positions = [];

  for (let i = 0; i < numLayers; i++) {
    const freq = pow(Math.E, i) * freqBase;
    const amp = baseAmp * (usingIntroAnimation ? pow(2, i) : pow(0.5, i));
    const angle = freq * t * TWO_PI + phase;
    let prevX = x;
    let prevY = y;
    x += amp * cos(angle);
    y += amp * sin(angle);
    positions.push({ prevX, prevY, x, y, amp });
  }

  trace.unshift(createVector(x, y));
  if (trace.length > 60) trace.pop();

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
    const ease = 1 - pow(1 - progress, 3);

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
  }

  for (let p of positions) {
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = color(0, 0, 100);
    stroke(0, 0, 100);
    strokeWeight(isMobile ? 2.5 : 4);
    ellipse(p.prevX, p.prevY, p.amp * 2);

    strokeWeight(2.5);
    line(p.prevX, p.prevY, p.x, p.y);
    drawingContext.shadowBlur = 0;
    drawArrow(p.prevX, p.prevY, p.x, p.y, p.amp * 0.1);
  }

  if (!usingIntroAnimation) {
    const numParticles = isMobile ? 3 : 5;
    for (let i = 0; i < numParticles; i++) flameParticles.push(new FlameParticle(x, y));
  }

  for (let i = flameParticles.length - 1; i >= 0; i--) {
    flameParticles[i].update();
    flameParticles[i].display();
    if (flameParticles[i].lifespan <= 0) flameParticles.splice(i, 1);
  }

  stroke(0, 0, 100, 8);
  strokeWeight(1.5);
  noFill();
  beginShape();
  for (let v of trace) vertex(v.x, v.y);
  endShape();

  for (let boid of boids) {
    if (!usingIntroAnimation) {
      boid.seek(createVector(x, y));
      boid.wiggle();
      boid.flock(boids);
    }
    boid.update();
    boid.show();
  }

  pop();
  t += 0.00035 * (usingIntroAnimation ? 0.15 : 1);
  renderEquation();
}

function drawParallaxStars() {
  push();
  translate(width / 2, height / 2);
  for (let star of backgroundStars) {
    const offsetX = (currentCameraX || 0) * star.depth;
    const offsetY = (currentCameraY || 0) * star.depth;
    drawingContext.shadowBlur = 8;
    drawingContext.shadowColor = color(0, 0, 100);
    fill(random(190, 230), 70, 100, random(60, 100));
    noStroke();
    ellipse(star.x - offsetX, star.y - offsetY, star.size);
    drawingContext.shadowBlur = 0;
  }
  pop();
}

function drawNebula() {
  push();
  translate(width / 2, height / 2);
  for (let p of nebulaParticles) {
    p.update();
    p.display();
  }
  pop();
}

class NebulaParticle {
  constructor() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.r = random(30, 150);
    this.hue = random(190, 240);
    this.alpha = random(4, 10);
    this.dx = random(-0.3, 0.3);
    this.dy = random(-0.3, 0.3);
  }
  update() {
    this.x += this.dx;
    this.y += this.dy;
  }
  display() {
    drawingContext.shadowBlur = 60;
    drawingContext.shadowColor = color(this.hue, 80, 100, this.alpha);
    noStroke();
    fill(this.hue, 80, 100, this.alpha);
    ellipse(this.x, this.y, this.r);
    drawingContext.shadowBlur = 0;
  }
}

class FlameParticle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(0.4, 1.1));
    this.lifespan = isMobile ? 25 : 40;
    this.size = random(3, 5);
    const hues = [0, 210, 220]; // white, light blue, dark blue
    this.hue = hues[floor(random(hues.length))];
    this.sat = this.hue === 0 ? 0 : 100;
  }
  update() {
    this.pos.add(this.vel);
    this.vel.y -= 0.015;
    this.lifespan -= 2;
  }
  display() {
    drawingContext.shadowBlur = 30;
    drawingContext.shadowColor = color(this.hue, this.sat, 100);
    noStroke();
    fill(this.hue, this.sat, 100, this.lifespan);
    ellipse(this.pos.x, this.pos.y, this.size);
    drawingContext.shadowBlur = 0;
  }
}

class Boid {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.acceleration = createVector();
    this.maxSpeed = 3;
    this.maxForce = 0.05;
    this.overshootFactor = random(1.1, 1.3);
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.position);
    desired.setMag(this.maxSpeed * this.overshootFactor);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    this.acceleration.add(steer);
  }

  wiggle() {
    let wiggle = p5.Vector.random2D().mult(0.2);
    this.acceleration.add(wiggle);
  }

  flock(_) {}

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  show() {
    drawingContext.shadowBlur = 25;
    drawingContext.shadowColor = color(200, 15, 100);
    fill(200, 10, 100);
    noStroke();
    ellipse(this.position.x, this.position.y, 4);
    drawingContext.shadowBlur = 0;
  }
}

function drawArrow(x1, y1, x2, y2, size) {
  const angle = atan2(y2 - y1, x2 - x1);
  push();
  translate(x2, y2);
  rotate(angle);
  drawingContext.shadowBlur = 15;
  drawingContext.shadowColor = color(0, 0, 100);
  fill(0, 0, 100);
  noStroke();
  triangle(0, 0, -size, size / 2, -size, -size / 2);
  drawingContext.shadowBlur = 0;
  pop();
}

function renderEquation() {
  const eq = String.raw`
    \vec{r}(t) = \sum_{i=0}^{n-1} A_i \cdot
    \begin{bmatrix}
    \cos(2\pi f_i t + \phi) \\
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

function resetCamera() {
  hasSnapped = false;
  cameraTransitioningToStatic = false;
  cameraScale = 20;
}

function showAboutOverlay() {
  const overlay = document.getElementById("about-overlay");
  overlay.style.opacity = "1";
  overlay.style.pointerEvents = "auto";
  document.getElementById("equation").style.opacity = "0";
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
