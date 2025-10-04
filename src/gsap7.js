import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Line, BufferGeometry, LineBasicMaterial, Vector3 } from "three";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Canvas & Scene
const canvas = document.querySelector("canvas.world");
const scene = new THREE.Scene();
scene.fog = new THREE.Fog("#000000", 10, 30);

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 10);
scene.add(camera);

// Renderer & Controls
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
const controls = new OrbitControls(camera, renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(ambientLight, pointLight);

// Central Cube
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(2.5, 2.5, 2.5),
  new THREE.MeshStandardMaterial({ color: 0x00ffcc, emissive: 0x008877 })
);
scene.add(cube);

// Monitors (Optional)
const monitorGeometry = new THREE.PlaneGeometry(2, 1.2);
const monitorMaterial = new THREE.MeshStandardMaterial({ color: 0x111111 });
const monitor1 = new THREE.Mesh(monitorGeometry, monitorMaterial);
const monitor2 = new THREE.Mesh(monitorGeometry, monitorMaterial);
monitor1.position.set(-3, 2, -2);
monitor2.position.set(3, -1, -1);
scene.add(monitor1, monitor2);

// Scroll Area
const scrollArea = document.createElement("div");
scrollArea.classList.add("scroll-area");
scrollArea.style.height = "300vh";
document.body.prepend(scrollArea);

// 📽️ Bezier Camera Animation
gsap.to(camera.position, {
  scrollTrigger: {
    trigger: ".scroll-area",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: () => camera.lookAt(cube.position),
  },
  duration: 2,
  motionPath: {
    path: [
      { x: 0, y: 14, z: 10 },
      { x: 4, y: 2, z: 6 },
      { x: -3, y: 1, z: 3 },
      { x: 0, y: 0, z: 5 },
    ],
    curviness: 1.25,
    autoRotate: false,
  },
  ease: "power1.inOut",
});

// Animate
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// The camera follows a curved path. The points are fed into motionPath, and GSAP smoothly moves the camera through them.

// The yellow curve is drawn using Line. This shows the exact path — like a rollercoaster rail.
// The camera stays focused on the cube. We call camera.lookAt(cube.position) on every scroll update.

// We didn’t just learn how to move the camera… we told stories with it.
// From smooth dolly zooms to Bezier flythroughs, — you’ve now got the tools to turn your scenes into cinematic experiences.

// By using GSAP’s MotionPathPlugin and ScrollTrigger, you learned how to animate the camera with intention —
// not just placing it somewhere, but guiding it through space like a director behind the lens.

// And the coolest part?

// You saw how scroll can drive camera motion, how to focus on key elements with lookAt(). At this point, your camera isn’t just a viewpoint — it’s a character in your scene.

// So whether you’re building a landing page, a 3D showcase, or an interactive story —
// you now know how to make your camera lead the journey.

// Onward to the next chapter — you've got some cinematic magic under your belt now 🚀
