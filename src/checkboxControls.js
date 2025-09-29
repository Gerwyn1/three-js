import "./style.css";
import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// In the previous lesson, we explored how to use color pickers in lil-gui to dynamically change object materials, lights, and background colors.

// Checkbox:
// Toggling object visibility (show/hide an object).
// Enabling/disabling wireframes for debugging.
// Turning lights on/off dynamically.
// Activating or deactivating special effects (like shadows or animations).

const params = {
  animateCube: false,
};

const gui = new GUI();
const settings = { visible: true, wireframe: false, animation: params.animateCube };

gui.add(settings, "visible").onChange((value) => {
  cube.visible = value;
});

gui.add(settings, "wireframe").onChange((value) => {
  cube.material.wireframe = value;
});

gui.add(settings, "animation").onChange((value) => {
  params.animateCube = value;
});

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

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  if (params.animateCube) {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
