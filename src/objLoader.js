import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

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

// Lighting
scene.add(new THREE.AmbientLight(0xffffff, 2));

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Load Textures
const textureLoader = new THREE.TextureLoader();
const chairMap = textureLoader.load("/src/Obj/Chair_Base_color.png");
const pillow1Map = textureLoader.load("/src/Obj/Pillow_01_Base_Color.jpg");
const pillow2Map = textureLoader.load("/src/Obj/Pillow_02_Base_Color.jpg");

const chairMaterial = new THREE.MeshStandardMaterial({ map: chairMap });
const pillowMaterial1 = new THREE.MeshStandardMaterial({ map: pillow1Map });
const pillowMaterial2 = new THREE.MeshStandardMaterial({ map: pillow2Map });

// 3D model
const loader = new OBJLoader();
// The .mtl file format is MTL file, short for Material Template Library, is companion file format used in 3D computer graphics and modeling. It is often associated with Wavefront OBJ file format, which is common format for storing 3D models and their associated materials and textures.
// if you want to learn more about the .mtl file format - https://people.computing.clemson.edu/~dhouse/courses/405/docs/brief-mtl-file-format.html#:~:text=Material%20Library%20File%20(.mtl),mtl%20extension.
const mtlLoader = new MTLLoader(); // Three.js MTLLoader is used to load the material file (.mtl) that is associated with the .obj file.
// doc - https://threejs.org/docs/index.html?q=loader#examples/en/loaders/MTLLoader
mtlLoader.load("/src/Obj/Chair.mtl", (materials) => {
  materials.preload();
  const objLoader = new OBJLoader();
  // Sets materials loaded by MTLLoader
  objLoader.setMaterials(materials); // https://threejs.org/docs/index.html?q=loader#examples/en/loaders/OBJLoader.setMaterials
  objLoader.load("/src/Obj/Chair.obj", (object) => {
    // load the object as GLTFLoder
    scene.add(object);
    object.scale.setScalar(3);
    object.position.y = -2;
    // here we will traverse through the object and apply the material , ofc we can add many textures from the textures folder such as normal map, roughness map, etc
    // but for now , I'll only apply the base color map
    object.traverse((child) => {
      console.log(child);
      // traverse through the object
      if (child.isMesh) {
        if (child.material.name === "Chair") child.material = chairMaterial;
        if (child.material.name === "Pillow_01") child.material = pillowMaterial1;
        if (child.material.name === "Pillow_02") child.material = pillowMaterial2;
      }
    });
  });
});
console.log(loader); // check the loader object

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Update the controls
  renderer.render(scene, camera);
}
animate();

// modern 3d formats: gltf or glb
// models from legacy/older software: obj

// .obj is one of the oldest and most widely-used 3D model formats.

// 📦 Developed by Wavefront Technologies in the 1980s
// 🧱 Purely geometry-based — no lighting, animation, or compression
// 🧰 Supported by nearly all 3D software (Blender, Maya, 3ds Max, ZBrush...)
// It describes vertices, faces, and sometimes UVs — super portable and simple.

// 🔍 What is an .obj File?
// .obj is one of the oldest and most widely-used 3D model formats.

// 📦 Developed by Wavefront Technologies in the 1980s
// 🧱 Purely geometry-based — no lighting, animation, or compression
// 🧰 Supported by nearly all 3D software (Blender, Maya, 3ds Max, ZBrush...)
// It describes vertices, faces, and sometimes UVs — super portable and simple.

// 🌐 Why Learn .obj in 2024?
// Because you’ll still run into it — especially in archives or from artists using older tools. Common sources:

// 🌀 Free3D
// 🎨 CGTrader
// 🛸 TurboSquid
// 🎮 OpenGameArt

// Understanding .obj loading makes you flexible — you can convert, clean up, or reuse legacy assets in modern pipelines.

// 🎨 Do .obj Files Have Materials?
// Not built-in, but they usually come with a .mtl file:

// 🧪 .mtl = Material Template Library
// 🎨 Defines colors, reflectivity, and texture references
// 📁 References texture files like .jpg or .png
// So to load them properly, you typically need:

// model.obj
// model.mtl
// Textures folder

// Three.js gives us special tools:
// OBJLoader – for the geometry
// MTLLoader – for the materials

// 📝 Summary
// .obj = lightweight, text-based 3D format
// Usually pairs with .mtl for materials
// Still used today in free libraries and old projects
// Use OBJLoader + MTLLoader for full loading support

// In the next lesson, you’ll load a real .obj + .mtl model, fix broken parts, and give it a modern shine using Three.js lighting 🎯

// MTLLoader loads the materials (colors, textures)

// OBJLoader loads the geometry and applies the materials

// We set the path once to keep things clean and avoid broken URLs
// We add lights because .obj models don’t include lighting info

// 💡 What If .mtl is Missing?
// If the .mtl is broken or missing textures, you can still apply materials manually:

// child.material = new THREE.MeshStandardMaterial({
//   color: '#ff6b6b',
//   metalness: 0.2,
//   roughness: 0.8,
// });

// 🧪 Summary
// Use MTLLoader first to preload materials

// Use OBJLoader and assign materials

// Use TextureLoader to load maps manually

// Use traverse() to assign custom materials per mesh

// We’ve now mastered .obj and .mtl — but what about animation-heavy models from tools like Maya or older AAA game pipelines?

// Next, we’ll dive into loading FBX models using FBXLoader — and explore how to handle complex rigs and baked animations with ease. 🎮📦
