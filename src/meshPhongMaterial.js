// MeshPhongMaterial reacts to lights in your scene, allowing you to create effects like specular highlights (those bright spots you see on shiny objects).

// MeshPhongMaterial is a glossy magazine cover. It’s perfect for creating objects like plastic, metal, or anything with a bit of shine.

// Specular HighlightsSimulates shiny spots on the surface.
// Light ResponsiveReacts to lights in the scene.
// Performance-FriendlyMore efficient than PBR materials.
// CustomizableOffers properties like shininess, specular, and emissive for fine-tuning.

// emissive - Adds a glow to the material, as if it’s emitting its own light. It’s great for creating effects like neon lights.
// specular - This property controls the color of the specular highlights (the shiny spots)
// shininess - Controls how sharp or diffuse the specular highlights are. A higher value makes the highlights sharper, while a lower value makes them more spread out.

const material = new THREE.MeshPhongMaterial({
  emissive: 0x00ff00, // Green glow (its own light or glow)
  specular: 0xffffff, // White specular highlights (shiny spots)
  shininess: 100, // Sharp specular highlights (spread out to sharper)
  opacity: 0.5, // 50% transparent
  transparent: true, // Enable transparency
  flatShading: true, // Use flat shading
  reflectivity: 0.9, // Highly reflective
  refractionRatio: 0.98, // Slight refraction
});

const material2 = new THREE.MeshBasicMaterial({
  envMap: envMap,
  refractionRatio: 0.98,
  reflectivity: 0.9
});


// Flat shading gives the object a faceted, low-poly look, while smooth shading makes it appear more rounded.

// 🌍 What’s an environment map?

// An environment map is a texture that represents the surrounding environment (sky, room, outdoor scene, etc.) and is used to simulate reflections and refractions on materials.

// Think of it like wrapping your 3D object in a panoramic image of the world around it, so shiny or transparent surfaces can "reflect" or "refract" that scene.

// Common formats:

// Cube maps → 6 textures (like a cube surrounding the scene).

// Equirectangular maps → one panoramic texture.

// Example:

// A chrome ball looks shiny because it reflects the environment map.

// A glass sphere bends and distorts the environment map, simulating refraction.

// 🔎 What is refractionRatio?

// In MeshPhongMaterial or MeshBasicMaterial (with envMap set), you can enable refraction.

// refractionRatio controls how much the environment map is bent when seen through a transparent object.

// The value is between 0.0 and 1.0 (in Three.js).

// It’s a simplified version of IOR (index of refraction) used in physics.

// Smaller values = stronger bending (more distortion).

// Larger values (close to 1.0) = weaker bending (looks almost like clear glass).