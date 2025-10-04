import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.world");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 🟣 GSAP Timeline
const tl = gsap.timeline({ defaults: { duration: 1, ease: "power1.inOut" } });

tl.to(mesh.position, { x: 2 }) // 1st animation
  .to(mesh.scale, { x: 2, y: 2, z: 2 }) // 2nd animation
  .to(mesh.rotation, { y: Math.PI }); // 3rd animation

// Animate
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
