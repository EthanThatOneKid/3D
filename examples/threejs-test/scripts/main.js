window.onload = () => {
  init();
  animate();
};

let torusVertices = torus(0.1, 0.01);
let myTorus = createObj(torusVertices);

const WIDTH = 400, HEIGHT = 400;
let camera, scene, renderer;
let geometry, material, mesh;

function init() {
  camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.01, 10);
	camera.position.z = 1;

	scene = new THREE.Scene();

	geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
	material = new THREE.MeshNormalMaterial();

  //mesh = new THREE.Mesh(myTorus, material);
	mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(WIDTH, HEIGHT);
	document.body.appendChild(renderer.domElement);
}

function animate() {
	requestAnimationFrame(animate);
	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;
  renderer.render(scene, camera);
}
