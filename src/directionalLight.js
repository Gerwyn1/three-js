import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import GUI from "lil-gui";

const gui = new GUI();

const settings = {
  wireframe: false,
  visibleToggle: function () {
    sphere2.visible = !sphere2.visible;
  },
  targetSphere2: function () {
    // if we click the button, the light will automatically shift the direction of the light to sphere 2
    //This means that its direction is calculated as pointing from the light's position to the target's position (as opposed to a 'Free Direct Light' that just has a rotation component).
    directionalLight.target = sphere2;
  },
  meshColor: "#003049",
  lightColor: "#312dfb",
  intensity: 16.81,
  posX: 2, // Add a number property
  posY: 1, // Add a number property
  posZ: 4, // Add a number property
  // we will add rotation properties bec we want to show that lights are not effected by rotation
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
};

gui.add(settings, "wireframe");
gui.add(settings, "visibleToggle");
gui.add(settings, "targetSphere2");
gui.addColor(settings, "meshColor");
gui.addColor(settings, "lightColor");
gui.add(settings, "intensity", 0, 50, 0.01);

const positionFolder = gui.addFolder("Position");
positionFolder.add(settings, "posX", -10, 10, 0.01);
positionFolder.add(settings, "posY", -10, 10, 0.01);
positionFolder.add(settings, "posZ", -10, 10, 0.01);

const rotationFolder = gui.addFolder("Rotation");
rotationFolder.add(settings, "rotationX", -Math.PI, Math.PI, 0.01);
rotationFolder.add(settings, "rotationY", -Math.PI, Math.PI, 0.01);
rotationFolder.add(settings, "rotationZ", -Math.PI, Math.PI, 0.01);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;
camera.position.y = 8;
camera.position.x = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight("0xffffff", 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight("#caf0f8", 5);
scene.add(directionalLight);
directionalLight.position.set(2, 1, 4);

const target = new THREE.Object3D();
target.position.set(0, 0, 0);
directionalLight.target = target;
scene.add(target);

// The Helper is like a rectangle with pivot stick
const helper = new THREE.DirectionalLightHelper(directionalLight, 1);
scene.add(helper);

// sphere
const geometry = new THREE.SphereGeometry(1, 16, 16, 0, Math.PI * 2, 0, Math.PI);
const material = new THREE.MeshStandardMaterial({ color: "red" });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
sphere.position.x = 4;

// cylinder
const cylinderGeometry = new THREE.CylinderGeometry();
const cylinderMaterial = new THREE.MeshStandardMaterial({ color: "purple" });
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
scene.add(cylinder);
cylinder.position.x = 1;

// cube
const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshStandardMaterial({ color: "pink" });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);
cube.position.x = -2;

// sphere 2
const sphere2Geometry = new THREE.SphereGeometry(1, 16, 16, 0, Math.PI * 2, 0, Math.PI);
const sphere2Material = new THREE.MeshStandardMaterial({ color: "#001828" });
const sphere2 = new THREE.Mesh(sphere2Geometry, sphere2Material);
scene.add(sphere2);
sphere2.position.x = -5;

// plane | floor
const planeGeometry = new THREE.PlaneGeometry(20, 15, 16, 16);
const planeMaterial = new THREE.MeshStandardMaterial({ color: "#1A2114", side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = Math.PI / 2; // Rotates the plane to lie flat on the ground
plane.position.y = -2; // lower it as a floor

function animate() {
  requestAnimationFrame(animate);

  helper.update();

  sphere2.material.wireframe = settings.wireframe;
  sphere2.material.color.set(settings.meshColor);
  directionalLight.color.set(settings.lightColor);
  directionalLight.intensity = settings.intensity;
  directionalLight.position.x = settings.posX;
  directionalLight.position.z = settings.posZ;
  directionalLight.position.y = settings.posY;

  // there is no rotation value in the Light in ThreeJs.
  directionalLight.rotation.x = settings.rotationX;
  directionalLight.rotation.y = settings.rotationY;
  directionalLight.rotation.z = settings.rotationZ;

  // animate the light
  // Animate the light position x to move left and right
  // The Math.sin() function will generate a value between -1 and 1
  // multiplying it by 10 will give us a range of -10 to 10
  // this will make the light move in a left to right direction
  // the Date.now() will give us the current time in milliseconds
  // multiplying it by 0.001 will give us a slow movement

  directionalLight.position.x = Math.cos(Date.now() * 0.001) * 10;
  directionalLight.position.z = Math.sin(Date.now() * 0.001) * 10;

  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// You’ve now added a DirectionalLight to your Three.js scene, giving your 3D objects a sense of depth and realism.
