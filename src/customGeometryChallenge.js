import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { createCustomShape, CustomShape, generatePolygon } from "./utils";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// const { mesh: parallelogram, outline: parallelogramOutline } = new CustomShape(
//   [0, 1, 0, -1, -1, 0, 1, -1, 0, 2, 1, 0],
//   [0, 1, 2, 0, 2, 3],
//   {
//     color: "lime",
//     wireframeColor: "blue",
//     doubleSided: true,
//     wireframe: false,
//   }
// );

// Hexagon (6 sides)
const { mesh: hexagon, outline: hexagonOutline } = new CustomShape(
  generatePolygon(6).vertices,
  generatePolygon(6).indices,
  {
    color: 0x00ff00,
    doubleSided: true,
  }
);

hexagon.position.x = -2;
hexagonOutline.position.x = 2;

scene.add(hexagon, hexagonOutline);

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

// Exactly — you’ve just discovered why in real-world 3D graphics nobody types all those vertices by hand unless it’s a very special shape.

// For your dodecagon screenshot, what you’re seeing is called triangulation: any polygon has to be broken down into triangles so the GPU can draw it. Doing that manually for 12 sides (or 100 sides) is a nightmare.

// 👉 That’s why we use algorithms (like the generatePolygon() function I gave you) or rely on geometry helpers in Three.js (THREE.Shape, THREE.ExtrudeGeometry, THREE.LatheGeometry, etc.).

// const shape = new THREE.Shape();
// shape.moveTo(0, 1);  // start point
// shape.lineTo(-1, -1);
// shape.lineTo(1, -1);
// shape.lineTo(2, 1);
// shape.lineTo(0, 1);  // close path

// const geometry = new THREE.ShapeGeometry(shape);
