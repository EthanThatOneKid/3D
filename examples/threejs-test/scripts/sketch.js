window.onload = () => {
  init();
  animate();
};

const WIDTH = 400, HEIGHT = 400;
let camera, scene, renderer;
let geometry, material, mesh;

function init() {
  camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.01, 10);
	camera.position.z = 1;

	scene = new THREE.Scene();

	geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
	material = new THREE.MeshNormalMaterial();

	mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(WIDTH, HEIGHT);
	$("#cnv-container").append(renderer.domElement);
}

function animate() {
	requestAnimationFrame(animate);
	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;
  renderer.render(scene, camera);
}

function changeShape() {
  shape = $('#shape-input').find(":selected").text();
  scene.remove(mesh);
  switch (shape) {
    case "box":
      mesh = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), material);
      break;
    case "circle":
      mesh = new THREE.Mesh(new THREE.CircleGeometry(0.2, 32), material);
      break;
    default: /* PlaneGeometry */;
  }
  scene.add(mesh);
}
