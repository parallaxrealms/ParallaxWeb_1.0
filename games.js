import './style.css'
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

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
camera.position.z = 0;
camera.rotation.x -= 0.2;


// Canvas and Renderer
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);

//Objects

//Materials
const mat_plane = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide, reflectivity: 1.0, vertexColors: true, shininess: 10, flatShading: true });

/**
 * Mesh Objects
 */
const objLoader = new OBJLoader();

//Terrain
objLoader.load('3d/terrain3.obj',
  function (terrain3) {
    terrain3.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = mat_plane;
      }
    });
    terrain3.position.x = 0;
    terrain3.position.y = -10.75;
    terrain3.position.z = 30;
    scene.add(terrain3);
  }
);

/**
* Lighting/Helpers
*/
const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
dirLight.position.y = 10;
dirLight.rotation.y = 0;
scene.add(dirLight);


/**
 * Event Listeners
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

var hovering_icons = false;
const social_icons = document.getElementById("content-icons");
social_icons.addEventListener('mouseover', () => {
  hovering_icons = true;
  social_icons.classList.remove("d-none");
  home_btn.classList.add("home-bg-hover");
})
social_icons.addEventListener('mouseout', () => {
  hovering_icons = false;
  social_icons.classList.add("d-none");
  home_btn.classList.remove("home-bg-hover");
})

const home_content = document.getElementById("content-home");
const home_btn = document.getElementById("home-link");
const home_btn_m = document.getElementById("home-link-m");
home_btn.addEventListener('click', () => {

})
home_btn.addEventListener('mouseover', () => {
  home_btn.classList.add("d-none");
  social_icons.classList.remove("d-none");
  home_btn.classList.add("home-bg-hover");
})
home_btn.addEventListener('mouseout', () => {
  if (!hovering_icons) {
    hovering_icons = false;
    social_icons.classList.add("d-none");
    home_btn.classList.remove("home-bg-hover");
  }
})

const home2_btn = document.getElementById("btn-home");
home2_btn.addEventListener('click', () => {

})
home2_btn.addEventListener('mouseover', () => {
  hovering_icons = false;

  social_icons.classList.add("d-none");
  home2_btn.classList.remove("home-bg-hover");
})

const games_btn = document.getElementById("btn-games2");
games_btn.addEventListener('click', () => {

})
games_btn.addEventListener('mouseover', () => {
  hovering_icons = false;

  social_icons.classList.add("d-none");
  home_btn.classList.remove("home-bg-hover");
})


const canvas_bg = document.getElementById("bg");
canvas_bg.addEventListener('mouseover', () => {
  hovering_icons = false;
  social_icons.classList.add("d-none");
  home_btn.classList.remove("home-bg-hover");
})

/**
 * Functions
 */
function navigatePages(pageIndex) {
  if (pageIndex == 0) {
    home_content.classList.remove("d-none");
    web_content.classList.add("d-none");
    games_content.classList.add("d-none");
    art_content.classList.add("d-none");
    contact_content.classList.add("d-none");
  }
  if (pageIndex == 1) {
    home_content.classList.add("d-none");
    web_content.classList.remove("d-none");
    games_content.classList.add("d-none");
    art_content.classList.add("d-none");
    contact_content.classList.add("d-none");
  }
  if (pageIndex == 2) {
    home_content.classList.add("d-none");
    web_content.classList.add("d-none");
    games_content.classList.remove("d-none");
    art_content.classList.add("d-none");
    contact_content.classList.add("d-none");
  }
  if (pageIndex == 3) {
    home_content.classList.add("d-none");
    web_content.classList.add("d-none");
    games_content.classList.add("d-none");
    art_content.classList.remove("d-none");
    contact_content.classList.add("d-none");
  }
  if (pageIndex == 4) {
    home_content.classList.add("d-none");
    web_content.classList.add("d-none");
    games_content.classList.add("d-none");
    art_content.classList.add("d-none");
    contact_content.classList.remove("d-none");
  }
  checkScrollHeight();

  if (galleryOpen) {
    closeModal();
  }
}

function checkScrollHeight() {
  window.scrollTo(0, 0);
  const t = document.body.getBoundingClientRect().top;
  if (t != 0) {
    window.scrollTo(0, 0);
  }
}

function addStar() {
  const geometry = new THREE.SphereGeometry(0.15, 10, 10);
  const material = new THREE.MeshBasicMaterial({ color: 0xc0f5cb });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(400));

  star.position.set(x, y, z);
  scene.add(star);
}


/**
 * Update Loop
 */
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
}

checkScrollHeight();
Array(2000).fill().forEach(addStar);
tick();