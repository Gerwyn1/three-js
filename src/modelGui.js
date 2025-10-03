import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import GUI from "lil-gui";

const gui = new GUI();
const config = {
  color: 0xff0000,
};

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
loader.load("/src/low-poly_cartoon_style_car_01.glb", (gltf) => {
  const car = gltf.scene;
  car.rotation.y = Math.PI / 2;
  car.position.y = -1;
  scene.add(car);

  car.traverse((child) => {
    if (child.isMesh) {
      console.log(child);
      const material = child.material;
      gui
        .addColor(config, "color")
        .name(child.name)
        .onChange((value) => {
          material.color.set(value); // here we can change the color of every mesh in the model
        });
      if (child.name === "Object_8") {
        material.color = new THREE.Color("#bb00ff"); // you can also change only one mesh
      }
    }
  });
});

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

// 🎨 Now You Can…
// Change the color of each mesh in real-time

// Toggle visibility of different parts
// See mesh names and explore model structure
// This is especially helpful for product visualizers, configurators, or just getting to know how a model is built.

// 👉 If you want true shared state (all meshes change when config.color changes), you need only one controller and in its callback traverse the whole model:

// const controller = gui.addColor(config, "color").name("All Meshes Color");

// controller.onChange((value) => {
//   gltf.scene.traverse((child) => {
//     if (child.isMesh) {
//       child.material.color.set(value);
//     }
//   });
// });

// 🧭 What’s Next?
// Our model includes built-in animations — like moving parts, wheels spinning, or characters walking. Next, we’ll learn how to play, pause, and control these animations inside Three.js using the AnimationMixer. 🎬🕺
