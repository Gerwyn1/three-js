// Before PBR (Physically Based Rendering) became the standard, 3D artists controlled reflectivity using something called a specular map.

// And even today — in stylized shaders, legacy projects, or custom engines — specular maps still matter.

// 🧩 Work with stylized or retro projects using MeshPhongMaterial
// 📦 Import older models from platforms like Sketchfab or TurboSquid

// Use MeshPhongMaterial, not MeshStandardMaterial, when working with specularMap.

// When Should You Use It?
// You’re working with legacy assets
// You want manual control over shiny parts like lips, ceramic, or glass edges
// You’re building for mobile devices and need ultra-lightweight materials

import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";

// Canvas
const canvas = document.querySelector("canvas.world");
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Geometry
const geometry = new THREE.SphereGeometry(1, 32, 32);

// Lights (no GUI)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const rimLight = new THREE.DirectionalLight(0xffffff, 1.5);
rimLight.position.set(-4, 3, -4);
scene.add(rimLight);

const pointLight = new THREE.PointLight(0xffffff, 5, 10);
scene.add(pointLight);

// Textures
const textureLoader = new THREE.TextureLoader();
const colorMap = textureLoader.load("/src/Specular_Map/Metal_Mesh_001_COLOR.jpg");
const normalMap = textureLoader.load("/src/Specular_Map/Metal_Mesh_001_NORM.jpg");
const specularMap = textureLoader.load("/src/Specular_Map/Metal_Mesh_001_SPEC.jpg");
const aoMap = textureLoader.load("/src/Specular_Map/Metal_Mesh_001_OCC.jpg");

// ✅ Repeating Textures
// Instead of writing repeat code for each texture, we loop through them in an array
[colorMap, normalMap, specularMap].forEach((texture) => {
  texture.wrapS = THREE.RepeatWrapping; // horizontal tiling
  texture.wrapT = THREE.RepeatWrapping; // vertical tiling
  texture.repeat.set(1.5, 1.5); // how many times to repeat across the geometry
});

// Material
const material = new THREE.MeshPhongMaterial({
  map: colorMap,
  normalMap: normalMap,
  aoMap: aoMap,
  specularMap: specularMap,
  shininess: 150,
  specular: new THREE.Color(0xffffff),
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// GUI Setup (only for maps and specular settings)
const gui = new GUI();
const settings = {
  showColorMap: true,
  showNormalMap: true,
  showSpecularMap: true,
  shininess: material.shininess,
  specularColor: "#ffffff",
};

gui
  .add(settings, "showColorMap")
  .name("Use Color Map")
  .onChange((val) => {
    material.map = val ? colorMap : null;
    material.needsUpdate = true;
  });

gui
  .add(settings, "showNormalMap")
  .name("Use Normal Map")
  .onChange((val) => {
    material.normalMap = val ? normalMap : null;
    material.needsUpdate = true;
  });

gui
  .add(settings, "showSpecularMap")
  .name("Use Specular Map")
  .onChange((val) => {
    material.specularMap = val ? specularMap : null;
    material.needsUpdate = true;
  });

gui
  .add(settings, "shininess", 0, 300)
  .name("Shininess")
  .onChange((val) => {
    material.shininess = val;
  });

gui
  .addColor(settings, "specularColor")
  .name("Specular Color")
  .onChange((val) => {
    material.specular.set(val);
  });

// Animate
function animate() {
  requestAnimationFrame(animate);
  const time = Date.now() * 0.001;
  pointLight.position.set(Math.sin(time) * 3, 2, Math.cos(time) * 3);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Next up: we’ll explore
// Alpha Maps
// — to control transparency with the precision of a stencil ✂️
