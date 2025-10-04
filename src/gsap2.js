import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.world");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
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

// 🟢 GSAP Animation: Spin and Scale at the same time
gsap.to(mesh.rotation, {
  y: Math.PI * 2, // One full spin
  repeat: -1, // repeat infinitely
  yoyo: true, // this is a yoyo effect
  duration: 2,
  ease: "power1.inOut",
});

gsap.to(mesh.scale, {
  x: 2,
  y: 2,
  z: 2,
  repeat: -1,
  yoyo: true,
  duration: 2,
  ease: "elastic.out(1, 0.3)", // Bouncy pop effect
});

// Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// In GSAP, elastic.out(1, 0.3) is a type of easing function.

// Elastic eases mimic a spring or rubber band effect: overshooting and bouncing back before settling.
// The parameters control the amplitude (strength of the overshoot) and period (speed of oscillation).

// Breakdown:
// elastic.out(amplitude, period)

// amplitude (1 in your case)

// Controls how far it overshoots past the end value.

// 1 is the "natural" bounce.

// Higher values (>1) = stronger overshoot and more dramatic recoil.

// Lower values (<1) = weaker overshoot.

// period (0.3 in your case)

// Controls the frequency (speed) of the oscillations.

// Smaller values = faster, tighter bounces.

// Larger values = slower, looser oscillations.
