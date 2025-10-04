import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

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

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 2));

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

const textureLoader = new THREE.TextureLoader();
const bodyMap = textureLoader.load("/src/FBX_Loader/wooden mug_low_low_BaseColor.png");

const bodyMaterial = new THREE.MeshStandardMaterial({
  map: bodyMap,
});

const fbxLoader = new FBXLoader();

fbxLoader.load("/src/FBX_Loader/wood_cup.fbx", (fbx) => {
  scene.add(fbx);

  fbx.scale.setScalar(0.03);
  fbx.position.y = -2;
  fbx.rotation.y = Math.PI / 2;

  fbx.traverse((child) => {
    if (child.isMesh) {
      child.material = bodyMaterial;
    }
  });
});

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Update the controls
  renderer.render(scene, camera);
}
animate();

// 🔍 What is an .fbx File?
// .fbx stands for Filmbox, originally developed in the 90s and now owned by Autodesk.

// 📦 Binary 3D format — smaller & faster than .obj
// 🎬 Supports skeletons, animations, cameras, lights...
// 🎮 Popular in games, film, mocap, and VR/AR tools
// It’s a pro-level format that’s widely used for animated characters and assets.

// 🌐 Why Learn .fbx?
// Because you’ll often encounter it — especially in high-quality or animation-heavy projects:

// 🕹️ Game asset marketplaces
// 🎭 Motion capture datasets
// 👩‍🎨 Animation bundles
// 🧠 Tools like Maya, MotionBuilder, Unity, Unreal

// .fbx is one of the few formats that supports both skinning and baked animations in a single file.

// ⚠️ Drawbacks of .fbx
// While it’s powerful, there are some downsides:

// 🛑 Proprietary — owned by Autodesk, not fully open spec
// 📦 Not web-optimized like .glb
// 📁 Files can get big and complicated
// Still, it’s worth learning — especially if you’re working with animation-heavy pipelines.

// 🚀 How to Load .fbx in Three.js
// Three.js gives us FBXLoader:

// Located at three/examples/jsm/loaders/FBXLoader.js

// Can load both mesh and animation in one go

// Works great with animated characters or robots 🤖

// With just a few lines of code, you can import animated rigs and trigger their motion on load.

// 📝 Summary
// .fbx = binary, animation-friendly 3D format
// Common in game, film, mocap, and pro 3D tools
// Load using FBXLoader from Three.js examples
// Supports geometry + animation in one file

// In the next lesson, we’ll load a dancing character from an .fbx file — and trigger its animations inside your Three.js scene 💃🕺

// 🎓 Summary
// Use FBXLoader to load .fbx files into your scene
// Apply custom materials using traverse() over mesh children
// Don't forget lights — FBX models often use MeshStandardMaterial
// Use TextureLoader for base color maps and other textures

// 🎉 You Did It — Model Mastery Unlocked!
// You’ve just completed the entire Model Module — from modern .glb files to classic .obj, all the way to animation-ready .fbx.

// In this journey, you’ve learned to:

// Load different 3D file formats
// Apply textures and custom materials
// Fix broken imports and missing assets
// Use traversal to control individual mesh parts
// You now have the skills to import, customize, and bring almost any 3D model into your Three.js scene.

// Whether you’re building a game, configurator, or 3D portfolio — you’re no longer limited by format or source. You speak the universal language of 3D models.

// 🧭 What’s Next?
// You’ve learned how to bring stunning 3D models into your scene — now it’s time to make them move.

// In the next module, we’ll explore the magic of Animations — starting with smooth, real-time transitions using GSAP. We’ll combine it with your 3D objects to animate positions, rotations, camera moves, and even scene transitions — all with cinematic ease. 🎥✨

// Let’s bring your world to life. See you in the Animations Module 🚀
