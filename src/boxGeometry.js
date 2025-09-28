// backbone of any 3D object in three.js (most fundamental and widely used)
// simple cube, a rectangular prism, or even a complex structure made up of multiple boxes

// BoxGeometry is a geometry class to create 3D box (or rectangular prism)
// collection of vertices, edges, and faces that form a six-sided 3D shape
// Each side of the box is a rectangle, and together they create a cuboid

// three dimensions are equal -> a perfect cube.
import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry(2, 1, 3); // Width = 2, Height = 1, Depth = 3
const geometrySmooth = new THREE.BoxGeometry(1, 1, 1, 3, 3, 3); // More segments for smoother deformation or textures
const material = new THREE.MeshBasicMaterial({ color: "lime", wireframe: true });
const mesh = new THREE.Mesh(geometrySmooth, material);
scene.add(mesh);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// BoxGeometry constructor: accepts additional parameters to control the number of segments along each dimension (width, height, depth)
// These segments determine how many subdivisions the box has, which can be useful for creating more complex shapes or applying detailed textures

// new THREE.BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments);

// widthSegments: Number of subdivisions along the width (default is 1).
// heightSegments: Number of subdivisions along the height (default is 1).
// depthSegments: Number of subdivisions along the depth (default is 1).

// Deformation in animation is about changing the shape of an object over time

// cube:
// number of vertices per side = (2 + number of segments - 1) multiply by itself?
// number of faces per side = number of segments multiply by itself then multiply by 2?

// new THREE.BoxGeometry(1, 1, 1, 3, 3, 3);
// Each edge of the box is subdivided into 3 segments.
// Now each side of the cube has many smaller squares (each split into 2 triangles).
// That means way more vertices and faces.

// Increasing segments gives you more geometry detail to work with.

// Smooth deformation (morphing/animation)
// If you want to bend, twist, or apply physics to a cube, you need more vertices.
// With only corner vertices, you can’t bend a cube — it will stay rigid
// With subdivisions, it can bend smoothly.

// Texture mapping
// If you apply a displacement map (a texture that pushes vertices up/down), you need enough vertices to displace.
// Example: A heightmap terrain won’t look bumpy if you only have 1 segment. More segments = finer detail.

// Lighting/shading
// More segments give more surface normals, which can make lighting look smoother or more accurate.

// Subdivision surfaces
// If you plan to use modifiers (like subdivision or smoothing), starting with more segments helps preserve the shape.

// 🔹 Example visualization

// Imagine a balloon:
// With only 6 patches (like a cube), it looks blocky.
// With 100 patches, it looks rounder and smoother.

// Segments = how many patches you divide the surface into.

// 👉 So in short:
// Subdivisions = how many times the geometry is split into smaller pieces. More segments = more detail, smoother deformations, better displacement/lighting — but also heavier performance cost.

// What does it mean when height map is all "high". : r/3DprintingA heightmap is a grayscale image where pixel brightness represents elevation, with white pixels indicating high points and black pixels indicating low points. In computer graphics, heightmaps are used to create the illusion of 3D topography on flat surfaces, allowing for detailed terrains and textures by displacing the geometry or influencing lighting. They can also be used to store real-world surface elevation data or to represent the height variance of a 3D printer bed.

// recap: You can subdivide the box into segments for smoother surfaces or better texture mapping.

// BoxGeometry: Essential for creating 3D scenes & building complex structures
