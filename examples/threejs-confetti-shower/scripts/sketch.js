window.onload = () => {
  init();
  animate();
};

const WIDTH = 400, HEIGHT = 400;
let camera, scene, renderer, orbit;
let confettiShower, stats;
let theme = {r: 255, g: 127, b: 0};

function init() {
  camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.01, 10);
  camera.position.z = 1;

  scene = new THREE.Scene();

  confettiShower = new ConfettiShower(0.5, 50, {theme});

  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(WIDTH, HEIGHT);
  $("#cnv-container").append(renderer.domElement);

  stats = new Stats();
  stats.dom.style.top = stats.dom.style.left = "";
  stats.dom.style.bottom = stats.dom.style.right = "0";
  $("body").append(stats.dom);

  orbit = new THREE.OrbitControls(camera, renderer.domElement);
}

function animate() {
  stats.begin();
  requestAnimationFrame(animate);
  confettiShower.update();
  renderer.render(scene, camera);
  stats.end();
}

function changeColor() {
  let col = $("#color-input").val();
  if (col.substring(0,1) == '#') col = col.substring(1);
  theme = {
    r: parseInt(col.substring(0, 2), 16),
    g: parseInt(col.substring(2, 4), 16),
    b: parseInt(col.substring(4),    16)
  };
  confettiShower.changeTheme(theme);
  console.log(confettiShower.theme)
}
