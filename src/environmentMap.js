// CUBE:

// import "./style.css";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import GUI from "lil-gui";

// // Canvas
// const canvas = document.querySelector("canvas.world");

// // Scene
// const scene = new THREE.Scene();

// // Camera
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 5;
// scene.add(camera);

// // Renderer
// const renderer = new THREE.WebGLRenderer({ canvas });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Controls
// const controls = new OrbitControls(camera, renderer.domElement);

// // Directional Light
// const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
// directionalLight.position.set(3, 3, 3);
// scene.add(directionalLight);

// // Env Map
// const cubeTextureLoader = new THREE.CubeTextureLoader();
// const envMap = cubeTextureLoader.load([
//   "/src/Cube_Texture/Generated Image October 03, 2025 - 7_55PM.png",
//   "/src/Cube_Texture/Generated Image October 03, 2025 - 7_56PM (1).png",
//   "/src/Cube_Texture/Generated Image October 03, 2025 - 7_56PM (2).png",
//   "/src/Cube_Texture/Generated Image October 03, 2025 - 7_56PM (3).png",
//   "/src/Cube_Texture/Generated Image October 03, 2025 - 7_56PM (4).png",
//   "/src/Cube_Texture/Generated Image October 03, 2025 - 7_56PM.png",
// ]);
// scene.background = envMap;

// // Material Config
// const config = {
//   envMapIntensity: 1,
//   roughness: 0.1,
//   metalness: 1,
//   color: "#ffffff",
//   lightColor: "#ffffff",
//   lightIntensity: 2,
//   sceneIntensity: 1,
// };

// // Material
// const material = new THREE.MeshStandardMaterial({
//   envMap: envMap,
//   envMapIntensity: config.envMapIntensity,
//   roughness: config.roughness,
//   metalness: config.metalness,
//   color: new THREE.Color(config.color),
// });

// // Mesh
// const sphere = new THREE.Mesh(new THREE.SphereGeometry(2, 64, 64), material);
// scene.add(sphere);

// // GUI
// const gui = new GUI();
// gui.addColor(config, "color").onChange((value) => {
//   material.color.set(value);
// });
// gui.add(config, "roughness", 0, 1, 0.01).onChange((value) => {
//   material.roughness = value;
// });
// gui.add(config, "metalness", 0, 1, 0.01).onChange((value) => {
//   material.metalness = value;
// });
// gui.add(config, "envMapIntensity", 0, 5, 0.1).onChange((value) => {
//   material.envMapIntensity = value;
// });
// gui.addColor(config, "lightColor").onChange((value) => {
//   directionalLight.color.set(value);
// });
// gui.add(config, "lightIntensity", 0, 10, 0.1).onChange((value) => {
//   directionalLight.intensity = value;
// });
// gui.add(config, "sceneIntensity", 0, 5, 0.1).onChange((value) => {
//   scene.backgroundIntensity = value;
// });

// // Animate
// function animate() {
//   requestAnimationFrame(animate);
//   controls.update();
//   renderer.render(scene, camera);
// }
// animate();

// HDRI:
import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import GUI from "lil-gui";

// Canvas
const canvas = document.querySelector("canvas.world");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(4, 4, 4);
scene.add(directionalLight);

// Material Config
const config = {
  envMapIntensity: 1,
  roughness: 0.1,
  metalness: 1,
  color: "#ffffff",
  lightColor: "#ffffff",
  lightIntensity: 3,
  sceneIntensity: 1,
};

// Material (initial setup)
const material = new THREE.MeshStandardMaterial({
  roughness: config.roughness,
  metalness: config.metalness,
  color: new THREE.Color(config.color),
});

const sphere = new THREE.Mesh(new THREE.SphereGeometry(2, 64, 64), material);
scene.add(sphere);

// Load HDRI Env Map
const rgbeLoader = new RGBELoader();
rgbeLoader.load("/src/Cube_Texture/HDR_041_Path.hdr", (hdrMap) => {
  hdrMap.mapping = THREE.EquirectangularReflectionMapping;

  scene.background = hdrMap;
  scene.environment = hdrMap;

  material.envMap = hdrMap;
  material.envMapIntensity = config.envMapIntensity;
});

// GUI
const gui = new GUI();
gui.addColor(config, "color").onChange((value) => {
  material.color.set(value);
});
gui.add(config, "roughness", 0, 1, 0.01).onChange((value) => {
  material.roughness = value;
});
gui.add(config, "metalness", 0, 1, 0.01).onChange((value) => {
  material.metalness = value;
});
gui.add(config, "envMapIntensity", 0, 5, 0.1).onChange((value) => {
  material.envMapIntensity = value;
});
gui.addColor(config, "lightColor").onChange((value) => {
  directionalLight.color.set(value);
});
gui.add(config, "lightIntensity", 0, 10, 0.1).onChange((value) => {
  directionalLight.intensity = value;
});

// Animate
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// An environment map is a 360° image that wraps around your entire 3D scene.

// It tells every reflective material what’s “around” it — so it can reflect light more realistically.

// Used to simulate sky, buildings, landscapes, or abstract HDR light
// Reflected automatically on metallic or clearcoat surfaces
// Creates deep realism without modeling a full environment

// In Three.js, we load these images using a CubeTextureLoader or set a single image as a scene.environment.

// You can also use the same image as a giant inverted sphere — a Panorma — to visually wrap your scene.
// Panorma is a background trick. Environment map is a reflection trick.
// Together, they give your world a believable atmosphere and your objects a story to reflect.

// A panorama inverted sphere, also known as a "little planet" or "tiny planet", is a 360-degree spherical panorama transformed into a small planet-like projection by flipping the image and applying a polar coordinates filter to create a circular, immersive view. This technique is often used in drone photography and is created by capturing a series of overlapping photos and stitching them into a seamless 360-degree panorama before distorting it

// Environment maps:
// Reflect surroundings: Great for metals, glass, shiny plastics
// Light the scene: Simulate ambient lighting and tone
// Complete realism: Ground your 3D object in a believable world
// You can reflect a forest, a sky, a sunset, a glowing sci-fi lab — whatever the vibe is, your materials will respond.

// 🌎 Types of Environment Maps
// Cube Map: A 6-sided texture that wraps the scene like a cube. Each side reflects a different direction (px, nx, py, ny, pz, nz).
// Equirectangular Map (HDR): A panoramic texture — often used with HDRI for light and tone-rich reflections.

// Cube maps are easier and more flexible. HDRI maps give higher realism and dynamic light — but are heavier.

// Here are some free sources for environment maps and HDRIs:
// Poly Haven – Best free HDRIs (CC0 license)
// HDRI Haven – Same as Poly Haven, older UI
// HDRI Hub – Premium and free
// Humus Textures – Sci-fi and natural HDRIs
// Textures.com – Requires sign-up

// Convert HDRI → CubeMap easily here: matheowis.github.io/HDRI-to-CubeMap

// ✨ The higher the envMapIntensity, the stronger the reflection effect.

// 🎉 That’s a wrap on our
// Textures Module
//  You’ve learned how to paint, sculpt, reflect, and even glow with nothing but images. Next up: we’re stepping into the world of
// Models
// — learning how to import, optimize, and animate fully-fledged 3D characters, props, and scenes. Get ready to bring your creations to life 🚀
