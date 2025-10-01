// A shiny metal ball uses a material that reflects light.
// A rough wooden crate uses a material that scatters light.
// A glowing neon sign uses a material that emits light.

// MeshBasicMaterial doesn’t react to light - making it ideal for objects that don’t need shading or shadows
const basicMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00, // Green color
  wireframe: true, // Render as a wireframe
});

// MeshStandardMaterial uses Physically Based Rendering (PBR) to create ultra-realistic surfaces. It can simulate metals, plastics, glass, and more
const standardMaterial = new THREE.MeshStandardMaterial({
  color: 0xffaa00, // Orange color
  roughness: 0.5, // Surface roughness (0 = smooth, 1 = rough)
  metalness: 0.5, // Metalness (0 = non-metal, 1 = metal)
});

// MeshPhysicalMaterial: An extension of MeshStandardMaterial  with additional properties like clearcoat and transmission for advanced effects like clear coatings or thin-film interference.
const physicalMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xffffff, // White color
  clearcoat: 1.0, // Clear coat layer
  clearcoatRoughness: 0.1, // Roughness of the clear coat
});

// A material that uses a MatCap (Material Capture) texture to simulate complex lighting and reflections without needing actual lights in the scene. It’s lightweight and great for stylized or performance-sensitive applications.
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("path.png");
const matcapMaterial = new THREE.MeshMatCapMaterial({
  matcap: matcapTexture,
});

// A material that simulates shiny, reflective surfaces. It supports specular highlights, making it perfect for plastic, metal, or glossy surfaces.
const phongMaterial = new THREE.MeshPhongMaterial({
  color: 0x0000ff,
  specular: 0xffffff,
  shininess: 100,
});

// A cartoon-style material that creates a cel-shaded effect. It uses gradients to simulate a hand-drawn look.
// Cel-shading is a computer graphics technique that makes 3D objects look like they're from a 2D cartoon or comic
const toonMaterial = new THREE.MeshToonMaterial({
  color: 0x00ffff,
  // gradientMap: gradientTexture
});

// Materials are the key to bringing your 3D objects to life. Whether you’re creating a realistic scene, a shiny object, or a playful cartoon, materials give you the tools to make your vision a reality.