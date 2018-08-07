class Mandelbrot {
  constructor(size = 1, detail = 100, r) {
    this.size = size;
    this.detail = detail;
    this.points = [];
    this.matrix = [];
    this.r = r || 1;
    this.mesh;
    this.init();
  }

  static map(a, b, c, d, f, g) {
    let h = (a - b) / (c - b) * (f - d) + d;
    return g ? d < f ? constrain(h, d, f) : constrain(h, f, d) : h;
    function constrain(a, b, c) {
      if (a < b) return b;
      if (a > c) return c;
      return a;
    }
  }

  static sigmoid(x) {
    return 1 / (1 + Math.pow(Math.E, -1 * x));
  }

  static dist(x1, y1, x2, y2) {
    return Math.sqrt((y2 - y1) / (x2 - x1));
  }

  createMesh() {
    let shape = new THREE.Shape();
    this.points.forEach(i => shape.lineTo(i[0], i[1]));

    let geometry = new THREE.ShapeGeometry(shape);
    geometry.scale(this.r, this.r, this.r);

    let mat = new THREE.MeshNormalMaterial();

    let mesh = new THREE.Mesh(geometry, mat);
    return mesh;
  }

  init(iterations = 100, minZoom = this.size * -1.5, maxZoom = this.size * 1.5) {
    this.matrix = [];
    for (let y = 0; y < this.size; y += this.size / this.detail) {
      let gimmeRow = [];
      for (let x = 0; x < this.size; x += this.size / this.detail) {
        let a = Mandelbrot.map(x, 0, this.size, minZoom, maxZoom);
        let b = Mandelbrot.map(y, 0, this.size, minZoom, maxZoom);
        let ca = a, cb = b, n;
        let arbitraryNumberIndicatingApproachToInfinity = 16;

        for (n = 0; n < iterations; n++) {
          let aa = a * a - b * b;
          let bb = 2 * a * b;
          a = aa + ca;
          b = bb + cb;
          if (a * a + b * b > arbitraryNumberIndicatingApproachToInfinity) break;
        }

        //let bright = Mandelbrot.map(n, 0, iterations, 0, 1);
        //bright = Math.sqrt(bright);
        //if (n == iterations) bright = -1;
        let roundResult = Math.round(Math.log(this.detail));
        let threshToAppear = 0.075;
        //let isEdgePiece = n < iterations && n / iterations > threshToAppear;
        let isEdgePiece = n == iterations;
        gimmeRow.push(isEdgePiece ? "#" : "-");
        //gimmeRow.push(isEdgePiece);
        if (isEdgePiece) this.points.push([
          Number(x.toFixed(roundResult)) - (this.size * 0.5),
          Number(y.toFixed(roundResult)) - (this.size * 0.5)
        ]);
      }
      this.matrix.push(gimmeRow);
    }
    this.points = this.createPath();

    this.mesh = this.createMesh();
  }

  createPath() {
    console.log(this.matrix);
    let turtle = new Turtle(JSON.parse(JSON.stringify(this.matrix)));
    turtle.sniff();
    return turtle.trail;
  }

  log() {
    console.table(this.matrix);
  }

}

//                           ___________
//     ...        ...      ( The Turtle )___
//   ..    ..   ..   ..   <(____________)__`')
// ..        ...       ...  /_/\_\ /_/\_\

class Turtle {
  constructor(matrix) {
    this.x = 0;
    this.y = 0;
    this.matrix = Object.values(matrix);
    this.trail = [];
    this.locateStartingPoint();
  }
  locateStartingPoint() {
    for (let y = 0; y < this.matrix.length; y++) {
      for (let x = 0; x < this.matrix[y].length; x++) {
        if (this.matrix[y][x] == "#") {
          this.x = x;
          this.y = y;
          return;
        }
      }
    }
  }
  checkForBonk(x, y) {
    return x >= this.matrix.length || x < 0 || y >= this.matrix.length || y < 0;
  }
  checkIfOpen(x, y) {
    if (this.checkForBonk(x, y)) return false;
    if (this.matrix[y][x] == "-") return false;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i == 0 && j == 0) continue;
        if (this.checkForBonk(x + j, y + i)) continue;
        if (this.matrix[y + i][x + j] == "-") return true;
      }
    }
    return false;
  }
  sniff() {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i == 0 && j == 0) continue;
        //console.log(this.x, this.y)
        if (this.checkIfOpen(this.x + j, this.y + i)) {
          this.matrix[this.y][this.x] = "-";
          this.trail.push([this.x, this.y]);
          this.x += j;
          this.y += i;
          this.sniff();
        }
      }
    }
  }
}
