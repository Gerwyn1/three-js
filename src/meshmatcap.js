// making your 3D objects look amazing without needing complex lighting setups.

// pre-baked texture (called a matcap) to simulate lighting and shading on your 3D objects.

// Instead of calculating lights and shadows in real-time, MeshMatcapMaterial "paints" the lighting directly onto your object using the matcap texture.

// quick, efficient, and perfect for stylized or cartoonish visuals.

// A matcap texture is a special kind of image that captures lighting and shading information. It usually looks like a sphere with highlights and shadows painted onto it. When you apply this texture to a 3D object, it "wraps" around the object, making it look like it’s lit from all angles.

// MeshMatcapMaterial is perfect for beginners because it’s simple and fast. You don’t need to worry about setting up lights or tweaking material properties like metalness and roughness. Just pick a matcap texture, apply it to your object, and you’re done!

// It’s also great for stylized or low-poly art styles, where realistic lighting isn’t necessary. Plus, it’s incredibly performant, making it ideal for projects where speed is important.

import "./style.css";
// Import the necessary Three.js modules
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";
import MatCapTexture from "./ChatGPT Image Oct 2, 2025, 01_52_38 PM.png";
// import MatCapTexture from "./Generated Image October 02, 2025 - 1_46PM.png";

const gui = new GUI();

const config = {
  color: 0xffffff,
  map: "none",
};

gui.addColor(config, "color");
gui.add(config, "map", ["none", "matcap"]);

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
// Create an ambient light
const ambientLight = new THREE.AmbientLight("#f0ead2", 1); // Color, intensity
scene.add(ambientLight);
// Create a directional light
const directionalLight = new THREE.DirectionalLight("#caf0f8", 10); // Color, intensity
directionalLight.position.set(0, 1, -4);
scene.add(directionalLight);
// pointlight
const pointLight = new THREE.PointLight("#fff1d0", 10); // Color, intensity, distance
pointLight.position.set(0, 2, 0); // Set position
scene.add(pointLight);

const matcap = new THREE.TextureLoader().load(MatCapTexture);

// Create a geometry
const torusGeometry = new THREE.TorusKnotGeometry(1, 0.4, 100, 16);
// MeshMatcapMaterial
const torusMaterial = new THREE.MeshMatcapMaterial({
  color: "white",
  side: THREE.DoubleSide,
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.set(0, 0, 1);
scene.add(torus);

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
  torusMaterial.needsUpdate = true;
  torusMaterial.color.set(config.color);

  if (config.map === "matcap") {
    torusMaterial.matcap = matcap;
  } else {
    torusMaterial.matcap = null;
  }

  controls.update(); // Update the controls

  // Render the scene
  renderer.render(scene, camera);
}

// Start the animation loop
animate();
