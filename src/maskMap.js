import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Canvas
const canvas = document.querySelector("canvas.world");
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Geometry
const geometry = new THREE.PlaneGeometry(3, 3);

// Lights
const keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
keyLight.position.set(2, 4, -4);
scene.add(keyLight);

// 🌫️ Ambient — soft fill so it's never completely dark
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 30, 30);
pointLight.position.set(0, 3.5, 3);
scene.add(pointLight);

// Texture loading
const loader = new THREE.TextureLoader();
const colorMap = loader.load("/src/Mask_Map/color.png");
const normalMap = loader.load("/src/Mask_Map/normal.png");
const aoMap = loader.load("/src/Mask_Map/ao.png");
const specMap = loader.load("/src/Mask_Map/spec.png");
const alphaMap = loader.load("/src/Mask_Map/alpha.png");

// Material
// 🌿 MeshPhysicalMaterial — supports real-world physical effects
const material = new THREE.MeshPhysicalMaterial({
  map: colorMap,
  normalMap: normalMap,
  roughness: 0.4,
  aoMap: aoMap,
  specularMap: specMap,
  specularColor: new THREE.Color(0xffffff), // highlight color
  alphaMap: alphaMap,
  transparent: true, // required for alphaMap
  side: THREE.DoubleSide, // show both sides of the leaf

  // 🍃 Leafy magic
  transmission: 0.9, // how much light passes through
  thickness: 0.2, // how thick the leaf is (affects light diffusion)
  ior: 1.1, // index of refraction (like soft gel)
  reflectivity: 0.1, // soft sheen
  clearcoat: 0.1, // optional glossy coating
});

// Mesh
const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.set(0, Math.PI, -Math.PI / 2);
scene.add(mesh);

// Animate
function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}
animate();

// An alpha map is a grayscale texture used to control the transparency of a material — it tells Three.js where the object should be visible or invisible.

// White = fully opaque (100% visible)
// Black = fully transparent (completely see-through)
// Gray = semi-transparent

// This is often called a Mask Map in other engines like Unity or Unreal — but in Three.js, the correct name is Alpha Map.

// Imagine you’re creating:

// A leaf with jagged edges — no need to model every detail
// Fence patterns, holes, cutouts — without extra geometry
// Decals and stencils — add logos or stickers that blend in
// Using an alpha map lets you hide parts of your object using just an image — no extra modeling or geometry needed.

// Without it (transparent:true), your alpha map will load, but won’t have any visual effect. It’s what tells Three.js to respect the alpha channel in the rendering process.

// If you forget this, the object will look fully solid — even if your alphaMap is working underneath.

// Color Map for the texture
// Normal Map for bumpiness
// AO Map for shadows
// Specular Map for shiny highlights
// Alpha Map to cut out leaf shape

// Next, we’ll explore
// Environment Maps
// — the secret to reflections and shiny surfaces that feel like they’re inside a real world 🌍✨
