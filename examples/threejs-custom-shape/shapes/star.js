class Star {
  constructor(corners = 5, r = 0.5, detail = 1) {
    this.corners = corners;
    this.r = r;
    this.detail = detail;
    this.mesh = this.createMesh();
  }
  createShape() {
    let shape = new THREE.Shape();
    for (let a = 0; a <= Math.PI * 2; a += Math.PI * 2 * 0.003 / this.detail) {
      let r = Math.cos(a * this.corners);
      let point = Star.polarToCartesian(r, a);
      shape.lineTo(point.x, point.y);
    }
    return shape;

  }
  createMesh() {
    let geometry = new THREE.ShapeGeometry(this.createShape());
    geometry.scale(this.r, this.r, this.r);
    let mat = new THREE.MeshNormalMaterial();
    let mesh = new THREE.Mesh(geometry, mat);
    return mesh;
  }
  static polarToCartesian(r, a) {
    return {
      x: r * Math.cos(a),
      y: r * Math.sin(a)
    };
  }
}
