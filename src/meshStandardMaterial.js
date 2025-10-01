// MeshStandardMaterial reacts to lights in your scene, allowing you to create effects like metallic surfaces, roughness, and even environment reflections.

// Think of it like this: if MeshBasicMaterial is a plain sheet of paper, MeshStandardMaterial is a polished metal ball or a glossy ceramic vase. It’s all about realism.

import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("path/to/texture.jpg");

const material = new THREE.MeshStandardMaterial({
  // color, wireframe (only the edges of the geometry are drawn.)

  // Controls how rough or smooth the surface appears. A value of 0 makes the surface perfectly smooth (like a mirror), while a value of 1 makes it completely rough (like chalk).
  roughness: 0.5, // Semi-rough surface

  // Determines how metallic the surface appears. A value of 0 makes the surface non-metallic (like plastic), while a value of 1 makes it fully metallic (like polished metal).
  metalness: 0.5, // Semi-metallic surface

  // The color of the material’s glow. This makes the object appear as if it’s emitting light, even though it doesn’t actually illuminate other objects
  emissive: 0x460c1a, // Dark red glow

  // A boolean property that determines whether the material uses flat shading. When set to true, the surface appears faceted instead of smooth.
  flatShading: true, // Use flat shading

  // A texture that can be applied to the material. This allows you to add images or patterns to the surface of the object
  map: texture, // Apply the texture
});


// material.needsUpdate = true → forces Three.js to recompile the material after a significant change.

// depthTest → decides if the object respects depth and hides behind other objects (true) or ignores depth and draws over everything (false).