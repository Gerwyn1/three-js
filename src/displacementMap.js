import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";

// Canvas
const canvas = document.querySelector("canvas.world");
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Key directional light (strong sun-like light for casting dramatic shadows)
const directionalLight = new THREE.DirectionalLight(0xffffff, 6);
directionalLight.position.set(10, 20, 10);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(2048, 2048);
scene.add(directionalLight);

// 🔦 Spotlight (adds sharp sculpted focus to surface bumps)
const spotLight = new THREE.SpotLight(0xffffff, 12);
spotLight.position.set(5, 15, 5);
spotLight.angle = Math.PI / 7; // Slightly tighter beam
spotLight.penumbra = 0.3;
spotLight.decay = 2;
spotLight.distance = 100;
spotLight.castShadow = true;
scene.add(spotLight);

// Optional: helper to visualize spotlight cone while debugging
const spotHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotHelper);

// 💡 Rim light — highlights edges and depth from opposite side
const rimLight = new THREE.DirectionalLight(0xffffff, 2);
rimLight.position.set(-8, 6, -5);
scene.add(rimLight);

// 🌫️ Ambient light — low but present to keep shadows visible
const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
scene.add(ambientLight);

// Geometry
const geometry = new THREE.CylinderGeometry(
  1, // top radius
  1, // bottom radius
  3, // height
  256, // radial segments (important for curvature)
  256, // height segments (important for displacement)
  true // open-ended (false = capped)
);

// Textures
const textureLoader = new THREE.TextureLoader();

// These are standard maps used in PBR materials:
// Color Map — adds base color details
// Normal Map — adds fake bumps via lighting
// Roughness Map — controls shiny vs. matte areas
const colorMap = textureLoader.load("/src/Bricks031_1K-PNG_Color.png");
const normalMap = textureLoader.load("/src/Bricks031_1K-PNG_NormalGL.png");
const roughnessMap = textureLoader.load("/src/Bricks031_1K-PNG_Roughness.png");
const displacementMap = textureLoader.load("/src/Bricks031_1K-PNG_Displacement.png");

// Material
const material = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  map: colorMap,
  normalMap: normalMap,
  roughnessMap: roughnessMap,
  displacementMap: displacementMap, // Apply the displacementMap
  displacementScale: 0.18, // Starting bump height
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// GUI
const gui = new GUI();
const settings = {
  showColorMap: true,
  showNormalMap: true,
  useRoughnessMap: true,
  useDisplacementMap: true,
  displacementScale: 0.18,
  showWireframe: false,
};

gui
  .add(settings, "showColorMap")
  .name("Use Color Map")
  .onChange((value) => {
    material.map = value ? colorMap : null;
    material.needsUpdate = true;
  });

gui
  .add(settings, "showNormalMap")
  .name("Use Normal Map")
  .onChange((value) => {
    material.normalMap = value ? normalMap : null;
    material.needsUpdate = true;
  });

gui
  .add(settings, "useRoughnessMap")
  .name("Use Roughness Map")
  .onChange((value) => {
    material.roughnessMap = value ? roughnessMap : null;
    material.needsUpdate = true;
  });

gui
  .add(settings, "useDisplacementMap")
  .name("Use Displacement Map")
  .onChange((value) => {
    material.displacementMap = value ? displacementMap : null;
    material.needsUpdate = true;
  });

gui
  .add(settings, "displacementScale", 0, 1, 0.01)
  .name("Displacement Scale")
  .onChange((value) => {
    material.displacementScale = value;
  });

gui
  .add(settings, "showWireframe")
  .name("Show Wireframe")
  .onChange((value) => {
    material.wireframe = value;
  });

// Animate
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Imagine you’re driving down a scenic countryside road. The road isn’t perfectly smooth — it has bumps, cracks, and small potholes. These imperfections aren’t just visual — you can feel them as your car moves up and down.

// You’ve already used a normal map to make the surface look bumpy — but up close, it still feels flat. It’s like a painted illusion — convincing from afar, but lacking real geometry.

// Displacement maps make your 3D surface not only look bumpy — but be bumpy.

// A displacement map is a grayscale texture that tells Three.js how to move the vertices of a mesh.

// White = peaks
// Black = valleys
// Grayscale = varying elevation
// Unlike a normal map, which only tricks the light, displacement maps actually change the shape of the object.

// Notice how the displacement mesh has complex geometry, while the normal-mapped mesh remains flat but visually faked.

// bumpy road example:
// Realistic Depth: Displacement maps create real geometry that works from any angle — even close-up.
// Dynamic Shadows: Since the surface is actually displaced, shadows respond naturally to light and create realism normal maps can't match.

// 💡 Use displacement maps when real geometry is important to the illusion — especially in close-up views or cinematic shots.

// 🧱 Real-Life Scenarios
// Terrain: Use a displacement map to sculpt mountains, cliffs, and valleys with realistic elevation.
// Skin: Add subtle details like wrinkles and pores for close-up character renders.
// Brick Walls: Make bricks actually protrude and recess from the wall — not just look like they do.

// Normal maps fake surface depth visually
// Displacement maps physically modify the geometry
// Used together, they create stunning realism — especially when paired with proper lighting

// displacement maps: this technique gives your objects real geometry, enhances lighting behavior and enables far more immersive detail than a normal map alone.

// Fine-tune the displacement scale
// Interactively toggle maps on and off
// Understand why geometry resolution truly matters
// Whether you’re building a rugged stone wall, a fantasy creature, or a stylized rooftop — this tool gives you the freedom to sculpt with light and pixels.
