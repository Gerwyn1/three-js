import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 🧩 Register the plugin
gsap.registerPlugin(ScrollTrigger);

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

// 🌀 SCROLL ANIMATION
gsap.to(mesh.rotation, {
  y: Math.PI * 2,
  scrollTrigger: {
    trigger: ".scroll-area",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    markers: true,
  },
});

// Animate
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// ScrollTrigger is watching the element .scroll-area. As you scroll through it, the cube’s rotation goes from 0 to Math.PI* 2 (a full spin). It’s not timed — it’s linked to scroll progress. That’s what scrub: true does — it makes the animation follow your scroll like a puppet string.