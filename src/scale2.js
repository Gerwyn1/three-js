import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 8;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry();
const cube1 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: "lime" }));
const cube2 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: "red" }));
scene.add(cube1, cube2);
cube1.position.set(-1.5, 0, 0);
cube1.rotation.y = -0.1;
cube1.scale.set(2, 2, 2);
cube2.rotation.set(0, 0.1, 0);
cube2.scale.set(2, 0.5, 1);
cube2.position.set(1.125, 0, 0);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  const scaleFactor = 1 + Math.sin(Date.now() * 0.002) * 0.5; // Oscillates between 0.5 and 1.5
  cube2.scale.set(scaleFactor * 2, scaleFactor * 0.5, scaleFactor * 1); // scale.set(1-3, 0.25 - 0.75, 0.5-1.5)
  renderer.render(scene, camera);
}
animate();

// Multiplying by 0.5 scales the sine wave: Instead of going from -1 → 1, it now goes from -0.5 → 0.5.

// Adding 1 shifts the whole range up. (increase the upper bound or limit of the oscillation range)
// So instead of -0.5 → 0.5, it becomes: 0.5 → 1.5