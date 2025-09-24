import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Canvas
const canvas = document.querySelector("canvas.world");
// Create a scene
const scene = new THREE.Scene();

// let's more deep-dive in camera properties
const camera = new THREE.PerspectiveCamera(
  75, // Field of view (FOV) in degrees, controls the vertical angle of the camera's view.
  // A lower FOV (around 30-45 degrees) creates a zoomed-in,  often used in first-person games or for detailed object viewing.
  // first-person games => https://www.google.com/search?sca_esv=1df9984c226b3a13&sxsrf=ACQVn09HKlVpUTAkwHnjQW_VJUYDKrOgnw:1713850793478&q=first+person+game+example&uds=AMwkrPudipM4cMnOwQU2hcq8Ehq8se7KvofUW_i1tfkuIuu7q221hTvGDlmb_PGugGFbd15z-OEEGCPYaF0C89zlRr5xQxR4oIIyuOz8jakAhb3r5c7jmFfkGnsr82YgR7mAUswRO34D_7fWNfq9wXBkwMOVPiJWUIcJBMwJLH9Or9oJ-fVzv_R6K0fWrWE_UNzBx04BgeZjHDuYh3NUo3W4_5Aq9p56tUMIQUb6ppT9nRDgaFGubnkSCfolO0BDkTRv2gK80q4BQnfiOpDin_if6l9tBVZV8t0So67DbEt7gbybw0s8n8ATTAkriPhQAW42pW-eMH2d&udm=2&prmd=ivsnbmtz&sa=X&ved=2ahUKEwjq4_jdz9eFAxXwbWwGHc9mDNQQtKgLegQIChAB&biw=1496&bih=847&dpr=2
  // A higher FOV (around 60-90 degrees) offers a wider view, suitable for showcasing entire environments or creating a more immersive experience.
  // immersive exp => https://www.google.com/search?q=immersive+experience&sca_esv=1df9984c226b3a13&udm=2&biw=1496&bih=847&sxsrf=ACQVn0-dJ_Lw9VBtAguJQxY2-DRxHaXnTQ%3A1713850868441&ei=9EknZvbAGrLhseMP8J-IkAY&oq=immersive+e&gs_lp=Egxnd3Mtd2l6LXNlcnAiC2ltbWVyc2l2ZSBlKgIIADIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgARIljtQvQhYlDJwC3gAkAEAmAGfAqABwBuqAQYwLjE1Lja4AQHIAQD4AQGYAhigAtMYwgIEECMYJ8ICCBAAGIAEGLEDwgIEEAAYA8ICChAAGIAEGEMYigWYAwCIBgGSBwY3LjExLjagB9Ng&sclient=gws-wiz-serp#imgrc=ZcFqHG0m5daGLM&imgdii=futFmZwHBk6gOM
  window.innerWidth / window.innerHeight, // Aspect ratio, which matches the browser window's dimensions. This ensures objects don't appear stretched or distorted
  0.1, // Near clipping plane (objects closer than this will be invisible) , for example => if the object is placed at z < 0.1, it will be invisible
  1000 // Far clipping plane (objects farther than this will be invisible) , for example => if the object is placed at z > 1000, it will be invisible
  // They are like our eyes -> if we put an object too close to our eyes , we can't see right. So this is the similar process of our our eyes work in a real life
  // Setting appropriate clipping planes helps avoid rendering unnecessary objects and improves performance.
); // creates a perspective camera object
// set the camera position, if not you will see nothing(actually you are inside the red box) bec default is at 0,0,0
camera.position.z = 3;
// camera.position.x = 2; // move to right -> +
// camera.position.y = -2; // move to down -> -
// play around with the values to show that which direction is positive and negative

// Look towards a specific point <- we can use this in later lesson in avatar models
const target = new THREE.Vector3(0, 0, 0); // Target point
camera.lookAt(target); // Make camera look at the target point
// wherever the camera pos/rotation is, if we use lookAt, camera will focus on that point

scene.add(camera); // add the camera to the scene

// Create a renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);

// Create a cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add OrbitControls to the camera

// this is the official doc for OrbitControls - https://threejs.org/docs/#examples/en/controls/OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
// Orbit: Left mouse button or drag on touch screen to rotate around the target point.
// Pan: Right mouse button or two-finger drag to pan the camera across the scene.
// Zoom: Mouse scroll wheel or pinch gesture to zoom in and out.

// Target: The camera orbits around a specific point in the scene.
// By default, this point is set to (0, 0, 0). You can change the target point using the target property of the OrbitControls object:
// controls.target.set(1, 2, 3); // play around with target

// Enabled/Disabled: You can enable or disable specific controls using properties like enableRotate, enablePan, and enableZoom.
// controls.enableRotate = false; // Disable rotation
// controls.enablePan = false; // Disable panning
// controls.enableZoom = false; // Disable zooming

// Damping: Controls can be configured to have a smooth, dampened feel when interacting.
// Properties like autoRotate, enableDamping, and dampingFactor control this behavior.
// controls.enableDamping = true; // Enable damping => smooth rotation
// controls.dampingFactor = 0.1; // Default is 0.05 -> Note that for this to work, you must call .update () in your animation loop.
// controls.autoRotate = true; // Auto rotate
// controls.autoRotateSpeed = 1.0; // Default is 2.0, which equates to 30 seconds per orbit at 60fps.

// Min and Max Distance: Set the minimum and maximum zoom distance for the camera.
// these will prevent the camera from getting too close or too far from the target.
// controls.minDistance = 2; // Minimum zoom distance of 2 units
// controls.maxDistance = 10; // Maximum zoom distance of 10 units

// Min and Max Polar Angle: Limit the vertical rotation of the camera.
// This can be useful to restrict the camera from looking directly above or below the scene.
// This will be hard as first, but later we will ues to it, it's so useful to know
// controls.minPolarAngle = Math.PI / 3; // Minimum vertical angle of 60 degrees
// controls.maxPolarAngle = Math.PI / 2; // Maximum vertical angle of 90 degrees

// Min and Max Azimuth Angle: Limit the horizontal rotation of the camera.
// This can be useful to restrict the camera from looking too far to the left or right.
// controls.minAzimuthAngle = -Math.PI / 4; // Minimum horizontal angle of -45 degrees
// controls.maxAzimuthAngle = Math.PI / 4; // Maximum horizontal angle of 45 degrees

// this is the official example of OrbitControls - https://threejs.org/examples/#misc_controls_orbit

// there are many properties and methods to use, you should check the official doc for more information

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Update the controls
  renderer.render(scene, camera);
}
animate();
