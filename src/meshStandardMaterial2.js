import "./style.css";
// Import the necessary Three.js modules
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";

const gui = new GUI();

const config = {
  wireframe: false, // Add a boolean property
  visibleToggle: function () {
    sphere.visible = !sphere.visible;
  },
  color: "#00ff00", // Add a color property
  emissive: "#184e77", // Add a color property
  roughness: 0.5,
  metalness: 0.5,
  flatShading: true,
};

gui.add(config, "wireframe");
gui.add(config, "visibleToggle");
gui.addColor(config, "color");
gui.addColor(config, "emissive");
gui.add(config, "roughness", 0, 1, 0.1);
gui.add(config, "metalness", 0, 1, 0.1);
gui.add(config, "flatShading");

// Canvas
const canvas = document.querySelector("canvas.world");

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
scene.add(camera);

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);

// Add OrbitControls to the camera
const controls = new OrbitControls(camera, renderer.domElement);

//Adding Lights
//Since MeshStandardMaterial relies on lighting, we need to add some lights to the scene.
// Create an ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Color, intensity
scene.add(ambientLight);
// Create a directional light
const directionalLight = new THREE.DirectionalLight("#ffe5ec", 2); // Color, intensity
directionalLight.position.set(2, 1, 4);
scene.add(directionalLight);
// pointlight
const pointLight = new THREE.PointLight("#fb8500", 20); // Color, intensity, distance
pointLight.position.set(0, 2, 0); // Set position
scene.add(pointLight);

// Create a geometry
const geometry = new THREE.SphereGeometry(1, 32, 32);
// MeshStandardMaterial
const material = new THREE.MeshStandardMaterial({
  color: 0xff0000, // red
  // emissive: "#460c1a", // what is emissive ? Emissive materials appear to glow as if they are a source of light.
  // what is wireframe ?
  // wireframe modeling is a technique where a designer will create a geometric presentation of an object using lines, curves, circles, arcs, and various other shapes.
  wireframe: false,
  visible: true, // if you want to hide the object, set it to false.
  depthTest: true, // default is true , what is depth-test ? you can see in figjam
});
const sphere = new THREE.Mesh(geometry, material);
sphere.position.x = -2;
scene.add(sphere);

const knot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 16);
const knotMaterial = new THREE.MeshStandardMaterial({
  color: "#f72585",
});
const knotMesh = new THREE.Mesh(knot, knotMaterial);
knotMesh.scale.set(0.5, 0.5, 0.5);
knotMesh.position.x = 2;
scene.add(knotMesh);

// Create a plane for a floor
const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1);
const planeMaterial = new THREE.MeshStandardMaterial({ color: "#001524" });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.y = -2;
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // change with lil-gui
  sphere.material.color.set(config.color);
  sphere.material.emissive.set(config.emissive);
  sphere.material.wireframe = config.wireframe;
  sphere.material.roughness = config.roughness;
  sphere.material.metalness = config.metalness;
  sphere.material.flatShading = config.flatShading;

  material.needsUpdate = true;

  controls.update(); // Update the controls

  // Render the scene
  renderer.render(scene, camera);
}

// Start the animation loop
animate();

// ✅ Key difference:

// color → needs external light to be visible.

// emissive → is visible even in total darkness (but only lights up itself, not the environment).

// MeshStandardMaterial is perfect for creating realistic 3D objects. Whether you’re building a game, a product visualization, or an interactive art piece, this material gives you the tools to make your objects look lifelike.
