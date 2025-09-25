import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// const scene = new THREE.Scene();
// scene.background = new THREE.Color("black");

// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 5;

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: "lime" });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// cube.position.set(0, 0, 0);
// cube.position.x = 1.25; // Moves cube along global x-axis
// cube.rotation.set(Math.PI / 7, Math.PI / 7, Math.PI / 3);
// cube.scale.set(1.5, 1.25, 1.25);

// global system/world space -> if a cube is placed 5 units to the right of the origin (5,0,0). it will always stay there no matter how its parent's objects are transformed.
// local space, which is the coordinate system relative to an object's parent
// if an object is part of a group/hierarchy, its position, rotation & scale are defined relative to its parent.
// if you rotate a parent object, all of its children will rotate with it and their local coordinates will remain the same.
// everything on a website has a hierarchy and elements placed next to each other (local space)
// applying position absolute to an element allows you to move it across the entire page without affecting the other elements (world/global space)

// world space -> If you move an object without putting it inside a group, that transformation happens in world space.

// Local Space -> robot made of arms, legs, and a head
// move the entire robot, all parts move together
// each part can also move independently — relative to its parent

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

// // Create a geometry
// const geometry = new THREE.BoxGeometry();

// // Create a material
// const material = new THREE.MeshBasicMaterial({
//   color: 0x00ff00,
// }); // Green color

// const mesh = new THREE.Mesh(geometry, material);
// mesh.position.x = 1;
// scene.add(mesh);

// const group = new THREE.Group();
// group.add(mesh);
// scene.add(group);
// group.position.x = -1;

// So if the cube inside the group is at x = 1, and you move the group x = -1, the cube ends up at world x = 0.

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "cyan" });
const cube = new THREE.Mesh(geometry, material);

// move right
cube.position.x = 1;
// Rotate 45° around Y-axis
cube.rotation.y = Math.PI / 4;
// cube.rotation.x = Math.PI / 4;
// cube.rotation.z = Math.PI / 4;
// Double the size on Z
cube.scale.z = 2;

scene.add(cube);

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  // controls.update(); // Update the controls

  // Animate rotation over time as an example transformation sequence
  cube.rotation.y += Math.PI / (180 * 0.9); // Math.PI / (180 * 0.9) is approximately 0.0194.

  renderer.render(scene, camera);
}
animate();

// Understanding coordinate systems - affects how you build and interact with 3D environments:

// In architecture, precision matters — every wall, beam, or column needs to be in the right place.
// In games, your player needs to walk around obstacles, not through them.
// In product design, rotating and scaling components must match the prototype exactly.

// By default, Three.js applies rotations in the order of X → Y→ Z.
// can change that if you need more control

// world space uses global coordinates while local space uses parent relative coordinates