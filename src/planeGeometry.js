// floors and walls to floating UI panels and even complex landscapes.
// completely flat shape with width and height but no depth

import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
// import GUI from "lil-gui";
// const canvas = document.querySelector("canvas.world");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// const light = new THREE.DirectionalLight(0x000000, 1);
// light.position.set(2, 3, 4);
// scene.add(light);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// 5 units wide and 3 units tall but divided into 4 segments along the width and 2 segments along the height.
// These segments are useful when you want to bend, animate, or modify the plane in creative ways. Think of it like a piece of cloth—if it’s divided into many sections, it becomes more flexible.
// useful for creating effects like waving flags, terrain deformation, or smooth lighting transitions.
const plane = new THREE.PlaneGeometry(5, 3, 4, 2);
const wireframeMaterial = new THREE.MeshBasicMaterial({ color: "lime", wireframe: true });
const planeMesh = new THREE.Mesh(plane, wireframeMaterial);
scene.add(planeMesh);

// This is important when setting up floors, ceilings, walls, and other flat surfaces in a 3D world.
planeMesh.rotation.x = Math.PI / 2; // Rotates the plane to lie flat on the ground
planeMesh.position.y = -2; // lower it as a floor

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// One thing to remember is that PlaneGeometry is created facing forward by default. In Three.js , that means it lies flat along the X-Y plane but faces the positive Z-axis.
