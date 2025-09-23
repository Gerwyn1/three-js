// perspective camera -> realism and depth

// orthographic camera -> opposite of perspective camera (flat, clean and super precise)
// blueprints, maps, isometric game views like sim city or diablo
// does not mimic how human eyes work
// orthographic projection: objects won't shrink or grow as they get closer or further away from camera
// everything stays the same size. useful for precise layouts or top-down views.
// everything to feel flat and scale equally: 2D games, technical drawing or map, or crisp isometric style for ui/games
import "./style.css";
import * as THREE from "three";

const canvas = document.querySelector("canvas.world");

const scene = new THREE.Scene();
scene.background = new THREE.Color("orange");

const aspectRatio = window.innerWidth / window.innerHeight;

const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100);
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.z = 3;
camera.position.x = -1;
camera.position.y = 1;
camera.lookAt(new THREE.Vector3(0, 0, 0));

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "magenta" });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

renderer.render(scene, camera);

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// define edges of camera view instead of FOV

// in the world of 3D graphics: the name for a chunk of space that the camera can see, is called "frustum".
// PerspectiveCamera: The "frustum" is shaped like a pyramid.
// OrthographicCamera: The "frustum" is shaped like a rectangular box. the box defines exactly what's visible in the scene.

// const orthographic = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100);
// 6 numbers: left, right, bottom top, near, far
// how far it can see to the left
// how far it can see to the right
//  how high it can see
//  how low it can see
// how close the objects need to be visible
// how far away they can be before disappearing
// Uses the frustum instead of FOV

// aspect ratio makes sure camera view matches shape of your screen
// multiply left & right by aspect ratio to avoid distortion, and just like other cameras, we can move it, animate objects

// Use Orthographic Camera for clean flat visuals.
