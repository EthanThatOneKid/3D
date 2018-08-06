window.onload = () => {
  init();
  animate();
};

// Coding Train Live Stream with 4d to 2d
// https://www.youtube.com/watch?v=D9BoBSkLvFo

const WIDTH = 640, HEIGHT = 480;
let camera, scene, renderer, orbit;
let geometry, material, mesh;
let autoRotationAmount = 0.1;

let points = [];
points[0] = new Vector4d(-1, -1, -1, 1);
points[1] = new Vector4d(1, -1, -1, 1);
points[2] = new Vector4d(1, 1, -1, 1);
points[3] = new Vector4d(-1, 1, -1, 1);
points[4] = new Vector4d(-1, -1, 1, 1);
points[5] = new Vector4d(1, -1, 1, 1);
points[6] = new Vector4d(1, 1, 1, 1);
points[7] = new Vector4d(-1, 1, 1, 1);
points[8] = new Vector4d(-1, -1, -1, -1);
points[9] = new Vector4d(1, -1, -1, -1);
points[10] = new Vector4d(1, 1, -1, -1);
points[11] = new Vector4d(-1, 1, -1, -1);
points[12] = new Vector4d(-1, -1, 1, -1);
points[13] = new Vector4d(1, -1, 1, -1);
points[14] = new Vector4d(1, 1, 1, -1);
points[15] = new Vector4d(-1, 1, 1, -1);

function init() {
  camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.01, 10);
  camera.position.z = 1;

  cube = new Hypercube(1);

  //let x = project3d(cube.cube[0][0][0][0], 0);
  //console.log(x);

  scene = new THREE.Scene();

  /*
  material = new THREE.MeshNormalMaterial();
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  */

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(WIDTH, HEIGHT);
  $("#cnv-container").append(renderer.domElement);

  orbit = new THREE.OrbitControls(camera, renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);
  /*
  mesh.rotation.x += autoRotationAmount;
  mesh.rotation.y += autoRotationAmount;
  mesh.rotation.z += autoRotationAmount;
  */
  renderer.render(scene, camera);
}

function project3d(v, a) {
  let double_rot = new Matrix([
    [Math.cos(a), -1 * Math.sin(a), 0,            0],
    [Math.sin(a), Math.cos(a),  0,            0],
    [0,            0,           Math.cos(a),  -1 * Math.sin(a)],
    [0,            0,           Math.sin(a),  Math.cos(a)]
  ]);
/*
  let rotationXW = new Matrix([
    [Math.cos(a), 0, 0, -1 * Math.sin(a)],
    [0,           1, 0, 0],
    [0,           0, 1, 0],
    [Math.sin(a), 0, 0, Math.cos(a)]
  ]);

  let rotationZY = new Matrix([
    [1, 0,           0, 0],
    [0, Math.cos(a), 0, -1 * Math.sin(a)],
    [0, 0,           1, 0],
    [0, Math.sin(a), 0, Math.cos(a)]
  ]);
  */

  let rotationZW = new Matrix([
    [1, 0, 0,            0],
    [0, 1, 0,            0],
    [0, 0, Math.cos(a), -1 * Math.sin(a)],
    [0, 0, Math.sin(a), Math.cos(a)]
  ]);


  let rotated = double_rot.mult(v);
  rotated = rotationZW.mult(rotated);

  let distance = 2;
  let temp_w = 1 / (1 - rotated.w);

  let projection = new Matrix([
    [temp_w, 0, 0, 0],
    [0, temp_w, 0, 0],
    [0, 0, temp_w, 0],
  ]);

  let p2 = projection.mult(a1);
  let result = new Vector(p2.data[0][0], p2.data[1][0], p2.data[2][0]);
  result.mult(100);
  return result;
}
