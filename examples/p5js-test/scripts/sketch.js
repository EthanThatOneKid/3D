// Refer to the following resources
// \_ https://p5js.org/reference/#group-Shape

let cnv;

function setup() {
  cnv = createCanvas(400, 400, WEBGL);
}

function draw() {
  background(sin(frameCount/100)*127+127);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  torus(50, 15);
}
