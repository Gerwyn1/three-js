import "./style.css";
import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Scene Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color("#1e1e1e");

// Camera
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(3, 0, 6);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Light
const dirLight = new THREE.DirectionalLight(0xffffff, 5);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

// === Material ===
const toonMaterial = new THREE.MeshToonMaterial({
  color: 0xff3399,
});

// Object
const torus = new THREE.Mesh(new THREE.TorusKnotGeometry(1, 0.4, 100, 16), toonMaterial);
scene.add(torus);

// Ground
const ground = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), new THREE.MeshToonMaterial({ color: "#111111" }));
ground.rotation.x = -Math.PI / 2;
ground.position.y = -2.5;
scene.add(ground);

// === GUI ===
const gui = new GUI();
const config = {
  color: "#ff3399",
  lightColor: "#ffffff",
  lightIntensity: 5,
};

gui
  .addColor(config, "color")
  .name("Object Color")
  .onChange((val) => {
    toonMaterial.color.set(val);
  });

gui
  .addColor(config, "lightColor")
  .name("Light Color")
  .onChange((val) => {
    dirLight.color.set(val);
  });

gui.add(config, "lightIntensity", 0, 10, 0.01).onChange((val) => {
  dirLight.intensity = val;
});

// Animate
function animate() {
  requestAnimationFrame(animate);
  torus.rotation.y += 0.01;
  torus.rotation.x += 0.005;
  controls.update();
  renderer.render(scene, camera);
}
animate();

// cartoonish, cel-shaded effects that make your 3D objects look like they’ve stepped out of an animated movie

// MeshToonMaterial is a material that simulates a cartoon or cel-shaded look. Unlike realistic materials that use smooth gradients and subtle lighting, MeshToonMaterial uses step lighting—sharp transitions between light and dark areas—to create a stylized, hand-drawn appearance.

// Think of it like this: MeshToonMaterial is a comic book illustration. It’s perfect for creating playful, artistic, or non-realistic visuals.

// Stylized Look: Perfect for creating cartoonish or cel-shaded visuals.
// Light Responsive: Reacts to lights in the scene, but with a simplified shading model.
// Customizable: Offers properties like color, gradientMap, and toneMapped for fine-tuning.

// cartoon-style game, an animated scene, or just having fun with artistic effects
// lightweight, easy to use
