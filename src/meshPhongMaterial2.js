import "./style.css";
// Import the necessary Three.js modules
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";

const gui = new GUI();

const config = {
  color: 0x524700,
  emissive: 0x000000,
  specular: 0xffc800,
  opacity: 1,
  transparent: false, // Whether the material is transparent. This has an effect on rendering as transparent objects need special treatment and are rendered after non-transparent objects. When set to true, the extent to which the material is transparent is controlled by the opacity property.
  flatShading: false,
  vertexColors: false,
  reflectivity: 0.1,
  refractionRatio: 0.98,
  shininess: 10,
};

gui.addColor(config, "color");
gui.addColor(config, "emissive");
gui.addColor(config, "specular");
gui.add(config, "transparent");
gui.add(config, "opacity", 0, 1, 0.1); // here we can control the opacity of the object but we have to set transparent to true
gui.add(config, "flatShading");
gui.add(config, "vertexColors");
gui.add(config, "reflectivity", 0, 1, 0.1);
gui.add(config, "refractionRatio", 0, 1, 0.01);
gui.add(config, "shininess", 0, 100, 1);

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;
scene.add(camera);

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);

// Add OrbitControls to the camera
const controls = new OrbitControls(camera, renderer.domElement);

// Add an ambient light source
const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
scene.add(ambientLight);

// Add a directional light source
const light = new THREE.DirectionalLight(0xffffff, 2.8);
light.position.set(4, 3, 4);
scene.add(light);

const light2 = new THREE.DirectionalLight(0xffffff, 2.8);
light2.position.set(4, 3, 4);
scene.add(light2);

// Create a geometry
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshPhongMaterial();
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Create a plane for a floor
const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1);
const planeMaterial = new THREE.MeshStandardMaterial({ color: "#283618" });
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
  sphere.material.specular.set(config.specular);
  sphere.material.opacity = config.opacity;
  sphere.material.transparent = config.transparent;
  sphere.material.flatShading = config.flatShading;
  sphere.material.vertexColors = config.vertexColors;
  sphere.material.reflectivity = config.reflectivity;
  sphere.material.refractionRatio = config.refractionRatio;
  sphere.material.shininess = config.shininess;

  material.needsUpdate = true;

  controls.update(); // Update the controls

  // Render the scene
  renderer.render(scene, camera);
}

// Start the animation loop
animate();

// Whether you’re creating a shiny plastic ball, a glowing neon sign, or a textured metal surface, this material has got you covered.

// 🎨 What are vertex colors?

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ vertexColors: true });

// const cube = new THREE.Mesh(geometry, material);

//  Assign per-vertex colors
// const colors = [];
// for (let i = 0; i < geometry.attributes.position.count; i++) {
//   colors.push(Math.random(), Math.random(), Math.random()); // RGB values
// }
// geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
// Here, every vertex gets a random RGB color.

// Because material.vertexColors = true, the shader uses those vertex colors instead of just the material’s color.

// The faces between vertices get smoothly blended colors.

///////////////////////////

// sphere.material.vertexColors = config.vertexColors;
// If config.vertexColors = true, the material will use the per-vertex color data (if the geometry has color attributes).
// If false, the material just uses its uniform color or map instead.

// Vertex colors = per-vertex paint data that can be blended across faces. They’re often used for:
// Painting models (instead of UV textures).
// Adding gradients.
// Procedural coloring (heatmaps, terrain, particles, etc.).
