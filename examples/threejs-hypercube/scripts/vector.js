class Vector {

  constructor(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.vector = [x];
    if (typeof y == "number") this.vector.push(y);
    if (typeof z == "number") this.vector.push(z);
    if (typeof w == "number") this.vector.push(w);
  }

  mult(p) {
    let temp = Object.values(this.vector);
    return new Vector(...temp.map(x => x * p));
  }

}
