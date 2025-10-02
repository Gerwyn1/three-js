import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Scene Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color("#111111");

// Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(3, 1, 6);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio); // rendering sharpness and performance balance.
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lights
// Directional light (top left warm light)
const dirLight = new THREE.DirectionalLight(0xffcc88, 10);
dirLight.position.set(-3, 5, 3);
scene.add(dirLight);

// Point light (cool highlight from right)
const pointLight = new THREE.PointLight(0x00ffff, 100, 10);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

// Material
const material = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  roughness: 0.15,
  reflectivity: 0.9,
  clearcoat: 0.0,
  clearcoatRoughness: 0.1,
  transmission: 1, // adds internal glow / glass effect
  thickness: 1,
  ior: 1.4, // index of refraction 1.0 - 2.3
});

// Object
const sphere = new THREE.Mesh(new THREE.SphereGeometry(1.2, 64, 64), material);
sphere.position.y = 0.5;
scene.add(sphere);

// Ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 30),
  new THREE.MeshStandardMaterial({ color: "#222222", roughness: 1 })
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -1;
scene.add(ground);

// Animate
function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.y += 0.007;
  controls.update();
  renderer.render(scene, camera);
}
animate();

// optional: (clamp if performance is an issue)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Suppose your canvas is 100 × 100 CSS pixels.

// On a Retina display, devicePixelRatio = 2.

// That means the renderer will actually render at 200 × 200 device pixels.

// Now:
// Width doubles (100 → 200)
// Height doubles (100 → 200)
// Total pixels = 200 × 200 = 40,000

// Originally it was 100 × 100 = 10,000
// So: 40,000 / 10,000 = 4× more pixels total.

// ⚖️ That’s why:
// Pixel ratio = 1 → normal resolution
// Pixel ratio = 2 → 4× more work
// Pixel ratio = 3 → 9× more work

// 🔬 What happens when you change ior

// ior = 1.0 → same as vacuum/air.

// Light doesn’t bend at all. Object looks almost invisible if it’s transmissive.

// ior ≈ 1.3–1.5 → typical transparent materials:

// Water ≈ 1.33

// Glass ≈ 1.5

// Plastics ≈ 1.4–1.6

// Light bends moderately. Object looks realistic for “everyday” glass/plastic.

// ior = 2.0+ → very dense, like sapphire or diamond.

// Light bends a lot more (stronger refraction).

// You get dramatic distortions, almost like a magnifying lens effect.

// The inside of the object looks warped and thicker, reflections can look stronger.

// Visual differences you’d notice:

// Lower IOR (~1.0–1.2): Object looks less like glass, almost like it’s not bending light at all — more “transparent overlay.”

// Mid IOR (~1.4–1.6): Realistic water/glass. Things seen through it are slightly shifted or distorted.

// High IOR (~2.0–2.3): Light bends strongly, lots of distortion/refraction. Looks “crystal-like” or even jewel-like.

// ✅ Answering your question directly:

// does the light bend more if i increase the value?
// Yes — the higher the IOR, the stronger the bending/refraction effect.

// Think of it like looking at a straw in a glass of water:

// With water (ior ≈ 1.33), the straw looks slightly bent.

// With diamond (ior ≈ 2.42), it would look much more bent and sparkly.

// ⚠️ One thing though: In Three.js, for transmission and IOR to look correct, you need an environment map (so the refraction has something to distort). Without it, higher IOR values may just look like the object gets darker or oddly warped.

// MeshPhysicalMaterial is the ultimate tool for creating ultra-realistic 3D objects. Whether you’re designing a car, a glass vase, or a velvet cushion


// Toggle transparency // Whether the material is transparent, has an effect on rendering as transparent objects need special treatment and are rendered after non-transparent objects. When set to true, the extent to which the material is transparent is controlled by the opacity property.


// more properties -> more complexity -> may affect performance of application


// MeshPhysicalMaterial includes all the features of MeshStandardMaterial, with the added benefits of Clearcoat and Clearcoat Roughness, among others. These features enhance the material's realism, allowing for effects like glossy finishes.