// your object rotates around the x, y, and z axes — and the amount of rotation is measured in radians, not degrees.

// x-axis: nodding your head
// y-axis: shaking your head (no)
// z-axis: spinning wheel (clockwise or anti-clockwise)

// Every object has a .rotation property — and just like position, it uses the x, y, and z axes.

import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Canvas
// const canvas = document.querySelector("canvas.world");
// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add OrbitControls to the camera
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 2.0;

const geometry = new THREE.BoxGeometry(); // width (x-axis), height (y-axis), depth (z-axis)
const material = new THREE.MeshBasicMaterial({ color: "lime", wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// cube.rotation.x = Math.PI / 4;
// cube.rotation.y = Math.PI / 2;
// cube.rotation.z = Math.PI;

// cube.rotation.set(Math.PI / 4, Math.PI / 2, Math.PI);

// Since Three.js uses radians, you’ll often need to convert degrees to radians. Here’s a handy formula:
function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Rotate 45 degrees around the y-axis
cube.rotation.y = degreesToRadians(45);
renderer.render(scene, camera);

// SOLUTION 1
// let direction = 1;
// let bouncingSpeed = 0.02;
// cube.position.y = Math.sin(Date.now() * 0.001) * 2; // Bounce up and down

// SOLUTION 2
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  // cube.position.y -= bouncingSpeed * direction;

  // if (cube.position.y <= -2 || cube.position.y >= 2) {
  //   direction *= -1;
  // }

  // simple oscillation formula using a sine wave (smooth wave) (time-based animation)
  cube.position.y = Math.sin(Date.now() * 0.001) * 2;
  // seconds since page load -> performance.now()
  cube.rotation.y += degreesToRadians(1);
  // renderer.autoClear = true;
  // renderer.clear();
  renderer.render(scene, camera);
}

animate();

// SOLUTION 3
// Frame-based animation: depends on the number of frames rendered since the start
let t = 0;
function animate2() {
  requestAnimationFrame(animate2);
  t += 0.01; // increments each frame
  cube.position.y = Math.sin(t) * 2;
  cube.rotation.y += degreesToRadians(1);
  renderer.render(scene, camera);
}

// animate2()

// SOLUTION 4
// time-based animation (restart)

const start = Date.now();

function animate3() {
  requestAnimationFrame(animate3);
  const elapsed = (Date.now() - start) * 0.001; // seconds
  cube.position.y = Math.sin(elapsed) * 2; // (seconds since page load)
  cube.rotation.y += degreesToRadians(1);
  renderer.render(scene, camera);
}

// animate3()

// Rotations are applied in a specific order in Three.js: X → Y → Z.
// rotation examples:
// Spinning objects: Like a globe, wheel, or loading icon.
// Turning toward a target: Making an object look at another object or direction.
// Animating transitions: Think of a door swinging open or a book turning a page.
// Rotating cameras: To change what part of the scene is in view.

// Math.abs -> bounce upwards OR downwards only (not both)
