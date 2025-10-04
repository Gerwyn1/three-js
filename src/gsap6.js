import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Canvas
const canvas = document.querySelector("canvas.world");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75, // Starting FOV (wide angle)
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 10);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Center Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff99 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Floating Cards
const cardGeometry = new THREE.BoxGeometry(2, 2, 0.1);
const cardMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

const card1 = new THREE.Mesh(cardGeometry, cardMaterial);
card1.position.set(-3, 1, -1);

const card2 = new THREE.Mesh(cardGeometry, cardMaterial);
card2.position.set(3, -1, 0.5);

scene.add(card1, card2);

// Lights
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
const point = new THREE.PointLight(0xffffff, 100);
point.position.set(5, 5, 5);
scene.add(ambient, point);

// Scroll Area
const scrollArea = document.createElement("div");
scrollArea.classList.add("scroll-area");
scrollArea.style.height = "200vh";
document.body.prepend(scrollArea);

// Animate: Dolly Zoom Effect
gsap.to(camera.position, {
  z: 1,
  duration: 2,
  ease: "power2.inOut",
  scrollTrigger: {
    trigger: ".scroll-area",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: () => {
      // Narrow the FOV as we get closer
      camera.fov = 75 - (camera.position.z - 4) * 4;
      camera.updateProjectionMatrix();
      camera.lookAt(cube.position);
    },
  },
});

// Extra: Cards animation
gsap.to(card1.rotation, {
  y: Math.PI,
  scrollTrigger: {
    trigger: ".scroll-area",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
  },
});

gsap.to(card2.position, {
  y: 2,
  scrollTrigger: {
    trigger: ".scroll-area",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
  },
});

// Animate Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
