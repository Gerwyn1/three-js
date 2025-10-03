// Every 3D model is made up of meshes and materials:
// 💡 Use .traverse() to loop through all children in the model and apply the change to each mesh.
// scene → children → mesh → material → color

import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// Canvas
const canvas = document.querySelector("canvas.world");
// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);

// Add OrbitControls to the camera
const controls = new OrbitControls(camera, renderer.domElement);

// Load .glb model
const loader = new GLTFLoader();
loader.load(
  "/src/low-poly_cartoon_style_car_01.glb",
  (gltf) => {
    const car = gltf.scene;
    car.scale.setScalar(1);
    car.rotation.y = Math.PI / 2;
    car.position.y = -1;
    scene.add(car);
    car.traverse((child) => {
      if (child.isMesh) {
        // child.material.color.set("#d62828"); // change to deep red

        // You can even swap the material entirely if you want a different look:
        child.material = new THREE.MeshStandardMaterial({
          color: "#00b4d8",
          metalness: 0.3,
          roughness: 0.5,
        });
      }
    });
  },
  undefined,
  (error) => {
    console.error("Error loading GLB:", error);
  }
);

// Lights
const light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(5, 5, 5);
scene.add(light);

// 1. Key Light – strong light from the side
const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
keyLight.position.set(5, 5, 5);
scene.add(keyLight);

// 2. Fill Light – softer light from the opposite side
const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
fillLight.position.set(-5, 2, 5);
scene.add(fillLight);

// 3. Back Light – gives the model an outline glow
const backLight = new THREE.DirectionalLight(0xffffff, 1);
backLight.position.set(0, 5, -5);
scene.add(backLight);

// Optional ambient light to slightly fill everything
const ambient = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambient);

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Update the controls
  renderer.render(scene, camera);
}
animate();

// To sum it up
// Use scale, rotation, and position to transform the model

// Use traverse() to access meshes inside your model

// Use material.color.set() to change its color
