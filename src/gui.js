// interface that allows you to adjust values and settings in real time

// Material properties (color, opacity, shininess).
// Camera positions (zoom, rotation, movement).
// Object transformations (size, rotation, position).

// dat.gui - (Older, but still widely used).
// lil-gui - (Lightweight and modern replacement for dat.gui).
// Tweakpane - (Advanced UI with plugin support).
// Leva (React only) - (Best for React Three.js projects).
// Among these, lil-gui is the easiest and most lightweight solution.

import "./style.css";
import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const gui = new GUI();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: "lime", wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const settings = { size: 1, posX: 0, posY: 0, posZ: 0, rotX: 0, rotY: 0, rotZ: 0 };

gui.add(settings, "size", 1, 10, 0.01).onChange((value) => {
  cube.scale.set(value, value, value);
});
gui.add(settings, "posX", -5, 5, 0.1).onChange((value) => {
  cube.position.x = value;
});

gui.add(settings, "posY", -5, 5, 0.1).onChange((value) => {
  cube.position.y = value;
});

gui.add(settings, "posZ", -5, 5, 0.1).onChange((value) => {
  cube.position.z = value;
});

gui.add(settings, "rotX", -Math.PI * 2, Math.PI * 2, 0.1).onChange((value) => {
  cube.rotation.x = value;
});

gui.add(settings, "rotY", -Math.PI * 2, Math.PI * 2, 0.1).onChange((value) => {
  cube.rotation.y = value;
});

gui.add(settings, "rotZ", -Math.PI * 2, Math.PI * 2, 0.1).onChange((value) => {
  cube.rotation.z = value;
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// There are multiple types of tweaks you can add to the GUI panel:

// Range (Slider) - Adjust numbers within a minimum and maximum range.
// Color Picker - Choose colors in various formats.
// Text Input - Modify string-based values.
// Checkbox - Toggle between true or false values.
// Dropdown Select - Pick from a list of predefined choices.
// Button - Trigger a function on click.

// practical:
// Adding sliders for object transformations
// Using color pickers to change materials
// Grouping settings inside collapsible folders

// sliders:
// Object transformations (size, position, rotation).
// Material properties (opacity, roughness, metalness).
// Light intensity (brightness, distance, color blending).
