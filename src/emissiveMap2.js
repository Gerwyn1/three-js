import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";

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
const aoMap = textureLoader.load("/src/Sci-Fi_Wall_016_SD/Sci-Fi_Wall_016_ambientOcclusion.png");

// ✅ Repeating Textures
// Instead of writing repeat code for each texture, we loop through them in an array
[colorMap, normalMap, roughnessMap, metalnessMap, aoMap, emissiveMap].forEach((texture) => {
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
  metalness: 1,
  aoMap: aoMap,
  // ✨ Emissive Setup
  // The color of the glow — it doesn’t light the scene, but it glows on the mesh
  emissiveMap: emissiveMap, // The glowing pattern
  emissive: new THREE.Color("#59ff00"), // Glow color (green neon)
  emissiveIntensity: 5, // Brightness of the glow
});

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// 🔧 GUI Controls
const gui = new GUI();
const settings = {
  useColorMap: true,
  useNormalMap: true,
  useRoughnessMap: true,
  useMetalnessMap: true,
  useEmissiveMap: true,
  emissiveColor: "#59ff00",
  emissiveIntensity: 5,
  disableLights: false,
};

// Toggles
gui
  .add(settings, "useColorMap")
  .name("Use Color Map")
  .onChange((v) => {
    material.map = v ? colorMap : null;
    material.needsUpdate = true;
  });

gui
  .add(settings, "useNormalMap")
  .name("Use Normal Map")
  .onChange((v) => {
    material.normalMap = v ? normalMap : null;
    material.needsUpdate = true;
  });

gui
  .add(settings, "useRoughnessMap")
  .name("Use Roughness Map")
  .onChange((v) => {
    material.roughnessMap = v ? roughnessMap : null;
    material.needsUpdate = true;
  });

gui
  .add(settings, "useMetalnessMap")
  .name("Use Metalness Map")
  .onChange((v) => {
    material.metalnessMap = v ? metalnessMap : null;
    material.needsUpdate = true;
  });

gui
  .add(settings, "useEmissiveMap")
  .name("Use Emissive Map")
  .onChange((v) => {
    material.emissiveMap = v ? emissiveMap : null;
    material.needsUpdate = true;
  });

gui
  .addColor(settings, "emissiveColor")
  .name("Emissive Color")
  .onChange((value) => {
    material.emissive = new THREE.Color(value);
  });

gui
  .add(settings, "emissiveIntensity", 0, 10, 0.1)
  .name("Emissive Intensity")
  .onChange((value) => {
    material.emissiveIntensity = value;
  });

gui
  .add(settings, "disableLights")
  .name("🔦 Disable All Lights")
  .onChange((value) => {
    directionalLight.visible = !value;
    rimLight.visible = !value;
    pointLight.visible = !value;
    ambientLight.visible = !value;
  });

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

// ⚠️ Emissive Is Not Real Light (But That’s Okay) Let’s be clear:

// An emissive material appears to glow — but it doesn’t actually cast light onto nearby objects like a real PointLight.

// It’s a visual trick — a powerful and convincing one.

// If you want your glowing object to truly illuminate the environment, you’ll need to combine it with actual lights in your scene.

// Emissive maps shine for simulating things like neon signs, power cores, magic runes, and futuristic UI — especially in stylized or cinematic scenes.

// Next up: we’ll explore the
// Specular Map
// — and how it controls the sharpness and brightness of reflections on different parts of a surface for that extra layer of realism ✨
