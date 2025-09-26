// resizing objects — either uniformly (all sides equally)
// or non-uniformly (stretching/squishing in one direction)
// Less than 1 (but positive)? → make it smaller
import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial({ color: "lime", wireframe: true }));
scene.add(cube);

// cube.rotation.y = -1;
// cube.rotation.x = 0.5;
// cube.scale.x = 2; // Wide
// cube.scale.y = 0.5; // Short
// cube.scale.z = 1; // Normal depth
// cube.scale.set(2, 0.5, 1);
// cube.scale.set(2, 2, 2);
// cube.scale.multiplyScalar(1.5) // Scale Relative to Current Size
// cube.scale.set(0.5, 0.5, 0.5);
cube.scale.set(2, 0.5, 1);
cube.position.set(0, -2, 0);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();


// Scaling a group? It’ll scale all child objects too.
// Non-uniform scaling can distort textures

// difference between cube.scale.set(x,y,z) and cube.scale.multiplyScalar():

// example 1: scale.set (Directly sets the scale absolute values for each axis)
// cube.scale.set(2, 2, 2); // X=2, Y=2, Z=2
// cube.scale.set(0.5, 1, 3); // Now X=0.5, Y=1, Z=3

// example 2: scale.multiplyScalar (Multiplies the current scale on all axes) (relative scaling)
// cube.scale.set(1, 1, 1);
// cube.scale.multiplyScalar(2); // Now (2, 2, 2)
// cube.scale.multiplyScalar(2); // Now (4, 4, 4)

// 👉 So if you’re doing oscillations, set() makes sense because you want a clean value each frame.
// If you used multiplyScalar() inside animate(), the cube would keep growing exponentially and never come back down 😅.