// RectAreaLight — a special type of light that mimics the soft, diffused glow of rectangular light sources, like fluorescent ceiling lights, LED panels, or even the light coming through a window.

// Imagine you’re in a modern office with sleek, rectangular lights on the ceiling. The light spreads evenly, creating a soft and natural illumination.

// RectAreaLight spreads light evenly across a defined area. This makes it perfect for simulating real-world light fixtures like ceiling lights, TV screens, or even windows.

// Think of a large, rectangular LED panel on the ceiling of a photography studio. The light it emits is soft, even, and doesn’t create harsh shadows.

import "./style.css";
// Import the necessary Three.js modules
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib";

RectAreaLightUniformsLib.init();

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 10);
scene.add(camera);

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);

// Add OrbitControls to the camera
const controls = new OrbitControls(camera, renderer.domElement);

// Ambient Light
scene.add(new THREE.AmbientLight(0xffffff, 0.3));

// Material
const material = new THREE.MeshPhysicalMaterial({
  color: "#ffffff",
  roughness: 0.2,
  metalness: 0.5,
});

// Geometry
const sphere1 = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), material);
sphere1.position.x = -3;

const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), material);
sphere2.position.x = 3;

const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.2, 0.4, 100, 16), material);

scene.add(sphere1, sphere2, knot);

// Plane (floor)
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 30),
  new THREE.MeshStandardMaterial({ color: "#888", roughness: 0.3 })
);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -2;
scene.add(plane);

const rectLight1 = new THREE.RectAreaLight("#37ff00", 20, 4, 10);
rectLight1.position.set(-5, 2, -5);
rectLight1.rotation.y = Math.PI;
scene.add(rectLight1, new RectAreaLightHelper(rectLight1));

const rectLight2 = new THREE.RectAreaLight("#ff0000", 20, 4, 10);
rectLight2.position.set(0, 2, -5);
rectLight2.rotation.y = Math.PI;
scene.add(rectLight2, new RectAreaLightHelper(rectLight2));

const rectLight3 = new THREE.RectAreaLight("#0008ff", 20, 4, 10);
rectLight3.position.set(5, 2, -5);
rectLight3.rotation.y = Math.PI;
scene.add(rectLight3, new RectAreaLightHelper(rectLight3));

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  knot.rotation.y += 0.005;
  controls.update(); // Update the controls
  // Render the scene
  renderer.render(scene, camera);
}

// Start the animation loop
animate();

// MeshStandardMaterial:
// color
// metalness
// roughness
// map, normalMap, roughnessMap, metalnessMap, etc.

// MeshPhysicalMaterial:
// Extends MeshStandardMaterial → everything in Standard also applies here.

// Adds extra physical realism controls:

// clearcoat & clearcoatRoughness → simulates extra reflective layers (like car paint, varnish).

// transmission → glass-like transparency with realistic refraction.

// ior (index of refraction) → controls how light bends through transparent material.

// thickness → simulates volume for transparent materials (e.g., frosted glass, liquid).

// sheen & sheenRoughness → fabric-like reflections (like velvet).

// iridescence → soap bubbles, oil slick effects.

// attenuationColor & attenuationDistance → how light colors fade through a material (good for liquids).

// Heavier on performance since it calculates more advanced lighting and transparency.

// Best for photorealism, product renders, or scenes where physical accuracy matters (like glass, water, polished surfaces).

// RectAreaLightHelper: This draws a visual plane representing the light’s position, direction, and bounds.

// Note: Helpers may glitch (z-fighting) if the light is too thin or overlapping other surfaces — this is expected.