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
        let isEdgePiece = n < iterations && n / iterations > threshToAppear;
        //gimmeRow.push(bright >= threshToAppear ? "#" : "-");
        gimmeRow.push(isEdgePiece);
        if (isEdgePiece) this.points.push([
          Number(x.toFixed(roundResult)) - (this.size * 0.5),
          Number(y.toFixed(roundResult)) - (this.size * 0.5)
        ]);
      }
      this.matrix.push(gimmeRow);
    }
    //this.points = this.createPath();

    this.mesh = this.createMesh();
  }

  createPath() {
    console.log(this.matrix);
    let turtle = new Turtle(this.matrix);
    turtle.sniff();
    return turtle.trail;
  }

  log() {
    console.table(this.matrix);
  }

}

class Turtle {
  constructor(matrix) {
    this.x = 0;
    this.y = 0;
    this.matrix = Object.values(matrix);
    this.trail = [];
    this.locateStartingPoint();
  }
  advance() {
    let r = 1;
    let gimme;
    while (true) {
      for (let i = -r; i <= r; i++) {
        for (let j = -r; j <= r; j++) {
          if (i == 0 && j == 0) continue;
          if (y + i > this.matrix.length || y + i < 0 || x + j > this.matrix.length || x + j < 0) continue;
          if (this.matrix[this.y + i][this.x + j]) {
            gimme = [j, i];
            break;
          }
        }
      }
    }
    this.x += gimme[0];
    this.y += gimme[1];
  }
  locateStartingPoint() {
    let x = 0, y = 0;
    while (!this.matrix[y][x]) {
      x = Math.floor(Math.random() * this.matrix.length);
      y = Math.floor(Math.random() * this.matrix.length);
    }
    this.x = x;
    this.y = y;
  }
  sniff() {
    //let hasAnyLeft = false;
    for (let r = 1; r <= this.matrix.length * 0.5; r++) {
      for (let i = -r; i <= r; i++) {
        for (let j = -r; j <= r; j++) {
          if (i == 0 && j == 0) continue;
          if (this.y + i > this.matrix.length || this.y + i < 0 || this.x + j > this.matrix.length || this.x + j < 0) continue;
          try {
            if (this.matrix[this.y + i][this.x + j]) {
              //hasAnyLeft = true;
              this.matrix[this.y + i][this.x + j] = false;
              this.x += j; this.y += i;
              this.trail.push([this.x, this.y]);
              this.sniff();
            }
          } catch (e) {
            continue;
          }
        }
      }
    }
    //if (hasAnyLeft) this.advance();
  }
}

/*
var minval = -0.5;
var maxval = 0.5;

var minSlider;
var maxSlider;

var frDiv;

function setup() {
  createCanvas(200, 200);
  pixelDensity(1);

  minSlider = createSlider(-2.5, 0, -2.5, 0.01);
  maxSlider = createSlider(0, 2.5, 2.5, 0.01);

  frDiv = createDiv('');
}

function draw() {
  var maxiterations = 100;

  loadPixels();
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {

      var a = map(x, 0, width, minSlider.value(), maxSlider.value());
      var b = map(y, 0, height, minSlider.value(), maxSlider.value());

      var ca = a;
      var cb = b;

      var n = 0;

      while (n < maxiterations) {
        var aa = a * a - b * b;
        var bb = 2 * a * b;
        a = aa + ca;
        b = bb + cb;
        if (a * a + b * b > 16) {
          break;
        }
        n++;
      }

      var bright = map(n, 0, maxiterations, 0, 1);
      bright = map(sqrt(bright), 0, 1, 0, 255);

      if (n == maxiterations) {
        bright = 0;
      }

      var pix = (x + y * width) * 4;
      pixels[pix + 0] = bright;
      pixels[pix + 1] = bright;
      pixels[pix + 2] = bright;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();

  frDiv.html(floor(frameRate()));
}
*/
