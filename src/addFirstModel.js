// You’ve learned how to create 3D shapes from scratch with geometry.
// But what if you want to use a full 3D model created in Blender or downloaded from Sketchfab?
// That’s where GLTFLoader comes in — your portal to importing 3D models into the scene.

// GLTF (.gltf or .glb) is the modern standard 3D file format designed for the web.
// It supports:
// Geometry
// Materials
// Animations
// Cameras and lights

// There are two types:
// .gltf: JSON-based, readable, easy to edit.
// .glb: Binary-packed version, compact, faster loading.
// Think of .glb as the JPG for 3D—fast, compact, and widely supported.

// 💡 Fun Fact: glTF supports geometry, PBR materials, textures, animations, skinning, and morph targets—everything needed for realistic models!

// glTF supports geometry, PBR materials, textures, animations, skinning, and morph targets—everything needed for realistic models!

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

// 💡 Tip: loadAsync Version
// Want to use await? You can also load the model like this:

// const car = await loader.loadAsync("/src/models/car.glb");
// scene.add(car.scene)

// Each GLTF object you import includes:

// scene: Your visible 3D object.
// animations: Built-in animations ready to play.
// materials & textures: Pre-made to enhance realism.

// Adjust lights and camera angles to see your model in the best possible way.

// Good lighting = model comes alive.
// Camera placement = highlights key details.
