window.onload = () => {
  init();
  animate();
};

const WIDTH = 400, HEIGHT = 400;
let camera, scene, renderer, orbit;
let heart, geometry, material, mesh;
let currentShape = "confetti";
let autoRotationAmount = 0.01;

function init() {
  camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.01, 10);
  camera.position.z = 1;

  scene = new THREE.Scene();

  heart = new Heart(0.02);

  geometry = heart.geometry;
  material = new THREE.MeshNormalMaterial();
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

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

function changeShape() {
  // https://threejs.org/docs/#api/extras/core/Path.bezierCurveTo
  currentShape = $('#shape-input').find(":selected").text();
  scene.remove(mesh);
  switch (currentShape) {
    case "heart":
      mesh = new THREE.Mesh(new Heart(0.02).geometry, material);
      toggleAutoRotation("on");
      break;
    case "confetti":
      let confetti = new Confetti(0.02, {r: 255, g: 0, b: 0}, {r: 255, g: 220, b: 0});
      mesh = confetti.mesh;
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
