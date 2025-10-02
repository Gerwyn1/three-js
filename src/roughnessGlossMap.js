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

const backLight = new THREE.DirectionalLight(0xffffff, 2);
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
const roughnessMap = textureLoader.load("/src/Bricks031_1K-PNG_Roughness.png");

// Material
const material = new THREE.MeshStandardMaterial({
  map: colorMap,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// GUI
const gui = new GUI();
const settings = {
  showColorMap: true,
  showNormalMap: true,
  useRoughnessMap: true,
  roughness: 0.5,
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
  .add(settings, "roughness", 0, 1, 0.01)
  .name("Roughness")
  .onChange((value) => {
    material.roughness = value;
    material.needsUpdate = true;
  });

// Animate
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// A Roughness Map is a black-and-white image that tells your 3D object how to react to light.

// Here’s how it works:

// White areas: Rough → light scatters → matte surface (like chalk)
// Black areas: Smooth → light reflects → shiny surface (like a spoon)
// Gray areas: In-between → subtle glossiness

// Let’s say you’re making a 3D model of a wooden table. The table has scratches, dents, and polished areas. Modeling every detail would be slow and heavy on performance.

// Instead, use a roughness map to paint those surface differences. This way, you get high realism without increasing geometry complexity.

// Rusty Metal Barrel: Use roughness to show rust and polished areas.
// Wooden Table: Add scratches, dents, and polish detail with one texture.
// Dirty Glass Window: Simulate smudges or fingerprints by roughing up the surface.

// Roughness maps are powerful and beginner-friendly. They let you:

// ✅ Create realism easily
// ✅ Save time and boost performance
// ✅ Instantly see results with sliders and lighting

// Diffuse roughness controls how light scatters off a rough surface, enhancing the visual accuracy of matte materials like concrete, dust, or rough fabric by scattering light more broadly and reducing the appearance of sharp highlights or curvature. Unlike specular roughness, which controls glossy reflections, diffuse roughness focuses on the light interaction with microscopic surface imperfections, often using models like Oren-Nayar to simulate more realistic matte appearances.

// roughness:
// It controls how light behaves on the surface:
// roughness: 0 → Surface is perfectly smooth and highly reflective (like a mirror or polished metal).
// roughness: 1 → Surface is completely rough and scatters light in all directions (like chalk or sandpaper).
// roughness: 0.5 → A semi-matte look. Some reflection, but not sharp. Think plastic or brushed metal.
