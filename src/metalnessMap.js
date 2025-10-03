// import "./style.css";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// // Canvas
// const canvas = document.querySelector("canvas.world");
// // Create a scene
// const scene = new THREE.Scene();

// // Create a camera
// const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 5;

// // Create a renderer
// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas,
//   alpha: true,
// });
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.render(scene, camera);
// document.body.appendChild(renderer.domElement);

// // Add OrbitControls to the camera
// const controls = new OrbitControls(camera, renderer.domElement);

// // 🌞 Main key light — warm golden hue
// const directionalLight = new THREE.DirectionalLight(0xffc36a, 3);
// directionalLight.position.set(-3, 10, -6);
// scene.add(directionalLight);

// const directionalLight2 = new THREE.DirectionalLight(0xffc36a, 30);
// directionalLight2.position.set(6, 10, 6);
// scene.add(directionalLight2);

// // 🔦 Spotlight from above — like an overhead light in a vault
// const spotLight = new THREE.SpotLight(0xffffff, 80);
// spotLight.position.set(0, 15, 5);
// spotLight.angle = Math.PI / 8;
// spotLight.penumbra = 0.3;
// spotLight.decay = 2;
// spotLight.distance = 80;
// scene.add(spotLight);

// // 🔵 Rim light from side — cold tone to contrast warm gold
// const rimLight = new THREE.DirectionalLight(0xffb703, 1.8);
// rimLight.position.set(-8, 6, -4);
// scene.add(rimLight);

// // 🌫️ Ambient soft fill — low intensity to bring general visibility
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
// scene.add(ambientLight);

// // 🟡 Point Light 1 - Front
// const pointLight1 = new THREE.PointLight(0xffd700, 1.2, 15);
// scene.add(pointLight1);

// // 🔴 Point Light 2 - Side
// const pointLight2 = new THREE.PointLight(0xffa500, 1, 15);
// scene.add(pointLight2);

// // 🔵 Point Light 3 - Back
// const pointLight3 = new THREE.PointLight(0xffffff, 3, 15);
// scene.add(pointLight3);

// // Create a geometry
// const geometry = new THREE.CylinderGeometry(0.5, 0.5, 3);

// // Textures
// const textureLoader = new THREE.TextureLoader();
// const colorMap = textureLoader.load("/src/Metal049A_1K-PNG/Metal049A_1K-PNG_Color.png");
// const normalMap = textureLoader.load("/src/Metal049A_1K-PNG/Metal049A_1K-PNG_NormalGL.png");
// const roughnessMap = textureLoader.load("/src/Metal049A_1K-PNG/Metal049A_1K-PNG_Roughness.png");
// const metalnessMap = textureLoader.load("/src/Metal049A_1K-PNG/Metal049A_1K-PNG_Metalness.png");

// // Create a material
// const material = new THREE.MeshStandardMaterial({
//   map: colorMap,
//   normalMap: normalMap,
//   roughnessMap: roughnessMap,
//   metalnessMap: metalnessMap,
//   metalness: 0.5,
//   roughness: 0.5,
// });

// const mesh = new THREE.Mesh(geometry, material);

// scene.add(mesh);

// import GUI from "lil-gui";

// // GUI
// const gui = new GUI();

// // Material folder
// const matFolder = gui.addFolder("Material");

// // Roughness slider
// matFolder.add(material, "roughness", 0, 1, 0.01);

// // Metalness slider
// matFolder.add(material, "metalness", 0, 1, 0.01);

// // Toggle texture maps
// const params = {
//   colorMap: !!material.map,
//   normalMap: !!material.normalMap,
//   roughnessMap: !!material.roughnessMap,
//   metalnessMap: !!material.metalnessMap,
// };

// matFolder.add(params, "colorMap").onChange((v) => {
//   material.map = v ? colorMap : null;
//   material.needsUpdate = true;
// });

// matFolder.add(params, "normalMap").onChange((v) => {
//   material.normalMap = v ? normalMap : null;
//   material.needsUpdate = true;
// });

// matFolder.add(params, "roughnessMap").onChange((v) => {
//   material.roughnessMap = v ? roughnessMap : null;
//   material.needsUpdate = true;
// });

// matFolder.add(params, "metalnessMap").onChange((v) => {
//   material.metalnessMap = v ? metalnessMap : null;
//   material.needsUpdate = true;
// });

// matFolder.open();

// // Render the scene
// function animate() {
//   requestAnimationFrame(animate);

//   const t = Date.now() * 0.001; // time in seconds

//   // Circular movement (orbit radius = 3)
//   pointLight1.position.set(Math.cos(t) * 3, 0, Math.sin(t) * 3);
//   pointLight2.position.set(Math.cos(t + (Math.PI * 2) / 3) * 3, 2, Math.sin(t + (Math.PI * 2) / 3) * 3);
//   pointLight3.position.set(Math.cos(t + (Math.PI * 4) / 3) * 3, 4, Math.sin(t + (Math.PI * 4) / 3) * 3);

//   controls.update();
//   renderer.render(scene, camera);
// }
// animate();

// A metalness map is a black-and-white texture that tells your 3D object which parts should behave like metal.

// White areas are fully metallic — shiny, conductive, and reflective.
// Black areas are non-metallic — like plastic, wood, or paint.
// Gray areas are partially metallic — like brushed or coated metals.

// You don’t always want the whole model to look metallic. Sometimes just the edges are shiny, or only one surface is painted metal — and a metalness map gives you that control.

// Let’s say you’re building one of these:

// A rusty sword with shiny worn edges
// A battle-damaged robot with exposed metal underneath
// A designer wristwatch with polished steel details
// A sci-fi spaceship with metal plating and painted panels

// Instead of using multiple materials or adding more geometry, you can just use one metalness map to describe which areas reflect light like real metal.

// You’ll use metalness maps in any project that needs physically accurate material behavior.

// Game assets and props
// Product visualizations with brushed steel or chrome details
// Armor, spaceships, machinery
// Anything rendered with PBR (Physically Based Rendering)

// In real-world material science, metals reflect light in a completely different way than non-metals — especially at glancing angles.

// That’s exactly what the metalness workflow in PBR rendering simulates.

// Engines like Unreal Engine, Unity HDRP, and Blender Cycles use the same model — so learning it here is future-proof 🎯

// Where Can I Get Metalness Maps?
// Here are some great free resources to grab full PBR texture sets (including metalness):

// ambientCG.com – Stylized and realistic PBR packs
// Poly Haven – High-res CC0 textures
// 3DTextures.me – Great stylized metal sets
// CGBookcase – Well-categorized metal surfaces

// Metalness Maps give you precise control over which parts of your model reflect light like real metal — no hacks, no extra materials, just pure realism.

// “Mastering metalness is the key to believable surfaces in 3D.”

// Next, we’ll explore
// ambient occlusion maps
// to simulate how light gets trapped in tiny cracks and corners 🕳️

// ⚠️ Metals don’t glow on their own — they reflect light. So without good lighting, they can appear dark or flat.

// That’s why in this scene:
// We set metalness: 1
// We boosted DirectionalLight and SpotLight intensities
// Three PointLights rotating around the object for dynamic highlights

// This is great for objects like gold coins, metal armor, or spaceship panels.

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
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);

// Add OrbitControls to the camera
const controls = new OrbitControls(camera, renderer.domElement);

// 🌞 Main key light — warm golden hue
const directionalLight = new THREE.DirectionalLight(0xffc36a, 600);
directionalLight.position.set(0, 36, -6);
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffc36a, 600);
directionalLight2.position.set(6, 6, 6);
scene.add(directionalLight2);

// 🔦 Spotlight from above — like an overhead light in a vault
const spotLight = new THREE.SpotLight(0xffffff, 800);
spotLight.position.set(0, 15, 5);
spotLight.angle = Math.PI / 8;
spotLight.penumbra = 0.3;
spotLight.decay = 2;
spotLight.distance = 80;
scene.add(spotLight);

// 🔵 Rim light from side — cold tone to contrast warm gold
const rimLight = new THREE.DirectionalLight(0xffb703, 180);
rimLight.position.set(-8, 6, -4);
scene.add(rimLight);

// 🌫️ Ambient soft fill — low intensity to bring general visibility
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// 🟡 Point Light 1 - Front
const pointLight1 = new THREE.PointLight(0xffd700, 200, 15);
scene.add(pointLight1);

// 🔴 Point Light 2 - Side
const pointLight2 = new THREE.PointLight(0xffa500, 300, 15);
scene.add(pointLight2);

// 🔵 Point Light 3 - Back
const pointLight3 = new THREE.PointLight(0xffffff, 300, 15);
scene.add(pointLight3);

// Create a geometry
const geometry = new THREE.CylinderGeometry(0.5, 0.5, 3);

// Textures
const textureLoader = new THREE.TextureLoader();
const colorMap = textureLoader.load("/src/Metal049A_1K-PNG/Metal049A_1K-PNG_Color.png");
const normalMap = textureLoader.load("/src/Metal049A_1K-PNG/Metal049A_1K-PNG_NormalGL.png");
const roughnessMap = textureLoader.load("/src/Metal049A_1K-PNG/Metal049A_1K-PNG_Roughness.png");
const metalnessMap = textureLoader.load("/src/Metal049A_1K-PNG/Metal049A_1K-PNG_Metalness.png");
const aoMap = textureLoader.load("/src/Metal049A_1K-PNG/Bricks031_1K-PNG_AmbientOcclusion.png");

// Create a material
const material = new THREE.MeshStandardMaterial({
  map: colorMap,
  normalMap: normalMap,
  roughnessMap: roughnessMap,
  metalnessMap: metalnessMap,
  aoMap: aoMap,
  metalness: 1,
  roughness: 0,
});

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

import GUI from "lil-gui";

// GUI
const gui = new GUI();

// Material folder
const matFolder = gui.addFolder("Material");

// Roughness slider
matFolder.add(material, "roughness", 0, 1, 0.01);

// Metalness slider
matFolder.add(material, "metalness", 0, 1, 0.01);

// Toggle texture maps
const params = {
  colorMap: !!material.map,
  normalMap: !!material.normalMap,
  roughnessMap: !!material.roughnessMap,
  metalnessMap: !!material.metalnessMap,
  aoMap: !!material.aoMap,
};

matFolder.add(params, "colorMap").onChange((v) => {
  material.map = v ? colorMap : null;
  material.needsUpdate = true;
});

matFolder.add(params, "normalMap").onChange((v) => {
  material.normalMap = v ? normalMap : null;
  material.needsUpdate = true;
});

matFolder.add(params, "roughnessMap").onChange((v) => {
  material.roughnessMap = v ? roughnessMap : null;
  material.needsUpdate = true;
});

matFolder.add(params, "metalnessMap").onChange((v) => {
  material.metalnessMap = v ? metalnessMap : null;
  material.needsUpdate = true;
});

matFolder.add(params, "aoMap").onChange((v) => {
  material.aoMap = v ? aoMap : null;
  material.needsUpdate = true;
});

matFolder.open();

// Render the scene
function animate() {
  requestAnimationFrame(animate);

  const t = Date.now() * 0.001; // time in seconds

  // Circular movement (orbit radius = 3)
  pointLight1.position.set(Math.cos(t) * 3, 0, Math.sin(t) * 3);
  pointLight2.position.set(Math.cos(t + (Math.PI * 2) / 3) * 3, 2, Math.sin(t + (Math.PI * 2) / 3) * 3);
  pointLight3.position.set(Math.cos(t + (Math.PI * 4) / 3) * 3, 4, Math.sin(t + (Math.PI * 4) / 3) * 3);

  controls.update();
  renderer.render(scene, camera);
}
animate();
