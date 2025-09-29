import "./style.css";
import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
scene.background = new THREE.Color("#000000");

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

let geometry = new THREE.BoxGeometry();
let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const gui = new GUI();
const dropdownFolder = gui.addFolder("Dropdown Controls");

// dropdown options
const shapeOptions = {
  Cube: "cube",
  Sphere: "sphere",
  Cylinder: "cylinder",
};
const materialOptions = {
  Basic: "basic",
  Lambert: "lambert",
  Phong: "phong",
};
const animationOptions = {
  None: "none",
  Rotate: "rotate",
  Bounce: "bounce",
};
// Store the Selected Shape/Material (default value)
const settings = { shape: "cube", material: "basic" };

dropdownFolder.add(settings, "shape", shapeOptions).onChange((value) => {
  if (cube) {
    cube.geometry.dispose(); // free old geometry GPU buffers
    // Why not material.dispose() in your code?
    // In your snippet, you’re reusing the same material across all shapes:
    // If you call material.dispose(), you would destroy the GPU program and textures behind it, and the next mesh wouldn’t have a valid material anymore (you’d get warnings or errors).
    scene.remove(cube);
  }
  let geometry;
  if (value === "cube") geometry = new THREE.BoxGeometry();
  if (value === "sphere") geometry = new THREE.SphereGeometry(0.7, 32, 32);
  if (value === "cylinder") geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
});

dropdownFolder.add(settings, "material", materialOptions).onChange((value) => {
  let newMaterial;
  if (value === "basic") newMaterial = new THREE.MeshBasicMaterial({ color: cube.material.color });
  if (value === "lambert") newMaterial = new THREE.MeshLambertMaterial({ color: cube.material.color });
  if (value === "phong") newMaterial = new THREE.MeshPhongMaterial({ color: cube.material.color });

  cube.material = newMaterial;
});

const animationSettings = { animation: "none" };
dropdownFolder.add(animationSettings, "animation", animationOptions);

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  if (animationSettings.animation === "rotate") {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }

  if (animationSettings.animation === "bounce") {
    cube.position.y = Math.sin(Date.now() * 0.002) * 2;
  }

  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


// In the next lesson, we’ll explore Buttons in lil-gui, allowing users to trigger actions like resetting values or generating random colors! 🔘🚀