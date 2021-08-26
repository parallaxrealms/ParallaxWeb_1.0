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
camera.position.y = 9;
camera.position.z = 30;
camera.rotation.x -= 0.5;

// Canvas and Renderer
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);

//Objects
const geo_torus = new THREE.TorusGeometry(.75, .01, 18, 80);
const geo_sphere = new THREE.SphereGeometry(50, 20, 20);


//Materials
const mat_torus = new THREE.MeshBasicMaterial({ color: 0xffffff });
const mat_plane = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide, reflectivity: 1.0, vertexColors: true, shininess: 10, flatShading: true });
const mat_sphere = new THREE.MeshBasicMaterial({ color: 0x00efa3 });
const mat_column = new THREE.MeshStandardMaterial({ color: 0x1f1f1f, flatShading: true });

const mat_wire = new THREE.MeshBasicMaterial({
  color: 0x000,
  wireframe: true
});

/**
 * Mesh Objects
 */
var mat_statue = new THREE.MeshPhongMaterial({ color: 0xffffff, reflectivity: 1.0, vertexColors: false, shininess: 100, flatShading: false });

const objLoader = new OBJLoader();

objLoader.load('3d/mercury_lowpoly.obj',
  function (statue) {
    statue.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = mat_statue;
      }
    });
    statue.rotation.x = 0.03;
    statue.rotation.z = -0.02;
    statue.rotation.y = 10;
    statue.position.x = -.75;
    statue.position.y = 5.75;
    statue.position.z = 27;
    scene.add(statue);
  }
);

objLoader.load('3d/mercury_lowpoly.obj',
  function (statue2) {
    statue2.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = mat_wire;
      }
    });
    statue2.rotation.x = 0.03;
    statue2.rotation.z = -0.02;
    statue2.rotation.y = 10;
    statue2.position.x = -.75;
    statue2.position.y = 5.75;
    statue2.position.z = 27;
    scene.add(statue2);
  }
);

objLoader.load('3d/terrain.obj',
  function (terrain) {
    terrain.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = mat_plane;
      }
    });
    terrain.rotation.y = 3;
    terrain.position.z = 40;
    terrain.position.y = 6.1;
    scene.add(terrain);
  }
);

objLoader.load('3d/column.obj',
  function (column) {
    column.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = mat_column;
      }
    });
    column.position.x = -12;
    column.position.y = 5.5;
    column.position.z = 20;
    scene.add(column);
  }
);
objLoader.load('3d/column.obj',
  function (column2) {
    column2.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = mat_column;
      }
    });
    column2.position.x = -15;
    column2.position.y = 4;
    column2.position.z = 10;
    scene.add(column2);
  }
);
objLoader.load('3d/column.obj',
  function (column3) {
    column3.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = mat_column;
      }
    });
    column3.position.x = -26;
    column3.position.y = 6;
    column3.position.z = 0;
    scene.add(column3);
  }
);
//Octohedrons
const octo = new THREE.Mesh(
  new THREE.OctahedronGeometry(.3, 0),
  new THREE.MeshPhongMaterial({ color: 0xffffff, reflectivity: 1, shininess: 100, flatShading: true }));
const torus = new THREE.Mesh(geo_torus, mat_torus);

const spinner = new THREE.Group();
spinner.add(octo);
spinner.add(torus);
scene.add(spinner);

spinner.position.x = -4;
spinner.position.y = 7;
spinner.position.z = 27;


//Green-Sun
const sphere = new THREE.Mesh(geo_sphere, mat_sphere);
sphere.position.x = 0;
sphere.position.y = -30;
sphere.position.z = -400;
scene.add(sphere);

//Camera Positions
const cam_pos = new THREE.Mesh(
  new THREE.OctahedronGeometry(.5, 1),
  new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true }));
cam_pos.position.x = camera.position.x;
cam_pos.position.y = camera.position.y;
cam_pos.position.z = camera.position.z;
scene.add(cam_pos);

const cam_pos2 = new THREE.Mesh(
  new THREE.OctahedronGeometry(.5, 1),
  new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true }));
cam_pos2.position.x = 0;
cam_pos2.position.y = 10;
cam_pos2.position.z = 90;
scene.add(cam_pos2);

const cam_pos3 = new THREE.Mesh(
  new THREE.OctahedronGeometry(.5, 1),
  new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true }));
cam_pos3.position.x = 0;
cam_pos3.position.y = 10;
cam_pos3.position.z = 160;
scene.add(cam_pos3);

const cam_pos4 = new THREE.Mesh(
  new THREE.OctahedronGeometry(.5, 1),
  new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true }));
cam_pos4.position.x = 0;
cam_pos4.position.y = 10;
cam_pos4.position.z = -365;
scene.add(cam_pos4);

/**
 * Lighting/Helpers
 */
const pointLight = new THREE.PointLight(0x00efa3, 8);
const statueLight = new THREE.PointLight(0xffffff, .6);
const dirLight = new THREE.DirectionalLight(0xffffff, .4);
pointLight.position.set(0, 10, -42);
statueLight.position.set(-1.3, 8.6, 28);
scene.add(pointLight, dirLight, statueLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

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

const home_btn = document.getElementById("home-link");
home_btn.addEventListener('click', () => {
  console.log("camera pos x: " + camera.position.x);
  console.log("camera pos y: " + camera.position.y);
  console.log("camera pos z: " + camera.position.z);
  currentScene = 0;
})

const web_btn = document.getElementById("btn-web");
web_btn.addEventListener('click', () => {
  currentScene = 1;
})
const games_btn = document.getElementById("btn-games");
games_btn.addEventListener('click', () => {
  currentScene = 2;
})
const contact_btn = document.getElementById("btn-contact");
contact_btn.addEventListener('click', () => {
  currentScene = 3;
})
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
  const geometry = new THREE.SphereGeometry(0.25, 10, 10);
  const material = new THREE.MeshBasicMaterial({ color: 0x00efa3 });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500));

  star.position.set(x, y, z);
  scene.add(star);
}

function addColumns() {
  const mat_column = new THREE.MeshStandardMaterial({ color: 0xffffff });

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(60));

  objLoader.load('3d/column.obj',
    function (column) {
      column.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material = mat_column;
        }
      });
      column.position.set(x, 4, z + 10);
      scene.add(column);
    }
  );
}
/**
 * Update Loop
 */
const clock = new THREE.Clock();
var camPos = new THREE.Vector3(0, 0, 0);
var scene0_pos = new THREE.Vector3(0, 0, 0);
scene0_pos = cam_pos.position;
var scene1_pos = new THREE.Vector3(0, 0, 0);
scene1_pos = cam_pos2.position;
var scene2_pos = new THREE.Vector3(0, 0, 0);
scene2_pos = cam_pos3.position;
var scene3_pos = new THREE.Vector3(0, 0, 0);
scene3_pos = cam_pos4.position;

var currentScene = 0;
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  octo.rotation.y += .01;

  // Update Orbital Controls
  // controls.update()

  // Interpolate camPos toward targetPos
  if (currentScene == 0) {
    camPos.lerp(scene0_pos, 0.05);
  }
  if (currentScene == 1) {
    camPos.lerp(scene1_pos, 0.05);
  }
  if (currentScene == 2) {
    camPos.lerp(scene2_pos, 0.05);
  }
  if (currentScene == 3) {
    camPos.lerp(scene3_pos, 0.05);
  }

  // Apply new camPos to your camera
  camera.position.copy(camPos);

  // Render
  renderer.render(scene, camera);
  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
}

checkScrollHeight();
Array(500).fill().forEach(addStar);
// document.body.onscroll = moveCamera;
tick();