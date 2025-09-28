// Most built-in geometries in Three.js (like PlaneGeometry or BoxGeometry ) are made up of vertices (points in space) and faces (triangles that connect those points).

// A Custom Geometry lets us define these elements ourselves,

// In Three.js , a vertex is represented as a Vector3—a point with (x, y, z) coordinates.

// In Three.js , we use BufferGeometry to define custom shapes. This class allows us to store vertex data efficiently.

import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const vertices = [
  new THREE.Vector3(0, 1, 0), // Top vertex
  new THREE.Vector3(-1, -1, 0), // Bottom left vertex
  new THREE.Vector3(1, -1, 0), // Bottom right vertex
];
// Convert our Vector3 points into a format that Three.js can understand—a simple array of numbers:
const verticesArray = new Float32Array([
  0,
  1,
  0, // Top vertex
  -1,
  -1,
  0, // Bottom left vertex
  1,
  -1,
  0, // Bottom right vertex
]);
const indices = [0, 1, 2];

const geometry = new THREE.BufferGeometry();
const material = new THREE.MeshBasicMaterial({ color: "lime" });
const triangle = new THREE.Mesh(geometry, material);

// We then attach this data (verticesArray) to our BufferGeometry using a position attribute:
// Now, our triangle exists as a set of points in 3D space! 🎉
geometry.setAttribute("position", new THREE.BufferAttribute(verticesArray, 3));

geometry.setIndex(new THREE.BufferAttribute(indices, 1));

scene.add(triangle);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.projectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
