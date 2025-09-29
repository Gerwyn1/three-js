import "./style.css";
import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// organize multiple GUI controls into collapsible sections, making the interface cleaner and easier to navigate.
// Group related controls together in folders.
// Keep the GUI organized and clutter-free.
// Use nested folders for better UI structure.

const scene = new THREE.Scene();
scene.background = new THREE.Color("#000000");

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Organized lil-gui Panel

const gui = new GUI();
const settings = {
  size: 1,
  posX: 0,
  posY: 0,
  posZ: 0,
  rotX: 0,
  rotY: 0,
  rotZ: 0,
};
const toggleSettings = { visible: true, wireframe: false };
const colorSettings = { objectColor: cube.material.color, backgroundColor: scene.background };

// Nested Folders (onChange is left out for presentation purposes)
// 📂 Transform → Position sliders.
// 📂 Appearance → Color picker & wireframe toggle.

const mainFolder = gui.addFolder("Main Settings");

const transformFolder = mainFolder.addFolder("Transform");
transformFolder.add(settings, "posX", -5, 5, 0.1);
transformFolder.add(settings, "posY", -5, 5, 0.1);
transformFolder.add(settings, "posZ", -5, 5, 0.1);

const appearanceFolder = mainFolder.addFolder("Appearance");
appearanceFolder.addColor(colorSettings, "objectColor");
appearanceFolder.add(toggleSettings, "wireframe");

// Size Folder
const sizeFolder = gui.addFolder("Size Controls");
sizeFolder.add(settings, "size", 0.1, 5, 0.1).onChange((value) => cube.scale.set(value, value, value));

// Position Folder
const positionFolder = gui.addFolder("Position Controls");
positionFolder.add(settings, "posX", -5, 5, 0.1).onChange((value) => (cube.position.x = value));
positionFolder.add(settings, "posY", -5, 5, 0.1).onChange((value) => (cube.position.y = value));
positionFolder.add(settings, "posZ", -5, 5, 0.1).onChange((value) => (cube.position.z = value));

// Rotation Folder
const rotationFolder = gui.addFolder("Rotation Controls");
rotationFolder.add(settings, "rotX", -Math.PI, Math.PI, 0.01).onChange((value) => (cube.rotation.x = value));
rotationFolder.add(settings, "rotY", -Math.PI, Math.PI, 0.01).onChange((value) => (cube.rotation.y = value));
rotationFolder.add(settings, "rotZ", -Math.PI, Math.PI, 0.01).onChange((value) => (cube.rotation.z = value));

// Toggle Folder
const toggleFolder = gui.addFolder("Toggle Controls");
toggleFolder.add(toggleSettings, "visible").onChange((value) => (cube.visible = value));
toggleFolder.add(toggleSettings, "wireframe").onChange((value) => (cube.material.wireframe = value));

// Color Folder
const colorFolder = gui.addFolder("Color Controls");
colorFolder.addColor(colorSettings, "objectColor").onChange((value) => cube.material.color.set(value));
colorFolder.addColor(colorSettings, "backgroundColor").onChange((value) => (scene.background = new THREE.Color(value)));

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Why Use Folders?
// ✅ Organizes controls neatly in sections.
// ✅ Improves readability when working with multiple parameters.
// ✅ Collapsible UI makes it easier to navigate settings.
// ✅ Allows nesting, creating hierarchical controls.

// Recap: Using Folders in lil-gui
// Folders (gui.addFolder()) keep the GUI organized.
// You can group related settings like transformations, colors, and toggles.
// Nested folders allow hierarchical control structures.
