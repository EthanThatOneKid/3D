let cnv, rain;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent("cnv-container");
  rain = new Rain(
    {r: 80, g: 210, b: 245},
    width * 2, height,
    1000
  );
}

function draw() {
  translate(-mouseX * 0.25, 0);
  background(51);
  rain.fall();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  rain.resize(width * 2, height);
}
