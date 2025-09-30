import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;
camera.position.y = 5;
scene.add(camera);

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);

// Add OrbitControls to the camera
const controls = new OrbitControls(camera, renderer.domElement);

// Create an ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // Color, intensity
scene.add(ambientLight);

// Create various geometries and materials
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 0);
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const coneGeometry = new THREE.ConeGeometry(1, 2, 32);

const sphereMaterial = new THREE.MeshStandardMaterial({
  color: "#00b8a2",
  roughness: 0,
  wireframe: false,
});
const icosahedronMaterial = new THREE.MeshStandardMaterial({
  color: "#fffa00",
  roughness: 0,
  wireframe: false,
});
const boxMaterial = new THREE.MeshStandardMaterial({
  color: "#ff5733",
  roughness: 0.5,
  wireframe: false,
});
const coneMaterial = new THREE.MeshStandardMaterial({
  color: "#4a00e0",
  roughness: 0.3,
  wireframe: false,
});

// Create meshes with different geometries
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-3, 0, 0);

const ico = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
ico.position.set(3, 0, 2);

const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(0, 0, -3);

const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.set(0, 0, 3);

// Add all objects to the scene
scene.add(sphere, ico, box, cone);

// Create a plane for a floor
const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.y = -2;
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Spotlight with properties
const spotlight = new THREE.SpotLight("#ffd60a", 50, 10, Math.PI / 2, 0.2, 2); // Color, intensity, distance, angle, penumbra, decay
spotlight.position.set(10, 5, 3);
scene.add(spotlight);

// helper
const spotLightHelper = new THREE.SpotLightHelper(spotlight);
scene.add(spotLightHelper);

// spotlight 2
const spotLight2 = new THREE.SpotLight("#9d4edd", 50, 20, Math.PI / 2, 0.2, 2); // Color, intensity, distance, angle, penumbra, decay
spotLight2.position.set(-2, 5, -3);
spotLight2.target = cone;
scene.add(spotLight2);

// helper
const spotLightHelper2 = new THREE.SpotLightHelper(spotLight2);
scene.add(spotLightHelper2);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  spotLightHelper.update();
  spotLightHelper2.update();

  controls.update(); // Update the controls

  cone.rotation.x += 0.01;
  cone.rotation.y += 0.01;
  cone.rotation.z += 0.01;
  ico.rotation.x += 0.01;
  ico.rotation.y += 0.01;

  // controls.autoRotate = true;
  // controls.autoRotateSpeed = 0.5;
  // Render the scene
  renderer.render(scene, camera);
}

// Start the animation loop
animate();

// Imagine you’re crafting a scene in a 3D universe, and you want to highlight a specific object or area with a focused beam of light, like a spotlight on a stage.

// create directional, cone-shaped lighting effects

// A SpotLight in Three.js is
// a light source that emits light in a cone shape, similar to a flashlight or a stage spotlight.

// Spotlights: Focused Light Beams It represents a cone-shaped light source, emitting light in a specific direction with a defined spread angle.

// It's the same as a flashlight or a car headlight or a theater spotlight.
