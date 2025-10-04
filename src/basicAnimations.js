// spinning cube, a bouncing ball, or a flying spaceship in a 3D scene, you’ve witnessed animation in action

// Animation is the illusion of movement and in JavaScript, this is achieved by repeatedly updating the visual state of an object over time. That might mean changing its:

// Position
// Rotation
// Scale
// Opacity
// But if we update too slowly or inconsistently... the motion breaks.

// requestAnimationFrame(animate);

// “Call this function every time you’re about to repaint the screen.”

// ✅ Syncs with your monitor's refresh rate (usually 60 FPS)
// ✅ Automatically pauses in inactive tabs
// ✅ Makes animations smoother and more efficient

// ⏱ deltaTime = frame-to-frame time difference
// This lets you move an object per second rather than per frame.

// Three.js gives us a helpful built-in utility:

// const clock = new THREE.Clock();
// It tracks time between frames using:

// const elapsedTime = clock.getElapsedTime(); // Total time
// const deltaTime = elapsedTime - oldTime; // Time difference

import "./style.css";
import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: "green" });

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - (clock.oldTime || 0); // 0.016s per frame

  cube.rotation.y += 1 * deltaTime; // 0.016 radians per frame (1 radian per second)

  clock.oldTime = elapsedTime;
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ### Step 1: deltaTime
// Still the same. At ~60 FPS,
// deltaTime ≈ 0.016 seconds

// ### Step 2: Interpret the `2`

// * `2` means **2 radians per second**.
// * This is your new angular velocity.
// * Compare:

//   * `1` meant → 1 radian per second.
//   * `2` means → **double the speed** → 2 radians per second.

// ### Step 3: Multiply by deltaTime

// Each frame, you compute:

// 2 (radians/second) × 0.016 (seconds) = 0.032 radians

// So now, every frame adds **0.032 radians** of rotation instead of 0.016.

// ---

// ### Step 4: Over 1 second

// At ~60 FPS:

// ```
// 0.032 radians/frame × 60 frames ≈ 1.92 radians
// ```

// Which is ~2 radians (a little less if FPS isn’t exact).
// That matches your chosen speed: **2 radians per second**.

// ---

// ### Step 5: Convert to degrees (for intuition)

// * 1 radian ≈ 57.3°
// * 2 radians ≈ 114.6°

// So:

// * With `1`: cube spins ~57° every second.
// * With `2`: cube spins ~115° every second (about twice as fast).

// ---

// ✅ **Summary of what changed by using `2` instead of `1`:**

// * You doubled the angular velocity.
// * Therefore, per frame, the cube rotates ~0.032 radians instead of 0.016 (assuming 60 FPS).
// * Per second, the cube rotates ~114° instead of ~57°.

// Try modifying the cube’s rotation on the X-axis. Or animate its scale using deltaTime. In the next lessons, we’ll explore:

// Multiple object animations
// Interpolating with GSAP
// Camera animation
