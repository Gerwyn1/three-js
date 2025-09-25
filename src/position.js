// A little cleaner and faster if you're updating all three at once:
// cube.position.set(3, 2, -5); // Move to (3, 2, -5)

// move a cube 2 units left and 1 unit up from wherever it already is:
// cube.position.x -= 2; // Move left
// cube.position.y += 1; // Move up

import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
scene.background = new THREE.Color("black");

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
// controls.target.set(1, 0, 0);

// controls.autoRotate = true;
// controls.autoRotateSpeed = 10.0;

const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: "lime" }));
const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: "green" }));

cube1.position.set(-1, 0, 0); // Move cube1 to the left
cube2.position.set(1, 0, 0); // Move cube2 to the right

scene.add(cube1, cube2);

const group = new THREE.Group();
group.add(cube1, cube2);
scene.add(group);
// group.position.y = 1;
group.position.set(0, 2, 0);

renderer.render(scene, camera);

function animate() {
  requestAnimationFrame(animate);
  // controls.update();
  renderer.render(scene, camera);
}

animate();


// great for organizing your scene and for creating parent-child relationships
// like a solar system or a robot with limbs.

// If you'updating positions in animation, only change what’s necessary to keep performance smooth.