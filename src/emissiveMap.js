import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Canvas
const canvas = document.querySelector("canvas.world");
// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true, // Allow background transparency (for CSS gradients etc.)
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);

// Add OrbitControls to the camera
const controls = new OrbitControls(camera, renderer.domElement);

// Create a geometry
const geometry = new THREE.SphereGeometry(1.5, 32, 32);

// 🌫 Ambient — super soft base
const ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
scene.add(ambientLight);

// 🔦 Directional light — subtle top-down sheen
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(2, 5, 2);
scene.add(directionalLight);

// 🔵 Rim Light — emphasize glossy edges (cool blue tone)
const rimLight = new THREE.DirectionalLight(0xffffff, 1.2);
rimLight.position.set(-4, 3, -4);
scene.add(rimLight);

// 🔁 Optional: slowly rotating point light to reveal glow dynamically
const pointLight = new THREE.PointLight(0xffffff, 2.5, 10);
scene.add(pointLight);

const textureLoader = new THREE.TextureLoader();
const colorMap = textureLoader.load("/src/Sci-Fi_Wall_016_SD/Sci-Fi_Wall_016_basecolor.png");
const normalMap = textureLoader.load("/src/Sci-Fi_Wall_016_SD/Sci-Fi_Wall_016_normal.png");
const roughnessMap = textureLoader.load("/src/Sci-Fi_Wall_016_SD/Sci-Fi_Wall_016_roughness.png");
const metalnessMap = textureLoader.load("/src/Sci-Fi_Wall_016_SD/Sci-Fi_Wall_016_metallic.png");
const emissiveMap = textureLoader.load("/src/Sci-Fi_Wall_016_SD/Sci-Fi_Wall_016_emissive.png");

// ✅ Repeating Textures
// Instead of writing repeat code for each texture, we loop through them in an array
[colorMap, normalMap, roughnessMap, metalnessMap, emissiveMap].forEach((texture) => {
  texture.wrapS = THREE.RepeatWrapping; // horizontal tiling
  texture.wrapT = THREE.RepeatWrapping; // vertical tiling
  texture.repeat.set(5, 3); // how many times to repeat across the geometry
});

// Create a material

const material = new THREE.MeshStandardMaterial({
  map: colorMap,
  normalMap: normalMap,
  roughnessMap: roughnessMap,
  roughness: 0,
  metalnessMap: metalnessMap,
  // ✨ Emissive Setup
  // The color of the glow — it doesn’t light the scene, but it glows on the mesh
  emissiveMap: emissiveMap, // The glowing pattern
  emissive: new THREE.Color("#00ff99"), // Glow color (green neon)
  emissiveIntensity: 5, // Brightness of the glow
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Render the scene
function animate() {
  requestAnimationFrame(animate);

  // 🔁 Animate the point light in a circular motion around the object
  const time = Date.now() * 0.001;
  pointLight.position.set(Math.sin(time) * 3, 2, Math.cos(time) * 3);

  controls.update();
  renderer.render(scene, camera);
}

animate();

// Because some things in the real world don’t just reflect light —
// they create it.

// Like:

// The screen you’re reading this on
// Neon signs glowing at night
// A lava crack pulsing in the dark
// A spaceship panel blinking with power

// An emissive map is a black-and-white (or colored) texture that tells your material:
// “This part emits light on its own.”

// It doesn’t cast shadows or light up other objects —
// but it makes the surface glow, even in total darkness.

// Black = no glow
// White = full glow
// Color = colored glow

// It’s perfect for simulating screens, power lines, magic runes, sci-fi tech, or anything else that feels alive with light.

// This is great for sci-fi panels, blinking signals, or magical energy effects.