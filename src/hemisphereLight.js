import GUI from "lil-gui";
import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const gui = new GUI();
const settings = { skyColor: "#00d5ff", groundColor: "#ff00ea", intensity: 2, showHelper: true };
gui.addColor(settings, "skyColor").onChange((value) => hemisphereLight.color.set(value));
gui.addColor(settings, "groundColor").onChange((value) => hemisphereLight.groundColor.set(value));
gui.add(settings, "intensity", -5, 10, 0.1).onChange((value) => (hemisphereLight.intensity = value));
gui.add(settings, "showHelper").onChange((value) => (hemisphereLightHelper.visible = value));

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 2, 6);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Hemisphere Light
const hemisphereLight = new THREE.HemisphereLight(0x00d5ff, 0xff00ea, 2);
// Sky color (light blue), ground color (pink), intensity = 2
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 2);
scene.add(hemisphereLight, hemisphereLightHelper);

// Ambient Light (soft fill)
const ambient = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambient);

// Material
const material = new THREE.MeshStandardMaterial({
  color: "#ffffff",
  roughness: 0.4,
  metalness: 0.3,
});

// Geometries
const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), material);
sphere.position.x = -2;

const cube = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, 1.5), material);
cube.position.x = 2;

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 30),
  new THREE.MeshStandardMaterial({ color: "#999", roughness: 0.8 })
);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1;

scene.add(sphere, cube, plane);

// Animate
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.y += 0.005;
  sphere.rotation.y -= 0.005;
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Real-Life Applications of HemisphereLight
// Let’s connect this to real-world scenarios:

// Outdoor Scenes: Use HemisphereLight to simulate the natural lighting of a sunny day, a cloudy sky, or a sunset.
// Indoor Scenes: Add a soft ambient glow to rooms with large windows or open spaces.
// Fantasy Worlds: Create magical environments with unusual sky and ground colors, like a glowing purple sky and a shimmering gold ground.
// Conclusion
// Congratulations! You’ve just unlocked the power of HemisphereLight in Three.js . By mastering this tool, you can create natural, immersive lighting that brings your 3D scenes to life. Whether you’re crafting a serene landscape, a cozy room, or a fantastical world, HemisphereLight is your go-to for achieving a balanced and harmonious glow.
