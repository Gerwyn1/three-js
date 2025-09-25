import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
scene.background = new THREE.Color("black");

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 10;
// camera.position.y = 4;
camera.position.set(0, 4, 10);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const cubeMaterial = new THREE.MeshBasicMaterial({ color: "cyan" });

const cube1 = new THREE.Mesh(new THREE.BoxGeometry(), cubeMaterial);
const cube2 = new THREE.Mesh(new THREE.BoxGeometry(), cubeMaterial);
const cube3 = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial({ color: "lime" }));

// cube1.position.x = -1.125;
cube1.position.set(-1.125, 0, 0);
// cube2.position.x = 1.125;
cube2.position.set(1.125, 0, 0);
// cube3.position.y = 0.75;
cube3.position.set(0, 0.75, 0);

scene.add(cube1, cube2, cube3);

// light
const light = new THREE.DirectionalLight("0xffffff", 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

renderer.render(scene, camera);

// Animation for bouncing effect
let bounceSpeed = 0.03;
let direction = 1;

function animate() {
  requestAnimationFrame(animate);

  // bouncing logic (starts out as positive - bounce up first)
  cube3.position.y += bounceSpeed * direction;

  // to bounce back up:
  // When you multiply a negative number by another negative number, the result is a positive number

  // to bounce back down:
  // When you multiply a positive number by a negative number, the result is always a negative number

  if (cube3.position.y <= 0.75 || cube3.position.y >= 3) {
    direction *= -1;
  }

  controls.update();
  renderer.render(scene, camera);
}

animate();

// second solution for bouncing logic
let bouncingSpeedSecond = 0.05;
let lowerClamp = 0.02;
let upperClamp = 3;
function animate2() {
  cube3.position.y += bouncingSpeedSecond * direction;

  // flip direction at bounds
  if (cube3.position.y <= lowerClamp) {
    cube3.position.y = lowerClamp; // clamp so it doesn’t go below
    direction = 1;
  } else if (cube3.position.y >= upperClamp) {
    cube3.position.y = upperClamp; // clamp so it doesn’t go above
    direction = -1;
  }
}
