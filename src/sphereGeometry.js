import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true }); // antialias -> smooths jagged edges on rendered objects
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// It shines light in a single direction, with parallel rays.
// It doesn’t fade with distance (unlike a point light).
// Lights are invisible objects.
// If your scene has no meshes with materials that respond to light (e.g. MeshStandardMaterial, MeshLambertMaterial), you won’t see any effect. Materials like MeshBasicMaterial ignore lights completely.
const light = new THREE.DirectionalLight(0xffffff, 1);
// lookAt() doesn’t move the light.
light.position.set(2, 3, 4); // shines from (2,3,4) toward the origin
scene.add(light);

const controls = new OrbitControls(camera, renderer.domElement);

const material = new THREE.MeshBasicMaterial({ color: "0x8ec5fc", wireframe: true });

// geometry settings
const params = {
  radius: 1,
  widthSegments: 32,
  heightSegments: 32,
  phiStart: 0,
  phiLength: Math.PI * 2,
  thetaStart: 0,
  thetaLength: Math.PI,
};

let mesh;
let geometry;

// const geometry = new THREE.SphereGeometry(1, 32, 32, 0, Math.PI * 2, 0, Math.PI);
// Sphere with 32 segments along its width and height, resulting in a smooth appearance.
// const sphere = new THREE.Mesh(geometry, material);
// scene.add(sphere);

function createSphere() {
  // memory management and avoiding duplicate objects
  // avoid performance drops + memory leaks.
  // cleans up the old sphere before making a new one.
  if (mesh) {
    // tells WebGL to free the GPU memory of the old geometry (otherwise, even if you remove the mesh from the scene, the GPU would still hold onto it).
    geometry.dispose();
    // ensures the old sphere disappears visually
    scene.remove(mesh);
  }

  geometry = new THREE.SphereGeometry(
    // ...Object.values(params)
    params.radius,
    params.widthSegments,
    params.heightSegments,
    params.phiStart,
    params.phiLength,
    params.thetaStart,
    params.thetaLength
  );
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}
createSphere();

// GUI
// Makes a floating panel for controllers on the web
// lil-gui gives you an interface for changing the properties of any JavaScript object at runtime
const gui = new GUI();
// params/geometry settings, params/geometry props, min, max, onchange value, geometry creation function (also involves removal before creation)
gui.add(params, "radius", 0.1, 5, 0.1).onChange(createSphere);
gui.add(params, "widthSegments", 3, 64, 1).onChange(createSphere);
gui.add(params, "heightSegments", 2, 64, 1).onChange(createSphere);
gui.add(params, "phiStart", 0, Math.PI * 2, 0.01).onChange(createSphere);
gui.add(params, "phiLength", 0, Math.PI * 2, 0.01).onChange(createSphere);
gui.add(params, "thetaStart", 0, Math.PI, 0.01).onChange(createSphere);
gui.add(params, "thetaLength", 0, Math.PI, 0.01).onChange(createSphere);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  // sphere.rotation.x +=.005
  // sphere.rotation.y +=.005
  renderer.render(scene, camera);
}
animate();

// phiStart: starting/expanding points, defaults at west point
// phiLength: How much of the sphere you keep around horizontally

// thetaStart says where, vertically, to begin drawing the sphere.
// 0 = start at the top pole (North Pole).
// Math.PI / 2 = start at the equator.
// Math.PI = start at the bottom pole.

// thetaLength: How much of the sphere you keep from top to bottom.

// Creative possibilities from sphere geometry: planet, a ball, or an abstract art piece etc

// MeshBasicMaterial
// Ignores lights completely.
// Always shows its color or texture at full brightness.
// Good for things like backgrounds, UI-like overlays, or “self-lit” objects (like holograms, neon signs, or stars).

// MeshStandardMaterial (and Lambert, Phong, Physical, etc.)
// Responds to lighting.
// Needs at least one light source (DirectionalLight, PointLight, SpotLight, HemisphereLight, etc.) to be visible properly.
// Shows shading, highlights, and more realistic effects (metalness, roughness).
// So if you only use MeshStandardMaterial and no lights, everything will look completely black.

// Does the light color overwrite or blend with the mesh color? YES.

// visual debugging
// When you use DirectionalLightHelper, internally it forces the target’s world matrix to update, so the light points correctly.
// Without the helper, that update never happens, so the light keeps aiming at its default (0,0,0), and your sphere at (2,3,4) doesn’t get lit.
// square plane is starting/emitting point of light

// const helper = new THREE.DirectionalLightHelper(light, 1);
// scene.add(helper);

// const light = new THREE.DirectionalLight(0xffa500, 1);
// light.position.set(0, 0, 0); // from this position
// light.target.position.set(2, 3, 4); // shine toward this object/point
// scene.add(light.target); (required if light helper not present)
// scene.add(light);

// const testMaterial = new THREE.MeshStandardMaterial({ color: 'lime',  }); // require light to be seen

// optional: manually add the target to the scene if you’re not using the helper.
// const target = new THREE.Object3D();
// target.position.set(0, 0, 0); // aim at the sphere
// scene.add(target);

// light.target = target; // assign it
// scene.add(light);
