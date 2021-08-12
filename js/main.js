import '../style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Size Vars
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}
// Scene
const scene = new THREE.Scene();
// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
//Set initial position
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 30;

// Canvas and Renderer
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);

//Objects
const geo_torus = new THREE.TorusGeometry(14, .2, 18, 80);

//Materials
const mat_torus = new THREE.MeshStandardMaterial({ color: 0x00efa3 });

//Textures
const parallaxTexture = new THREE.TextureLoader().load('img/parallax.jpg');
parallaxTexture.wrapS = THREE.RepeatWrapping;
parallaxTexture.wrapT = THREE.RepeatWrapping;
parallaxTexture.repeat.set(3, 1);

//Mesh
const torus = new THREE.Mesh(geo_torus, mat_torus);
scene.add(torus);
torus.position.x = -20;
torus.position.y = 0;
torus.position.z = 0;

const parallax = new THREE.Mesh(
  new THREE.ConeGeometry(10, 10, 4),
  new THREE.MeshStandardMaterial({ map: parallaxTexture })
);
scene.add(parallax);
parallax.position.x = -20;
parallax.position.y = 0;
parallax.position.z = 0;
/**
 * Lighting/Helpers
 */
const pointLight = new THREE.PointLight(0xffffff);
const ambLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(10, 10, 10);
scene.add(pointLight, ambLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);
// const controls = new OrbitControls(camera, renderer.domElement);

/**
 * Background
 */
// const spaceTexture = new THREE.TextureLoader().load('img/spacebg.jpg');
// scene.background = spaceTexture;

/**
 * Listeners
 */
window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
});

/**
 * Functions
 */
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500));

  star.position.set(x, y, z);
  scene.add(star);
}

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z += t * -0.001;
  // camera.position.x = t * -.0002;
  // camera.position.y = t * -.0002;
}
/**
 * Update Loop
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  parallax.rotation.y += .01;

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);
  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
}

Array(500).fill().forEach(addStar);
document.body.onscroll = moveCamera;
tick();