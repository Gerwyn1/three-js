import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap"; // ✅ Import GSAP

// Canvas
const canvas = document.querySelector("canvas.world");

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

// Add OrbitControls to the camera
const controls = new OrbitControls(camera, renderer.domElement);

// Create a geometry
const geometry = new THREE.BoxGeometry();

// Create a material
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
}); // Green color

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// ✅ Animate the mesh with GSAP
gsap.to(mesh.position, {
  x: 2,
  duration: 2,
  ease: "power2.out",
});

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Update the controls
  renderer.render(scene, camera);
}
animate();
