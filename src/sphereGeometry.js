import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true }); // antialias -> smooths jagged edges on rendered objects
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// It shines light in a single direction, with parallel rays.
// It doesn’t fade with distance (unlike a point light).
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 0);
scene.add(light);

const controls = new OrbitControls(camera, renderer.domElement);

const material = new THREE.MeshBasicMaterial({ color: "0x8ec5fc", wireframe: true });

// geometry settings
const params = {
  radius: 1,
  widthSegments: 32,
  heightSegments: 32,
  phiStart: 0,
  phiLength: Math.PI * 2,
  thetaStart: 0,
  thetaLength: Math.PI,
};

let mesh;
let geometry;

// const geometry = new THREE.SphereGeometry(1, 32, 32, 0, Math.PI * 2, 0, Math.PI);
// Sphere with 32 segments along its width and height, resulting in a smooth appearance.
// const sphere = new THREE.Mesh(geometry, material);
// scene.add(sphere);

function createSphere() {
  // memory management and avoiding duplicate objects
  // avoid performance drops + memory leaks.
  // cleans up the old sphere before making a new one.
  if (mesh) {
    // tells WebGL to free the GPU memory of the old geometry (otherwise, even if you remove the mesh from the scene, the GPU would still hold onto it).
    geometry.dispose();
    // ensures the old sphere disappears visually
    scene.remove(mesh);
  }

  geometry = new THREE.SphereGeometry(
    params.radius,
    params.widthSegments,
    params.heightSegments,
    params.phiStart,
    params.phiLength,
    params.thetaStart,
    params.thetaLength
  );
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}
createSphere();

// GUI
// Makes a floating panel for controllers on the web
// lil-gui gives you an interface for changing the properties of any JavaScript object at runtime
const gui = new GUI();
// params/geometry settings, params/geometry props, min, max, onchange value, geometry creation function (also involves removal before creation)
gui.add(params, "radius", 0.1, 5, 0.1).onChange(createSphere);
gui.add(params, "widthSegments", 3, 64, 1).onChange(createSphere);
gui.add(params, "heightSegments", 2, 64, 1).onChange(createSphere);
gui.add(params, "phiStart", 0, Math.PI * 2, 0.01).onChange(createSphere);
gui.add(params, "phiLength", 0, Math.PI * 2, 0.01).onChange(createSphere);
gui.add(params, "thetaStart", 0, Math.PI, 0.01).onChange(createSphere);
gui.add(params, "thetaLength", 0, Math.PI, 0.01).onChange(createSphere);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  // sphere.rotation.x +=.005
  // sphere.rotation.y +=.005
  renderer.render(scene, camera);
}
animate();

// phiStart: starting/expanding points, defaults at west point
// phiLength: How much of the sphere you keep around horizontally

// thetaStart says where, vertically, to begin drawing the sphere.
// 0 = start at the top pole (North Pole).
// Math.PI / 2 = start at the equator.
// Math.PI = start at the bottom pole.

// thetaLength: How much of the sphere you keep from top to bottom.

// Creative possibilities from sphere geometry: planet, a ball, or an abstract art piece etc
