window.onload = () => {
  document.getElementById("output-field").value = obj;
  init();
  animate();

  // ***************************************************************************************************
  // I AM HAVING A HARD TIME LOADING IN THIS .OBJ FILE
  let loader = new THREE.OBJLoader();
  loader.load("../../models/torus.obj",
    obj => {
      console.log(obj);
      obj.name = "torus";
      obj.scale.x = obj.scale.y = obj.scale.z = 0.0001;
      scene.add(obj);
      hasObj = true;
      //console.log(scene.children[0]);
    },
    xhr => console.log(`${xhr.loaded / xhr.total * 100}% loaded`),
    err => console.error("An error occured")
  );
};

let x = torus(0.1, 0.01);
let obj = getObj(x);
let hasObj = false;

const WIDTH = 400, HEIGHT = 400;
let camera, scene, renderer;
let geometry, material, mesh;

/*
let manager = new THREE.LoadingManager();
manager.onProgress = (item, loaded, total) => console.log(item, loaded, total);
let loader = new THREE.OBJLoader(manager);
let object;
*/

function init() {
  camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.01, 10);
	camera.position.z = 1;

	scene = new THREE.Scene();

	geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
	material = new THREE.MeshNormalMaterial();

	mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	renderer = new THREE.WebGLRenderer({
    antialias: true
  });
	renderer.setSize(WIDTH, HEIGHT);
	document.body.appendChild(renderer.domElement);
}

function animate() {
	requestAnimationFrame(animate);

  if (hasObj) {
    let x = Math.abs(Math.sin(new Date().valueOf() / 1000) * 10);
    camera.position.z = x;
    // scene.children[0].scale.x = scene.children[0].scale.y = scene.children[0].scale.z = x;
  }

	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;
  renderer.render(scene, camera);

}
