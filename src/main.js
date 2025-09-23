import "./style.css";
import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.world");
// Create a scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("pink");

// Create a camera | PerspectiveCamera -> Field of view, aspect ratio, near and far clipping planes.
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a geometry
const geometry = new THREE.BoxGeometry(); // creates a box geometry object, which defines the shape of our 3D object (a cube in this case)
// later on, we can learn more geometry types like SphereGeometry, PlaneGeometry, etc.
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // creates a basic material object that defines how the cube will look. Here, we set the color to red using a hexadecimal color code (0xff0000), "string" is also available
const cube = new THREE.Mesh(geometry, material); // creates a mesh object, which combines the geometry (shape) and material (appearance) to create the visible 3D object (the cube)
scene.add(cube);

renderer.render(scene, camera);

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  // Rotate the cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();
