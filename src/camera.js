// perspective camera -> mimics human vision
// FOV -> controls visible angle
// Lower FOV zooms in, higher FOV zooms out
// aspect ratio -> avoids distortion
// clipping planes -> limit what's rendered
// camera position & lookAt method -> frame your shot

// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// camera.position.z = 3; // Move forward to your eyes
// camera.position.x = 2; // Move right
// camera.position.y = -2; // Move down

// const target = new THREE.Vector3(0, 0, 0);
// camera.pointAt(target);

// Orthographic camera -> objects appear same size no matter how far camera is (2D games or architectural blueprints)
// Stereo camera -> creates two views of scene (left eye & right eye) (3D movies/games) (VR applications)
// Cube and array cameras etc

// Orbit control -> explore while camera's focus on central point (interact with products on website)

// Trackball controls -> rotate around camera, zoom in and pan (without fixed to a point)

// Fly controls -> flying through 3d world (exploration games, VR environment or flying simulations, google earth VR etc)

// Pointer lock control -> locks cursor on screen and allow user to look around in scene, paired with keyboard to move camera

// first person control -> combine camera rotation and movement (does not require locking mouse pointer) (real estate websites)

import "./style.css";
import * as THREE from "three";

const canvas = document.querySelector("canvas.world");

const scene = new THREE.Scene();
scene.background = new THREE.Color("black");

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;
camera.position.x = 2;
camera.position.y = -2;
camera.lookAt(new THREE.Vector3(0, 0, 0));

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: "green" });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

renderer.render(scene, camera);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // controls.update() // update the controls
  renderer.render(scene, camera);
}

animate();
