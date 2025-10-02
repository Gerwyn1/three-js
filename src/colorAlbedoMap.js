// Color Map/Map -> base or pure color without lighting or shading information. it’s the pure color of the object as it would appear under neutral lighting conditions

// Color Map as a skin wrapped around your object — it decides what your object actually looks like visually.

// Without a color map, your material is just a flat color. With a color map, you can simulate painted surfaces, fabrics, natural textures like wood, and more — all using just an image file.

// Where to Find Color Maps: (ambientCG.com and Poly Haven) are excellent free sources for high-quality textures.

// example 1:

// import "./style.css";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// // Create a scene
// const scene = new THREE.Scene();

// // Create a camera
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 5;

// // Create a renderer
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.render(scene, camera);
// document.body.appendChild(renderer.domElement);

// // Add OrbitControls to the camera
// const controls = new OrbitControls(camera, renderer.domElement);

// // Create a geometry
// const geometry = new THREE.BoxGeometry(2, 2, 2);

// // Load the color texture
// const textureLoader = new THREE.TextureLoader();
// const colorTexture = textureLoader.load("/src/cubestone.png");

// // Create a material using the color map
// const material = new THREE.MeshBasicMaterial({
//   map: colorTexture,
// });

// const mesh = new THREE.Mesh(geometry, material);

// scene.add(mesh);

// // Render the scene
// function animate() {
//   requestAnimationFrame(animate);
//   controls.update(); // Update the controls
//   renderer.render(scene, camera);
// }
// animate();

// Common Use Cases
// Applying wood, brick, or fabric patterns
// Showing printed labels or logos on objects
// Creating stylized hand-painted or realistic textures

// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;
// colorTexture.repeat.set(2, 2);
// This repeats your texture 2 times horizontally and vertically — great for tiling!

// example 2:
import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Texture Loader
const textureLoader = new THREE.TextureLoader();
const brickTexture = textureLoader.load("/src/cubestone.png");

brickTexture.wrapS = THREE.RepeatWrapping; // Repeat horizontally
brickTexture.wrapT = THREE.RepeatWrapping; // Repeat vertically
brickTexture.repeat.set(2, 2);

// Create a large plane geometry (like a floor)
const geometry = new THREE.PlaneGeometry(50, 50);
const material = new THREE.MeshBasicMaterial({
  map: brickTexture, // The color map only affects appearance — to add realistic bumps and shadows, we need normal maps. That’s what we’ll explore next 👇
  side: THREE.DoubleSide,
});

const plane = new THREE.Mesh(geometry, material);
// plane.rotation.y = Math.PI / 2; // Lay it flat like a floor
plane.position.z = -75;
scene.add(plane);

// Add a directional light so the material shows well
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

// Animate
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
