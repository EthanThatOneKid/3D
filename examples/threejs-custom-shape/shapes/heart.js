class Heart {

  constructor(r, settings) {
    this.r = r;
    this.settings = settings;
    this.shape = this.createShape();
    this.geometry = this.createGeometry();
  }

  createShape() {
    let heartShape = new THREE.Shape();
    heartShape.bezierCurveTo(5,  5,  4,  0,  0,  0);
    heartShape.bezierCurveTo(-6, 0,  -6, 7,  -6, 7);
    heartShape.bezierCurveTo(-6, 11, -3, 15, 5,  19);
    heartShape.bezierCurveTo(12, 15, 16, 11, 16, 7);
    heartShape.bezierCurveTo(16, 7,  16, 0,  10, 0);
    heartShape.bezierCurveTo(7,  0,  5,  5,  5,  5);
    return heartShape;
  }

  createGeometry() {
    let geometry = new THREE.ExtrudeGeometry(this.shape, this.settings || {
      amount: 8,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 1,
      bevelThickness: 1
    });
    geometry.scale(this.r, this.r, this.r);
    return geometry;
  }

  move(x, y) {
    this.shape.moveTo(x, y);
  }

}
