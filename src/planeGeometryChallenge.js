import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 0);
light.target.position.set(2, 3, 4);
scene.add(light, light.target);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const material = new THREE.MeshBasicMaterial({ color: "lime", wireframe: true });
const geometry = new THREE.PlaneGeometry(10, 5, 16, 16);
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

plane.rotation.x = Math.PI / 2;
plane.position.y = -5;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
