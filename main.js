import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PlaneGeometry } from 'three';

//Scrollbar at the top before page loads
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

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
const geo_torus = new THREE.TorusGeometry(14, .1, 18, 80);
const geo_plane = new THREE.PlaneGeometry(100, 100, 50, 50);
const geo_sphere = new THREE.SphereGeometry(300, 100, 100);


//Materials
const mat_torus = new THREE.MeshBasicMaterial({ color: 0x00efa3 });
const mat_plane = new THREE.MeshPhongMaterial({ color: 0xffffff, roughness: 0.0, metalness: 1.0, flatShading: true });
const mat_sphere = new THREE.MeshPhongMaterial({ color: 0xffffff, roughness: 0.0, metalness: 1.0, shininess: 1.0, flatShading: true });

//Textures
const parallaxTexture = new THREE.TextureLoader().load('img/parallax.jpg');
parallaxTexture.wrapS = THREE.RepeatWrapping;
parallaxTexture.wrapT = THREE.RepeatWrapping;
parallaxTexture.repeat.set(3, 1);

/**
 * Mesh Objects
 */
//Torus
const torus = new THREE.Mesh(geo_torus, mat_torus);
scene.add(torus);
torus.position.x = -25;
torus.position.y = 0;
torus.position.z = 0;

//Parallax
const parallax = new THREE.Mesh(
  new THREE.ConeGeometry(10, 10, 4),
  new THREE.MeshStandardMaterial({ map: parallaxTexture })
);
scene.add(parallax);
parallax.position.x = -25;
parallax.position.y = 0;
parallax.position.z = 0;

//Plane
const plane = new THREE.Mesh(geo_plane, mat_plane);
scene.add(plane);
plane.position.x = 0;
plane.position.y = 10;
plane.position.z = 0;
plane.rotation.x = 90;

//Sphere
const sphere = new THREE.Mesh(geo_sphere, mat_sphere);
scene.add(sphere);
sphere.position.x = 0;
sphere.position.y = -312;
sphere.position.z = 0;

/**
 * Lighting/Helpers
 */
const pointLight = new THREE.PointLight(0xffffff, .8);
const ambLight = new THREE.AmbientLight(0xffffff, .2);
pointLight.position.set(10, 10, 0);
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
 * Event Listeners
 */
window.addEventListener("scroll", function (e) {
  const t = document.body.getBoundingClientRect().top;

  if (this.oldScroll > this.scrollY) { //Scrolling up
    camera.position.z -= t * -0.001;
  }
  else if (this.oldScroll < this.scrollY) { //Scrolling down
    camera.position.z += t * -0.001;
  }
  this.oldScroll = this.scrollY;
}, false);

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
function checkScrollHeight() {
  window.scrollTo(0, 0);
  const t = document.body.getBoundingClientRect().top;
  if (t != 0) {
    window.scrollTo(0, 0);
  }
}

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500));

  star.position.set(x, y, z);
  scene.add(star);
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

checkScrollHeight();
Array(500).fill().forEach(addStar);
// document.body.onscroll = moveCamera;
tick();