class Hypercube {

  constructor(r) {
    this.r = r;
    this.rotation = {x: 0, y: 0, z: 0, w: 0};
    this.mesh;
    this.data = [];
    for (let x = 0; x < 2; x++) {
      let gimmeX = [];
      for (let y = 0; y < 2; y++) {
        let gimmeY = [];
        for (let z = 0; z < 2; z++) {
          let gimmeZ = [];
          for (let w = 0; w < 2; w++) {
            let vector = [(x - 0.5) * r, (y - 0.5) * r, (z - 0.5) * r, (w - 0.5) * r];
            gimmeZ.push(vector);
          }
          gimmeY.push(gimmeZ);
        } gimmeX.push(gimmeY);
      } this.data.push(gimmeX);
    }
    this.connections = [[9,8],[9,1],[9,11],[9,13],[5,4],[5,7],[5,13],[5,1],[3,2],[3,11],[3,7],[3,1],[15,14],[15,11],[15,7],[15,13],[0,8],[0,2],[0,4],[0,1],[10,11],[10,8],[10,2],[10,14],[12,14],[12,13],[12,4],[12,8],[6,7],[6,14],[6,4],[6,2]];
  }
  updateMesh(angle = this.rotation.x) {
    let verts = [], group = new THREE.Group();
    let mat = new THREE.MeshNormalMaterial();
    for (let x = 0; x < this.data.length; x++) {
      for (let y = 0; y < this.data[x].length; y++) {
        for (let z = 0; z < this.data[x][y].length; z++) {
          for (let w = 0; w < this.data[x][y][z].length; w++) {
            verts.push(tf.tidy(() => {
              const s = Math.sin(angle), c = Math.cos(angle);
              const v = tf.tensor([this.data[x][y][z][w]]).transpose();
              const double_rot = tf.tensor([[c,-s,0,0],[s,c,0,0],[0,0,c,-s],[0,0,s,c]]);
              //let zw_rot = tf.tensor([[1,0,0,0],[0,1,0,0],[0,0,c,-s],[0,0,s,c]]);
              //let xw_rot = tf.tensor([[c,0,0,-s],[0,1,0,0],[0,0,1,0],[s,0,0,c]]);
              //let zy_rot = tf.tensor([[1,0,0,0],[0,c,0,-s],[0,0,1,0],[0,s,0,c]]);
              const rotated = tf.matMul(double_rot, v);
              const temp = rotated.dataSync(),
                    temp_w = this.r / (this.r - temp[3]);
              const scale = tf.scalar(this.r * 10);
              const projection = tf.tensor([
                /* x */ temp[0] / temp_w,
                /* y */ temp[1] / temp_w,
                /* z */ temp[2] / temp_w
              ]).mul(scale);
              let vertex =  projection.dataSync();
              let geometry = new THREE.SphereGeometry(0.01);
              geometry.translate(...vertex);
              group.add(new THREE.Mesh(geometry, mat));
              return vertex;
            }));
          }
        }
      }
    }
    for (let connection of this.connections) connect(connection[0], connection[1]);

    this.mesh = group;

    function connect(i, j) {
      let a = verts[i],
          b = verts[j];
      let lineGeometry = new THREE.Geometry();
      lineGeometry.vertices.push(
    	  new THREE.Vector3(a[0], a[1], a[2]),
    	  new THREE.Vector3(b[0], b[1], b[2])
      );
      group.add(new THREE.Line(lineGeometry, new THREE.LineBasicMaterial()));
    }
  }

  project3d(xAngle = 0, yAngle = 0, zAngle = 0) {
    let verts = [];
    for (let x = 0; x < this.data.length; x++) {
      for (let y = 0; y < this.data[x].length; y++) {
        for (let z = 0; z < this.data[x][y].length; z++) {
          for (let w = 0; w < this.data[x][y][z].length; w++) {
            verts.push(tf.tidy(() => {
              const s = Math.sin(xAngle), c = Math.cos(xAngle);
              const v = tf.tensor([this.data[x][y][z][w]]).transpose();
              const double_rot = tf.tensor([[c,-s,0,0],[s,c,0,0],[0,0,c,-s],[0,0,s,c]]);
              //let zw_rot = tf.tensor([[1,0,0,0],[0,1,0,0],[0,0,c,-s],[0,0,s,c]]);
              //let xw_rot = tf.tensor([[c,0,0,-s],[0,1,0,0],[0,0,1,0],[s,0,0,c]]);
              //let zy_rot = tf.tensor([[1,0,0,0],[0,c,0,-s],[0,0,1,0],[0,s,0,c]]);
              const rotated = tf.matMul(double_rot, v);
              const temp = rotated.dataSync(),
                    temp_w = this.r / (this.r - temp[3]);
              const scale = tf.scalar(this.r * 10);
              const projection = tf.tensor([
                /* x */ temp[0] / temp_w,
                /* y */ temp[1] / temp_w,
                /* z */ temp[2] / temp_w
              ]).mul(scale);
              return projection.dataSync();
            }));
          }
        }
      }
    } return verts;
  }
  toMesh() {
    let projected = this.project3d(this.rotation.x, this.rotation.y, this.rotation.z, this.rotation.w);
    return Hypercube.toMesh(projected, this.connections);
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
  static toMesh(verts, connections) {
    let group = new THREE.Group();
    for (let i = 0; i < verts.length; i++) {
      let geometry = new THREE.SphereGeometry(0.01);
      geometry.translate(...verts[i]);
      group.add(new THREE.Mesh(geometry, new THREE.MeshNormalMaterial()));
    }
    for (let connection of connections)
      connect(connection[0], connection[1]);

    return group;

    function connect(i, j) {
      let a = verts[i],
          b = verts[j];
      let lineGeometry = new THREE.Geometry();
      lineGeometry.vertices.push(
    	  new THREE.Vector3(a[0], a[1], a[2]),
    	  new THREE.Vector3(b[0], b[1], b[2])
      );
      group.add(new THREE.Line(lineGeometry, new THREE.LineBasicMaterial()));
    }
  }
}
