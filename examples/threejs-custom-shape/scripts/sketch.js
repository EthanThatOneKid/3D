window.onload = () => {
  init();
  animate();
};

const WIDTH = 400, HEIGHT = 400;
let camera, scene, renderer, orbit;
let stats, geometry, material, mesh;
let currentShape = "heart";
let autoRotationAmount = 0.01;

function init() {
  camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.01, 10);
  camera.position.z = 1;

  stats = new Stats();
  stats.showPanel(0);
  $("body").append(stats.dom);

  scene = new THREE.Scene();

  material = new THREE.MeshNormalMaterial();
  changeShape(currentShape);

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(WIDTH, HEIGHT);
  $("#cnv-container").append(renderer.domElement);

  orbit = new THREE.OrbitControls(camera, renderer.domElement);
}

function animate() {
  stats.begin();
  requestAnimationFrame(animate);
  mesh.rotation.x += autoRotationAmount;
  mesh.rotation.y += autoRotationAmount;
  mesh.rotation.z += autoRotationAmount;
  renderer.render(scene, camera);
  stats.end();
}

function changeShape(str) {
  // https://threejs.org/docs/#api/extras/core/Path.bezierCurveTo
  currentShape = str || $('#shape-input').find(":selected").text();
  scene.remove(mesh);
  switch (currentShape) {
    case "heart":
      mesh = new THREE.Mesh(new Heart(0.02).geometry, material);
      toggleAutoRotation("on");
      break;
    case "confetti":
      mesh = new Confetti(0.02, {r: 255, g: 220, b: 0}).mesh;
      toggleAutoRotation("on");
      break;
    case "star":
      mesh = new Star(5).mesh;
      toggleAutoRotation("on");
      break;
    case "mandelbrot":
      let mandelbrot = new Mandelbrot(1, 20, 1);
      console.log(mandelbrot);
      mesh = mandelbrot.mesh;
      toggleAutoRotation("off");
      break;
    default: break;
  }
  scene.add(mesh);
}

function toggleAutoRotation(toggle) {
  if (toggle == "on") autoRotationAmount = 0.01;
  else if (toggle == "off") autoRotationAmount = 0;
}
