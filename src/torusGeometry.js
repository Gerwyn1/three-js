// two of the most fundamental shapes in Three.js: BoxGeometry and SphereGeometry

// Create donuts, rings, or any other torus-shaped objects

// radius, tube radius, and the number of radial and tubular segments: control the overall size, thickness, and level of detail of the torus

// A TorusGeometry is a collection of vertices, edges, and faces that form a ring-like shape

import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 3, 4);
scene.add(light);
// light.target.position.set(2, 3, 4);
// scene.add(light.target)

const controls = new OrbitControls(camera, renderer.domElement);

const params = {
  radius: 1,
  tube: 0.4,
  radialSegments: 12,
  tubularSegments: 48,
  arc: Math.PI * 2,
  wireframe: true,
};

let material = new THREE.MeshStandardMaterial({
  color: "lime",
  wireframe: params.wireframe,
  metalness: 0.4,
  roughness: 0.2,
});

// radius: radius of center of torus to center of tube
// tube (radius of tube): expands the donut in all axis (x, y, z). must also be smaller than radius
// radialSegments: smoothness of side of donut
// tubularSegments: smoothness of path of donut
// arc: starting point of forming donut

let geometry;
let torus;

function createTorus() {
  if (torus) {
    geometry.dispose();
    material.dispose();
    scene.remove(torus);
  }

  geometry = new THREE.TorusGeometry(
    params.radius,
    params.tube,
    params.radialSegments,
    params.tubularSegments,
    params.arc
  );

  material = new THREE.MeshBasicMaterial({
    color: "lime",
    wireframe: params.wireframe,
  });

  torus = new THREE.Mesh(geometry, material);

  scene.add(torus);
}
createTorus();

const gui = new GUI();
gui.add(params, "radius", 0.1, 3, 0.1).onChange(createTorus);
gui.add(params, "tube", 0.05, 1, 0.01).onChange(createTorus);
gui.add(params, "radialSegments", 3, 64, 1).onChange(createTorus);
gui.add(params, "tubularSegments", 3, 100, 1).onChange(createTorus);
gui.add(params, "arc", 0, Math.PI * 2, 0.01).onChange(createTorus);
gui.add(params, "wireframe").onChange(createTorus);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  torus.rotation.x += 0.005;
  torus.rotation.y += 0.005;
  renderer.render(scene, camera);
}
animate();

// handle resize (for mobile/tablet responsiveness)
window.addEventListener("resize", () => {
  // A PerspectiveCamera projects the 3D world onto a 2D canvas
  // Updates the camera’s aspect ratio to match the new window dimensions.
  // If you skip this, the scene will look stretched or squashed after resizing.
  camera.aspect = window.innerWidth / window.innerHeight;
  //   Recalculates the camera’s projection matrix with the new aspect ratio.
  // (This is required anytime you change camera parameters like fov, aspect, near/far clipping planes etc)
  camera.updateProjectionMatrix();
  // Resizes the WebGL renderer’s output (the canvas) to fill the new browser window size.
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// radiusThe radius of the torus (default is 1).
// tubeRadiusThe radius of the tube (default is 0.4).
// radialSegmentsNumber of segments around the tube (default is 12).
// tubularSegmentsNumber of segments around the ring (default is 48).
// arcThe central angle of the torus (default is Math.PI* 2, which creates a full torus).

//  futuristic ring, a celestial orbit, or an abstract sculpture
// glowing ring in a sci-fi scene, a playful donut in a game

// 1. metalness and roughness in THREE.MeshBasicMaterial

// In your code, you’re using **MeshBasicMaterial**, which is a material that does not react to lights.
// That means properties like metalness and roughness don’t actually have any effect here.

// They only apply to physically based rendering (PBR) materials, such as:

// THREE.MeshStandardMaterial

// THREE.MeshPhysicalMaterial

// Here’s what they mean when used with the right material:

// metalness (0 → 1)
// Controls how metallic the surface looks.

// 0.0 → looks like a non-metal (wood, plastic, stone).

// 1.0 → looks like a metal (steel, gold, copper).

// roughness (0 → 1)
// Controls how smooth or rough the surface is.

// 0.0 → perfectly smooth, mirror-like reflections.

// 1.0 → completely rough, diffuse reflections (like chalk).

// 👉 Since MeshBasicMaterial ignores lighting, you won’t see any effect. You’d need to switch to MeshStandardMaterial or MeshPhysicalMaterial to make use of those.
