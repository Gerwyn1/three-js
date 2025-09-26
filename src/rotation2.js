import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
// scene.background = new THREE.Color("darkred");

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 5);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);

const geometry = new THREE.BoxGeometry();

const cube1 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: "lime", wireframe: true }));
const cube2 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: "green" }));
scene.add(cube1, cube2);
// cube1.rotation.x = degreesToRadians(45);
// cube1.rotation.y = degreesToRadians(90);
cube1.rotation.x = THREE.MathUtils.degToRad(45);
cube1.rotation.y = THREE.MathUtils.degToRad(90);

let angle = 0; // The current angle of rotation (in radians)
const radius = 2; // How far cube2 is from the center (cube1)
const speed = 0.02; // How fast the angle increases per frame

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  // Rotate cube2 around cube1

  // Effectively, this is parametric equations of a circle: x=r⋅cos(θ),z=r⋅sin(θ)

  // As theta (angle) increases, the (x, z) point moves around the circle.
  // Because y is unchanged, the cube rotates in a horizontal plane around cube1.

  // Every frame, angle increases by speed.
  // positive increment-> clockwise, negative increment -> anti-clockwise
  angle += speed;

  // change starting point by either swapping cos & sin OR changing the assignment to negative value

  // Math.cos(angle) gives the x-coordinate on the circle.
  cube2.position.x = Math.cos(angle) * radius; // Multiply by radius to scale the circle’s size.
  // Math.sin(angle) gives the z-coordinate on the circle.
  cube2.position.z = Math.sin(angle) * radius; // Multiply by radius to scale the circle’s size.

  // The orbit effect
  // Cube2 is “orbiting” around cube1 along a circle of radius 2 units.
  // speed controls angular speed
  renderer.render(scene, camera);
}

animate();

function degreesToRadians(degree) {
  return degree * (Math.PI / 180);
}

// Imagine cube1 at (0,0,0) (the center).
// Cube2 moves right → forward → left → back → right in a smooth loop.
// The path is a perfect circle in the XZ-plane.

// x = cos(angle) * radius → controls horizontal (left/right) movement.
// z = sin(angle) * radius → controls depth (forward/back) movement.

// Why cos = horizontal, sin = depth (there’s no strict rule — you could swap them)

// Oscillation: 1D wave along a single axis:
// functions -> sin(time)
// Axes changed -> y-axis
// result: Up/down motion

// Orbit: 2D parametric circle using cos + sin, phase-shifted. (Circular)
// functions -> cos(angle), sin(angle)
// Axes changed -> X and Z (or X and Y)
// result: Circular orbit

// angle (rad): 0 -> π/2 -> π -> 3π/2 -> 2π
// cos (angle): 1 -> 0 -> -1 -> 0 -> 1
// sin (angle): 0 -> 1 -> 0 -> -1 -> 0

// cos starts at 1 when sin starts at 0 → this phase difference is what makes the cube move in a circle instead of a straight line.

// mini challenge: I challenge you guys to make one side of the spinning cube always face the center.
// tip: you just have to add look at 0,0,0 and it can be easily achieved


// -1 ≤ Math.sin(angle) ≤ 1
// -1 ≤ Math.cos(angle) ≤ 1