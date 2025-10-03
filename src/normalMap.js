import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";

// Canvas
const canvas = document.querySelector("canvas.world");
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Lights
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(3, 5, 2);
scene.add(directionalLight);

const backLight = new THREE.DirectionalLight(0xffffff, 1);
backLight.position.set(-3, -5, -2);
scene.add(backLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Geometry
const geometry = new THREE.SphereGeometry(2, 64, 64);

// Textures
const textureLoader = new THREE.TextureLoader();
const colorMap = textureLoader.load("/src/Bricks031_1K-PNG_Color.png");
const normalMap = textureLoader.load("/src/Bricks031_1K-PNG_NormalGL.png");

// Material
const material = new THREE.MeshStandardMaterial({
  map: colorMap,
  normalMap: normalMap,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// GUI
const gui = new GUI();
const settings = {
  showColorMap: true,
  showNormalMap: true,
  normalScaleX: 1,
  normalScaleY: 1,
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
  .add(settings, "normalScaleX", 0, 2, 0.01)
  .name("Normal Scale X")
  .onChange((value) => {
    material.normalScale.x = value;
  });

gui
  .add(settings, "normalScaleY", 0, 2, 0.01)
  .name("Normal Scale Y")
  .onChange((value) => {
    material.normalScale.y = value;
  });

// Animate
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// We’re using a sphere with high segments to better see the lighting changes caused by the normal map.

// add intricate surface details to your 3D models — all without increasing geometry complexity.

// make our 3D model look this detailed without modeling every groove

// A normal map is like a magic trick for 3D models. It’s a special texture that tricks the light into thinking a surface has bumps and grooves, even though the surface is actually flat.

// Normal maps use colors — RGB values tell light which direction to bounce.
// They add fake detail — so you don’t have to model every scratch or crack.

// Normal maps store surface information in RGB values:
// Red (R) → X-axis (left/right)
// Green (G) → Y-axis (up/down)
// Blue (B) → Z-axis (depth)

// These color directions affect how light reflects off the surface.

// Displacement Map - modify geometry but normal maps are purely visual

// There are two types of normal maps:

// Tangent Space — most common; rotates with the surface; great for animated models
// Object Space — used for static objects; doesn’t deform with animation

// 🛠️ Practical Use Cases
// Adding fine detail: wrinkles, bumps, cloth patterns
// Optimizing performance by avoiding dense geometry
// Enhancing realism in combination with other maps (roughness, AO, metalness)

// ✅ Conclusion: Your First Step into Realism
// Normal maps let you create stunning surface detail without heavy geometry. They’re a must-have tool for any 3D artist or developer working with PBR workflows.

// Whether it's a bumpy brick wall or the smooth curve of a sci-fi helmet, normal maps help you shape how light interacts with your objects — without the performance cost.
