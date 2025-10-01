import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import GUI from "lil-gui";

const gui = new GUI();
const settings = {
  ambient: 0xffffff,
  hemiSky: 0x44ccff,
  hemiGround: 0xff33cc,
  dir: 0xffaa33,
  point: 0x00ff99,
  spot: 0x00ffff,
  rect: 0xaa00ff,
  intensity: 1,
  posX: 0,
  posY: 0,
  posZ: 0,
};

const lightsFolder = gui.addFolder("Lights");
lightsFolder.addColor(settings, "ambient").onChange((value) => ambient.color.set(value));
lightsFolder.addColor(settings, "hemiSky").onChange((value) => hemi.color.set(value));
lightsFolder.addColor(settings, "hemiGround").onChange((value) => hemi.groundColor.set(value));
lightsFolder.addColor(settings, "dir").onChange((value) => dir.color.set(value));
lightsFolder.addColor(settings, "point").onChange((value) => point.color.set(value));
lightsFolder.addColor(settings, "spot").onChange((value) => spot.color.set(value));
lightsFolder.addColor(settings, "rect").onChange((value) => rect.color.set(value));

gui.add(settings, "intensity", -10, 10, 0.01).onChange((value) => {
  ambient.intensity = value;
  hemi.intensity = value;
  dir.intensity = value;
  point.intensity = value;
  spot.intensity = value;
  rect.intensity = value;
});

const positionFolder = gui.addFolder("Position");
positionFolder.add(settings, "posX", -Math.PI, Math.PI, 0.1).onChange((value) => (hemi.position.x = value));
positionFolder.add(settings, "posY", -Math.PI, Math.PI, 0.1).onChange((value) => (hemi.position.y = value));
positionFolder.add(settings, "posZ", -Math.PI, Math.PI, 0.1).onChange((value) => (hemi.position.z = value));

// const intensityFolder = gui.addFolder("Lights");
// lightsFolder.addColor(settings, "ambient").onChange((value) => ambient.color.set(value));
// lightsFolder.addColor(settings, "hemiSky").onChange((value) => hemi.color.set(value));
// lightsFolder.addColor(settings, "hemiGround").onChange((value) => hemi.groundColor.set(value));
// lightsFolder.addColor(settings, "dir").onChange((value) => dir.color.set(value));
// lightsFolder.addColor(settings, "point").onChange((value) => point.color.set(value));
// lightsFolder.addColor(settings, "spot").onChange((value) => spot.color.set(value));
// lightsFolder.addColor(settings, "rect").onChange((value) => rect.color.set(value));

// Init
RectAreaLightUniformsLib.init();

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(6, 4, 10);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// 1. Ambient Light (white fill)
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

// 2. Hemisphere Light (blue sky / pink ground)
const hemi = new THREE.HemisphereLight(0x44ccff, 0xff33cc, 0.7);
scene.add(hemi, new THREE.HemisphereLightHelper(hemi, 1)); // new THREE.HemisphereLightHelper(hemi, 1)

// 3. Directional Light (warm orange)
const dir = new THREE.DirectionalLight(0xffaa33, 1);
dir.position.set(6, 6, 2);
scene.add(dir); // new THREE.DirectionalLightHelper(dir)

// 4. Point Light (neon green)
const point = new THREE.PointLight(0x00ff99, 2, 15);
point.position.set(-5, 3, 1);
scene.add(point); // new THREE.PointLightHelper(point)

// 5. Spot Light (cyan beam)
const spot = new THREE.SpotLight(0x00ffff, 2, 20, Math.PI / 5);
spot.position.set(0, 6, 5);
spot.target.position.set(0, 1, 0);
scene.add(spot); // new THREE.SpotLightHelper(spot)

// 6. RectArea Light (purple wall glow)
const rect = new THREE.RectAreaLight(0xaa00ff, 8, 6, 6);
rect.position.set(5, 3, -6);
rect.rotation.y = Math.PI;
scene.add(rect, new RectAreaLightHelper(rect));

// === MATERIAL
const brightMat = new THREE.MeshStandardMaterial({
  roughness: 0.2,
  metalness: 0.6,
  color: "#ffffff",
  // emissive does not cast light into the scene. It just makes the material look like it’s glowing. If you want it to actually illuminate nearby objects, you’d need to fake it (e.g. with bloom postprocessing or by adding a real light source).
  // emissive: 0xff0000,
  emissiveIntensity: 2,
});

// === OBJECTS

// Left: Sphere under PointLight
const sphere = new THREE.Mesh(new THREE.SphereGeometry(1.2, 32, 32), brightMat);
sphere.position.set(-4, 1.2, 0);

// Center: Torus under SpotLight
const torus = new THREE.Mesh(new THREE.TorusKnotGeometry(1, 0.4, 100, 16), brightMat);
torus.position.set(0, 1.5, 0);

// Right: Cube lit by RectAreaLight
const cube = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.8, 1.8), brightMat);
cube.position.set(4, 1.2, 0);

// Floor
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(40, 40),
  new THREE.MeshStandardMaterial({ color: "#222", roughness: 1 })
);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1;

scene.add(sphere, torus, cube, plane);

// Animate
function animate() {
  requestAnimationFrame(animate);
  torus.rotation.y += 0.01;
  cube.rotation.y += 0.005;
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Whether you’re building a cozy nighttime scene, a futuristic city, or a magical forest, you now have the tools to bring your vision to life.
