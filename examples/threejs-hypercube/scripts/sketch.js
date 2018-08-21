window.onload = () => {
  init();
  animate();
};

// Coding Train Live Stream with 4d to 2d
// https://www.youtube.com/watch?v=D9BoBSkLvFo

const WIDTH = 640, HEIGHT = 480;
let camera, scene, renderer, orbit;
let cube, hypercubemesh;
let autoRotationAmount = 0.01;

let stats = new Stats();
stats.dom.style.top = stats.dom.style.left = "";
stats.dom.style.bottom = stats.dom.style.right = "0";
document.body.appendChild(stats.dom);

function init() {
  camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.01, 10);
  camera.position.z = 1;

  scene = new THREE.Scene();

  cube = new Hypercube(0.2);
  hypercubemesh = cube.toMesh();
  scene.add(hypercubemesh);

  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(WIDTH, HEIGHT);
  $("#cnv-container").append(renderer.domElement);

  orbit = new THREE.OrbitControls(camera, renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);
  stats.begin();

  scene.remove(hypercubemesh);
  hypercubemesh = cube.toMesh();
  scene.add(hypercubemesh);

  cube.rotation.x += autoRotationAmount;
  renderer.render(scene, camera);
  stats.end();
}
