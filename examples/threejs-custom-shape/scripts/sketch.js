window.onload = () => {
  init();
  animate();
};

const WIDTH = 400, HEIGHT = 400;
let camera, scene, renderer, orbit;
let heart, geometry, material, mesh;
let currentShape = "heart";

function init() {
  camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.01, 10);
	camera.position.z = 1;

	scene = new THREE.Scene();

  heart = new Heart(0.02);

	geometry = heart.geometry;
	material = new THREE.MeshNormalMaterial();
	mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(WIDTH, HEIGHT);
	$("#cnv-container").append(renderer.domElement);

  orbit = new THREE.OrbitControls(camera, renderer.domElement);
}

function animate() {
	requestAnimationFrame(animate);
	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;
  mesh.rotation.z += 0.02;
  renderer.render(scene, camera);
}

function changeShape() {
  // https://threejs.org/docs/#api/extras/core/Path.bezierCurveTo
  cuurentShape = $('#shape-input').find(":selected").text();
  scene.remove(mesh);
  switch (currentShape) {
    case "heart":
      mesh = new THREE.Mesh(new Heart(0.02).geometry, material);
      break;
    default: break;
  }
  scene.add(mesh);
}
