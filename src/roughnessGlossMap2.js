import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";

// Canvas
const canvas = document.querySelector("canvas.world");
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true, // 👈 This enables canvas transparency
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// LIGHTS
// KEY LIGHT – strong directional light from front-top-left
const keyLight = new THREE.DirectionalLight(0xffffff, 3);
keyLight.position.set(6, 10, 6);
scene.add(keyLight);

// RIM LIGHT – from the back right, for silhouette & highlight
const rimLight = new THREE.DirectionalLight(0xffffff, 2);
rimLight.position.set(-6, 8, -6);
scene.add(rimLight);

// FILL LIGHT – soft light from the front to fill shadows
const fillLight = new THREE.PointLight(0xffffff, 30, 30);
fillLight.position.set(0, -6, 0);
scene.add(fillLight);

// SOFT SPOT – camera-facing soft bounce light
const bounceLight = new THREE.SpotLight(0xffffff, 5);
bounceLight.position.set(0, 15, 10);
bounceLight.angle = Math.PI / 8;
bounceLight.penumbra = 0.5;
bounceLight.decay = 2;
bounceLight.distance = 100;
scene.add(bounceLight);

// AMBIENT – subtle base glow
const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

// Geometry
const geometry = new THREE.SphereGeometry(1.5, 128, 128);

// Textures
const textureLoader = new THREE.TextureLoader();
const colorMap = textureLoader.load("/src/Bricks031_1K-PNG_Color.png");
const normalMap = textureLoader.load("/src/Bricks031_1K-PNG_NormalGL.png");
const roughnessMap = textureLoader.load("/src/Bricks031_1K-PNG_Roughness.png");
const displacementMap = textureLoader.load("/src/Bricks031_1K-PNG_Displacement.png");
const aoMap = textureLoader.load("/src/Bricks031_1K-PNG_AmbientOcclusion.png");

// Material
const material = new THREE.MeshStandardMaterial({
  map: colorMap,
  normalMap: normalMap,
  roughnessMap: roughnessMap, // Apply the map
  // displacementMap: displacementMap,
  // displacementScale: 0.15,
  // aoMap: aoMap,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// GUI
const gui = new GUI();
const settings = {
  showColorMap: true,
  showNormalMap: true,
  useRoughnessMap: true,
  roughnessValue: 0,
};

gui
  .add(settings, "showColorMap")
  .name("Use Color Map")
  .onChange((value) => {
    material.map = value ? colorMap : null;
    material.needsUpdate = true;
  });

gui
  .add(settings, "showNormalMap")
  .name("Use Normal Map")
  .onChange((value) => {
    material.normalMap = value ? normalMap : null;
    material.needsUpdate = true;
  });

gui
  .add(settings, "useRoughnessMap")
  .name("Use Roughness Map")
  .onChange((value) => {
    material.roughnessMap = value ? roughnessMap : null;
    material.needsUpdate = true;
  });

gui
  .add(settings, "roughnessValue", 0, 1, 0.01)
  .name("Roughness")
  .onChange((value) => {
    material.roughness = value;
  });

// Animte
function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}

animate();
