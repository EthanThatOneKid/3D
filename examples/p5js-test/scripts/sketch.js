// Refer to the following resources
// \_ https://p5js.org/reference/#group-Shape

let cnv, shape = "box";

function setup() {
  cnv = createCanvas(400, 400, WEBGL);
}

function draw() {
  background(sin(frameCount / 100) * 127 + 127);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  rotateZ(frameCount * 0.01);
  normalMaterial();
  switch (shape) {
    case "box": box(50); break;
    case "cone": cone(40, 70); break;
    case "cylinder": cylinder(20, 50); break;
    case "sphere": sphere(40); break;
    case "torus": torus(50, 15); break;
    default: plane(50, 50);
  }
}

let changeShape = () => shape = $('#shape-input').find(":selected").text();
