class Hypercube {

  constructor(r) {
    this.r = r;
    this.cube = [];
    for (let x = 0; x < 2; x++) {
      let gimmeX = [];
      for (let y = 0; y < 2; y++) {
        let gimmeY = [];
        for (let z = 0; z < 2; z++) {
          let gimmeZ = [];
          for (let w = 0; w < 2; w++) {
            gimmeZ.push(new Vector4d((x - 0.5) * r, (y - 0.5) * r, (z - 0.5) * r, (w - 0.5) * r));
          }
          gimmeY.push(gimmeZ);
        }
        gimmeX.push(gimmeY);
      }
      this.cube.push(gimmeX);
    }
  }

  log() {
    console.log(this.cube);
  }

}
