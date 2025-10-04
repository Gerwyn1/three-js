import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// Canvas
const canvas = document.querySelector("canvas.world");
// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);

// Add OrbitControls to the camera
const controls = new OrbitControls(camera, renderer.domElement);

// Let's start from this
let mixer;

const loader = new GLTFLoader();
loader.load("/src/low-poly_cartoon_style_car_01.glb", (gltf) => {
  const model = gltf.scene;
  scene.rotation.y = -Math.PI / 3.5;
  scene.position.y = -1;
  scene.add(model);

  // Setup the mixer
  mixer = new THREE.AnimationMixer(model);

  // Get the first animation and play it
  const clip = gltf.animations[0];
  const action = mixer.clipAction(clip);
  action.play();
});

// Lights
const light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(5, 5, 5);
scene.add(light);

// 1. Key Light – strong light from the side
const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
keyLight.position.set(5, 5, 5);
scene.add(keyLight);

// 2. Fill Light – softer light from the opposite side
const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
fillLight.position.set(-5, 2, 5);
scene.add(fillLight);

// 3. Back Light – gives the model an outline glow
const backLight = new THREE.DirectionalLight(0xffffff, 1);
backLight.position.set(0, 5, -5);
scene.add(backLight);

// Optional ambient light to slightly fill everything
const ambient = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambient);

// Render the scene
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);

  controls.update();
  renderer.render(scene, camera);
}

animate();

// An AnimationMixer is like a DJ — it plays and controls one or more animations on a 3D object.

// console.log(gltf.animations); // → array of AnimationClips

// Some models may have multiple clips
// Each clip might animate a different part
// You can even blend or play them together

// 🧠 Pro Tip
// You can name animations inside Blender (or your modeling tool). That name shows up in the .animations array:
// gltf.animations.forEach((clip) => {
//   console.log(clip.name);
// });

// 🧪 Summary
// Use AnimationMixer to control model animations

// Access clips from gltf.animations

// Call mixer.update() inside your loop using delta time
