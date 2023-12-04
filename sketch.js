let Field, Mag;
function setup() {
  createCanvas(600, 600);
  Field = new VectorField(400,400, 40, 40, createVector(0,0));
  Mag = new Magnet(createVector(200,200), 60, 1.5);
  
  stroke(255);
  strokeWeight(2);
}
let frame = 1;
function draw() {
  background(0);
  translate(200,200);
  scale(0.5);
  
  if(frame %1 ==0)
  {
    Mag.Angle+= 0.01;
  }
  frame++;
  
  drawMagneticFieldLines();
  
}

function drawMagneticFieldLines() {
  noFill();
  stroke(100, 100, 255);

  for (let i = 0; i < 10; i++) {
    let angle = map(i, 0, 10, -HALF_PI, 3*HALF_PI);
    let startX = Mag.Pos.x + Mag.Length / 2 * cos(angle);
    let startY = Mag.Pos.y + Mag.Length / 2 * sin(angle);

    drawFieldLine(createVector(startX, startY), angle);
  }
}

function drawFieldLine(start, angle) {
  let pos = start.copy();
  beginShape();
  for (let i = 0; i < 1000; i++) {
    let strengthVec = Mag.CalculateMagneticField(pos).normalize().mult(3);
    pos.add(strengthVec);
    vertex(pos.x, pos.y);
  }
  endShape();
}