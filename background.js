// === GLOBAL BACKGROUND PARTICLES ONLY ===
let backgroundStars = [];
let nebulaParticles = [];
let isMobile = false;

function setup() {
  isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(navigator.userAgent) || windowWidth < 768;
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.style("z-index", "-1");
  canvas.style("position", "fixed");
  canvas.style("top", "0");
  canvas.style("left", "0");
  canvas.parent(document.body);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  noFill();

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
  clear();
  drawParallaxStars();
  drawNebula();
}

function drawParallaxStars() {
  push();
  translate(width / 2, height / 2);
  for (let star of backgroundStars) {
    const offsetX = 0;
    const offsetY = 0;
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
