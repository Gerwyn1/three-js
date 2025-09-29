// color, intensity, casts shadows

// Ambient Light: Soft, uniform lighting with no shadows. Best for general scene brightness.
// Directional Light: Sunlight-like effect with strong directionality. Best for outdoor scenes.
// Point Light: Emits light in all directions from a point. Best for lamps and small light sources.
// SpotLight: Focused light beam. Best for flashlights and stage lights.
// Hemisphere Light: Two-colored lighting for natural outdoor effects.

// Directional Light is used to simulate sunlight in Three.js. It emits light in a specific direction, creating strong highlights and shadows, thus enhancing the realism of outdoor scenes.

// Ambient Light example: Imagine you're an explorer discovering a mysterious cave. You light a small lantern, and suddenly, the entire cave is dimly illuminated. You can't see every detail, but you can now navigate safely and sense the space around you.

// AmbientLight is like a universal light source that evenly illuminates every object in your scene. It doesn’t cast shadows or have a specific direction—it’s just there, softly brightening everything. Think of it as the light that fills a room on a cloudy day, where everything is visible but without strong contrasts

import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import GUI from "lil-gui";

const gui = new GUI();
const settings = {
  wireframe: false,
  visibleToggle: function () {
    sphere.visible = !sphere.visible;
  },
  meshColor: "#00ff00",
  lightColor: "#ffc370",
  intensity: 5,
};

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

// Create a geometry
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  wireframe: false,
  visible: true,
  roughness: 0, // if you want to see the ambient light effect, set roughness to 0.
});
const sphere = new THREE.Mesh(geometry, material);
sphere.position.x = 2;
scene.add(sphere);

const basicgeometry = new THREE.SphereGeometry(1, 32, 32);
const basicmaterial = new THREE.MeshStandardMaterial({
  color: "pink",
});
const basicsphere = new THREE.Mesh(basicgeometry, basicmaterial);
basicsphere.position.x = -2;
scene.add(basicsphere);

const torusGeometry = new THREE.TorusGeometry(1.5, 0.5, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({
  color: "#ff8c00",
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.x = -3.5;
scene.add(torus);

const dodecahedronGeometry = new THREE.DodecahedronGeometry(1.5, 0);
const dodecahedronMaterial = new THREE.MeshStandardMaterial({ color: "#ff0054" });
const dodecahedron = new THREE.Mesh(dodecahedronGeometry, dodecahedronMaterial);
dodecahedron.position.z = -3;
scene.add(dodecahedron);

// Create a plane for a floor
const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1);
const planeMaterial = new THREE.MeshStandardMaterial({ color: "#f7ede2" });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.y = -2;
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

gui.add(settings, "wireframe");
gui.add(settings, "visibleToggle");
gui.addColor(settings, "meshColor");
gui.addColor(settings, "lightColor");
gui.add(settings, "intensity", 0, 10, 0.01);

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  sphere.material.wireframe = settings.wireframe;
  sphere.material.color.set(settings.meshColor);
  ambientLight.color.set(settings.lightColor);
  ambientLight.intensity = settings.intensity;

  dodecahedron.rotation.x += 0.01;
  dodecahedron.rotation.y += 0.01;
  dodecahedron.rotation.z += 0.01;
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


// The AmbientLight is like the quiet hero of Three.js lighting. It doesn’t demand attention, but it subtly enhances your scene, making everything visible and cohesive. As you continue your journey in Three.js, experiment with combining AmbientLight with other lights to create stunning, realistic scenes.

// And remember, every great 3D masterpiece starts with a single light. So, keep experimenting, and soon you’ll be painting with light like a pro!