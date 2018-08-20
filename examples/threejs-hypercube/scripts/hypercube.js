class Hypercube {

  constructor(r) {
    this.r = r;
    this.data = [];
    for (let x = 0; x < 2; x++) {
      let gimmeX = [];
      for (let y = 0; y < 2; y++) {
        let gimmeY = [];
        for (let z = 0; z < 2; z++) {
          //let vertex = [(x - 0.5) * r, (y - 0.5) * r, (z - 0.5) * r];
          //gimmeY.push(tf.tensor(vertex));
          ///*
          let gimmeZ = [];
          for (let w = 0; w < 2; w++) {
            let vertex = [(x - 0.5) * r, (y - 0.5) * r, (z - 0.5) * r, (w - 0.5) * r];
            gimmeZ.push(tf.tensor(vertex));
          }
          gimmeY.push(gimmeZ);
          //*/
        } gimmeX.push(gimmeY);
      } this.data.push(gimmeX);
    }
  }
  project3d(xAngle = 0, yAngle = 0, zAngle = 0) {
    let result = [];
    for (let x = 0; x < this.data.length; x++) {
      for (let y = 0; y < this.data[x].length; y++) {
        for (let z = 0; z < this.data[x][y].length; z++) {
          for (let w = 0; w < this.data[x][y][z].length; w++) {
            let s = Math.sin(xAngle), c = Math.cos(xAngle), gimmeProjectionData;
            tf.tidy(() => {
              const v = tf.tensor([[...this.data[x][y][z][w].dataSync()]]).transpose();
              let double_rot = tf.tensor([[c,-s,0,0],[s,c,0,0],[0,0,c,-s],[0,0,s,c]]);
              let zw_rot = tf.tensor([[1,0,0,0],[0,1,0,0],[0,0,c,-s],[0,0,s,c]]);
              let xw_rot = tf.tensor([[c,0,0,-s],[0,1,0,0],[0,0,1,0],[s,0,0,c]]);
              let zy_rot = tf.tensor([[1,0,0,0],[0,c,0,-s],[0,0,1,0],[0,s,0,c]]);
              let rotated = tf.matMul(double_rot, v);
              let temp = rotated.dataSync(), temp_w = this.r / (this.r - temp[3]);
              let projection = tf.tensor([
                /* x */ temp[0] / temp_w,
                /* y */ temp[1] / temp_w,
                /* z */ temp[2] / temp_w
              ]).mul(tf.scalar(this.r * 10));
              gimmeProjectionData = projection.dataSync();
            });
            let projectedVector = tf.tensor([
              gimmeProjectionData[0],
              gimmeProjectionData[1],
              gimmeProjectionData[2]
            ]);
            result.push(projectedVector);
          }
        }
      }
    }
    return result;
  }
  toMesh() {
    let projected = this.project3d(45);
    return Hypercube.toMesh(projected);
  }
  log() {
    console.log("--- Hypercube ---");
    for (let x = 0; x < this.data.length; x++) {
      for (let y = 0; y < this.data[x].length; y++) {
        for (let z = 0; z < this.data[x][y].length; z++) {
          for (let w = 0; w < this.data[x][y][z].length; w++)
            this.data[x][y][z][w].print();
        }
      }
    }
    console.log("-----------------");
  }
  static toMesh(verts) {
    console.log("TO MESH")
    let group = new THREE.Group();
    for (let tens of verts) {
      let vert = [...tens.dataSync()];
      let geometry = new THREE.SphereGeometry(0.01);
      console.log(vert);
      geometry.translate(...vert);
      group.add(new THREE.Mesh(geometry, new THREE.MeshNormalMaterial()));
    } return group;
  }
}
