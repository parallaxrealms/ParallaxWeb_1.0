import '../style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(14, .2, 18, 80);
const material = new THREE.MeshStandardMaterial({ color: 0x00efa3 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
const ambLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(10, 10, 10);
scene.add(pointLight, ambLight);


const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(500).fill().forEach(addStar);

// const spaceTexture = new THREE.TextureLoader().load('img/spacebg.jpg');
// scene.background = spaceTexture;

//Avatar
const parallaxTexture = new THREE.TextureLoader().load('img/parallax.jpg');
parallaxTexture.wrapS = THREE.RepeatWrapping;
parallaxTexture.wrapT = THREE.RepeatWrapping;
parallaxTexture.repeat.set(3, 1);

const parallax = new THREE.Mesh(
  new THREE.ConeGeometry(10, 10, 4),
  new THREE.MeshStandardMaterial({ map: parallaxTexture })
);


scene.add(parallax);


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  parallax.rotation.y += 0.05;
  torus.rotation.z += 0.01;

  camera.position.z += t * -0.001;
  // camera.position.x = t * -.0002;
  // camera.position.y = t * -.0002;
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  parallax.rotation.y += .01;

  // controls.update();
}

animate();