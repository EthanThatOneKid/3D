class Rain {
  constructor(color, w, h, density = 100) {
    this.color = color;
    this.width = w;
    this.height = h;
    this.density = density;
    this.drops = [];
    this.init();
  }
  init() {
    this.drops = [];
    for (let i = 0; i < this.density; i++) {
      this.drops.push(
        new Drop(
          this.color,
          Math.random() * this.width,
          Math.random() * this.height,
          Math.random() + 0.5,
          Math.random() * this.height * 0.05
        )
      );
    }
  }
  fall() {
    for (let drop of this.drops) {
      drop.render();
      drop.update();
      drop.edge(this.height);
    }
  }
  resize(w, h) {
    this.width = w;
    this.height = h;
    this.init();
  }
}

class Drop {
  constructor(color, x, y, speed, len) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.len = len;
  }
  update() {
    this.y += this.speed;
  }
  edge(h) {
    if (this.y > h)
      this.y = -this.len;
  }
  render() {
    strokeWeight(4);
    stroke(this.color.r, this.color.g, this.color.b);
    line(this.x, this.y, this.x, this.y + this.len);
  }
}
