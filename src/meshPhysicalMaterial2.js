import "./style.css";
// Import the necessary Three.js modules
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";

const gui = new GUI();

const config = {
  color: 0xffffff,
  transmission: 0, // How much the material is transparent, the valid range is between 0 (fully opaque) and 1 (fully transparent).
  opacity: 1, // If the material's transparent property is not set to true, the material will remain fully opaque and this value will only affect its color.
  transparent: false, // Whether the material is transparent. This has an effect on rendering as transparent objects need special treatment and are rendered after non-transparent objects. When set to true, the extent to which the material is transparent is controlled by the opacity property.
  metalness: 0,
  roughness: 0,
  ior: 1.5, // The index of refraction (IOR) of the material, which controls how much light is bent when passing through the material.
  reflectivity: 0.1, // How much the material is reflective, the valid range is between 0 (no reflections) and 1 (full reflections).
  clearcoat: 0, // How much the clearcoat layer is reflective, the valid range is between 0 (no reflections) and 1 (full reflections).
  clearcoatRoughness: 0.1, // The roughness of the clearcoat layer.
  thickness: 0.01, // The thickness of the material in the direction of the normal. This is used to simulate subsurface scattering for materials such as marble.
  specularIntensity: 1, // specular: relating to or having the properties of a mirror.
  // there are more properties to explore in the documentation.
  // remember that the more properties you add, the more complex the material becomes, and it may affect the performance of your application.
};

gui.addColor(config, "color");
gui.add(config, "transmission", 0, 1, 0.1);
gui.add(config, "transparent");
gui.add(config, "opacity", 0, 1, 0.1); // here we can control the opacity of the object but we have to set transparent to true
gui.add(config, "metalness", 0, 1, 0.1);
gui.add(config, "roughness", 0, 1, 0.1);
gui.add(config, "ior", 1, 2, 0.1);
gui.add(config, "reflectivity", 0, 1, 0.1);
gui.add(config, "clearcoat", 0, 1, 0.1);
gui.add(config, "clearcoatRoughness", 0, 1, 0.1);
gui.add(config, "thickness", 0, 0.1, 0.001);
gui.add(config, "specularIntensity", 0, 1, 0.1);

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
// Add an ambient light source
const ambientLight = new THREE.AmbientLight(0xcccccc, 1);
scene.add(ambientLight);

// Add a directional light source
const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(4, 3, 4);
scene.add(light);

const light2 = new THREE.DirectionalLight(0xffffff, 3);
light2.position.set(-4, 3, -4);
scene.add(light2);

// Create a geometry
const geometry = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 16);
const geometry2 = new THREE.SphereGeometry(1, 32, 32);
let material = new THREE.MeshPhysicalMaterial(); // https://threejs.org/examples/#webgl_materials_physical_clearcoat this example is great
const material2 = new THREE.MeshPhysicalMaterial({
  color: 0xff0000,
  transparent: true,
  transmission: 0.5,
  roughness: 0.5,
  side: THREE.DoubleSide,
  clearcoat: 1,
  thickness: 1,
  clearcoatRoughness: 0.5,
  reflectivity: 1,
  ior: 1.5,
  attenuationColor: new THREE.Color(0xff0000),
});
const knot1 = new THREE.Mesh(geometry, material);
const sphere = new THREE.Mesh(geometry2, material2);
knot1.scale.set(0.5, 0.5, 0.5);
knot1.position.set(1.5, 0, 1);
sphere.position.set(-1.5, 0, 1);
scene.add(sphere, knot1);

const knot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 16);
const knotMaterial = new THREE.MeshStandardMaterial({
  color: "#c77dff",
});
const knotMesh = new THREE.Mesh(knot, knotMaterial);
knotMesh.scale.set(0.5, 0.5, 0.5);
knotMesh.position.set(0, 0, -1);
scene.add(knotMesh);

// Create a plane for a floor
const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1);
const planeMaterial = new THREE.MeshStandardMaterial({ color: "#0a9396" });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.y = -2;
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // change with lil-gui
  knot1.material.color.set(config.color);
  knot1.material.transmission = config.transmission;
  knot1.material.opacity = config.opacity;
  knot1.material.transparent = config.transparent;
  knot1.material.clearcoat = config.clearcoat;
  knot1.material.clearcoatRoughness = config.clearcoatRoughness;
  knot1.material.ior = config.ior;
  knot1.material.reflectivity = config.reflectivity;
  knot1.material.thickness = config.thickness;
  knot1.material.specularIntensity = config.specularIntensity;
  knot1.material.roughness = config.roughness;
  knot1.material.metalness = config.metalness;

  // the materials transparent property, then you also need to set its needsUpdate to true so that it re compiles.
  // Specifies that the material needs to be recompiled.
  material.needsUpdate = true;

  controls.update(); // Update the controls

  // Render the scene
  renderer.render(scene, camera);
}

// Start the animation loop
animate();

// The thickness value is basically saying:
// ➡️ “Let the light penetrate this far into the material along the surface normal before it scatters around inside or fades out.”
// After that, the light either:
// scatters back out nearby (giving the soft glow look), or
// gets absorbed inside the object (tinted by the material’s color/attenuation).
// So a low thickness (e.g. 0.01) makes it look like a thin sheet of marble or wax, while a high thickness (e.g. 1.0) makes it look like a thick block, where light can penetrate much deeper before bouncing out.

// attenuationColor: 0xffffff, // tint inside the object
// attenuationDistance: 0.1, // how quickly light fades

// attenuationColor = what color that medium tints (it changes the color of the light as the light passes through it.) the light as it travels inside.

// //////////////////

// 1. attenuationColor
// This sets the color tint of light as it travels through the material.
// Example:
// 0xffffff → no tint (white light passes unchanged).
// 0xff0000 → light gets tinted red as it goes through, making the material glow reddish.
// Think of stained glass: blue glass doesn’t just “look blue” on the surface — the transmitted light itself is colored blue.
// So attenuationColor = the “internal” color of the medium.

// 2. attenuationDistance
// This sets how quickly light fades/gets absorbed as it travels inside the material.
// Smaller value = light gets absorbed faster (so the material looks denser/less translucent).
// Larger value = light travels farther inside (more see-through and glowing).
// For example:
// attenuationDistance: 0.1 → light only travels a short way before fading, like marble or wax.
// attenuationDistance: 10.0 → light can pass much deeper, like murky glass or liquid.
// Infinity → light never fades inside (behaves like clear glass).

// //////////////////

// attenuationDistance = how far the light can go inside that medium before it gets absorbed/fades away.

// Shine white light through red glass → the light that comes out looks red.
// Shine white light through green water (algae) → the light that comes out looks greenish.
// Shine white light through clear glass → the light comes out still white (no tint).

// How they all fit together (example):
// const material = new THREE.MeshPhysicalMaterial({
//   transmission: 1.0,       // let light pass through (needed for glass-like / translucent effect)
//   thickness: 0.5,          // how far light can travel in the material
//   attenuationColor: 0xffe0bd, // warm skin-like tint
//   attenuationDistance: 0.2 // how quickly it fades
// });
// ➡️ That would simulate something like skin or wax, where light enters a bit, turns warm-colored, and softly glows back out.
