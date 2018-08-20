window.onload = () => {
  init();
  animate();
};

// Coding Train Live Stream with 4d to 2d
// https://www.youtube.com/watch?v=D9BoBSkLvFo

const WIDTH = 640, HEIGHT = 480;
let camera, scene, renderer, orbit;
let geometry, material, mesh, cube;
let autoRotationAmount = 0.01;

function init() {
  camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.01, 10);
  camera.position.z = 1;

  cube = new Hypercube(0.2);
  cube.log();

  scene = new THREE.Scene();

  geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  material = new THREE.MeshBasicMaterial({
    color: 0x2194ce,
    transparent: true,
    opacity: 0.8,
    wireframe: true
  });
  mesh = new THREE.Mesh(geometry, material);
  //scene.add(mesh);
  let hypercubemesh = cube.toMesh();
  scene.add(hypercubemesh);

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(WIDTH, HEIGHT);
  $("#cnv-container").append(renderer.domElement);

  orbit = new THREE.OrbitControls(camera, renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += autoRotationAmount;
  mesh.rotation.y += autoRotationAmount;
  mesh.rotation.z += autoRotationAmount;
  renderer.render(scene, camera);
}
