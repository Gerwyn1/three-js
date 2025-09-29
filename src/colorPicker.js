import "./style.css";
import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// With lil-gui color picker, you can change:

// Object colors (materials, lights, backgrounds).
// Light colors (ambient, directional, point lights).
// Scene background colors for environment customization.

const scene = new THREE.Scene();
scene.background = new THREE.Color("#000000");

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const gui = new GUI();
const settings = { color: cube.material.color }; // Default color: Green
const sceneSettings = { background: scene.background }; // Default dark blue

gui.addColor(settings, "color").onChange((value) => {
  cube.material.color.set(value);
});
gui.addColor(sceneSettings, "background").onChange((value) => {
  scene.background = new THREE.Color(value);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Recap: Using Color Pickers in lil-gui
// Color Pickers (gui.addColor()) let you modify colors in real-time.
// You can change object materials, lights, and backgrounds dynamically.
// Use folders (gui.addFolder()) to organize color settings neatly.