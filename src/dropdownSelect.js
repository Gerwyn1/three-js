import "./style.css";
import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
scene.background = new THREE.Color("#000000");

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

let geometry = new THREE.BoxGeometry();
let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const gui = new GUI();
// Define Available Shapes (dropdown options)
const shapeOptions = { Cube: "cube", Sphere: "sphere", Cylinder: "cylinder" };
// Store the Selected Shape (default value)
const settings = { shape: "cube" };

gui.add(settings, "shape", shapeOptions).onChange((value) => {
  if (cube) {
    cube.geometry.dispose(); // free old geometry GPU buffers
    // Why not material.dispose() in your code?
    // In your snippet, you’re reusing the same material across all shapes:
    // If you call material.dispose(), you would destroy the GPU program and textures behind it, and the next mesh wouldn’t have a valid material anymore (you’d get warnings or errors).
    scene.remove(cube);
  }
  let geometry;
  if (value === "cube") geometry = new THREE.BoxGeometry();
  if (value === "sphere") geometry = new THREE.SphereGeometry(0.7, 32, 32);
  if (value === "cylinder") geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);

  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
});

const animationOptions = {
  None: "none",
  Rotate: "rotate",
  Bounce: "bounce",
};
const animationSettings = { animation: "none" };
gui.add(animationSettings, "animation", animationOptions);

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  if (animationSettings.animation === "rotate") {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }

  if (animationSettings.animation === "bounce") {
    cube.position.y = Math.sin(Date.now() * 0.002) * 2;
  }
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
