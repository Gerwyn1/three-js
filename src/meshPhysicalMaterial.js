// Clearcoat: A thin, reflective layer on top of the material (think of a car’s glossy paint).
// Clearcoat Roughness: Controls how rough or smooth the clearcoat layer is.
// Sheen: Adds a soft, velvety shine to the material (great for fabrics or certain plastics).
// Transmission: Allows light to pass through the material, simulating glass or other transparent surfaces.

// go-to tool for creating ultra-realistic surfaces, from shiny cars to frosted glass.

const material = new THREE.MeshPhysicalMaterial({
  // color...
  // A value between 0 and 1 that controls how much light passes through the material. This is used for simulating glass or other translucent materials.
  transmission: 0.9, // Highly translucent

  // Controls the transparency of the material. A value of 0 makes the material fully transparent, while a value of 1 makes it fully opaque.
  opacity: 0.5, // 50% transparent
  transparent: true, // Enable transparency
  metalness: 0.5, // Semi-metallic surface
  roughness: 0.5, // Semi-rough surface
  // ior (Index of Refraction)
  // Controls how light bends when passing through the material. Common values are: 1.0 for air. 1.5 for glass.
  ior: 1.5, // Glass-like refraction
  // A value between 0 and 1 that controls how reflective the material is. This is useful for simulating highly reflective surfaces like mirrors.
  reflectivity: 0.9, // Highly reflective
  // A value between 0 and 1 that controls the intensity of the clearcoat layer. A clearcoat simulates a thin, reflective layer on top of the material.
  clearcoat: 1.0, // Fully reflective clearcoat
  // Controls the roughness of the clearcoat layer. A value of 0 makes the clearcoat perfectly smooth, while a value of 1 makes it rough.
  clearcoatRoughness: 0.1, // Smooth clearcoat
  // The thickness of the material in the direction of the normal. This is used to simulate subsurface scattering for materials such as marble.
  // how far light can travel *into* the material, measured along the surface normal
  thickness: 0.01, // Thin material,
  // specular: relating to or having the properties of a mirror.
  // Controls the intensity of the specular highlights on the material.
  specularIntensity: 0.8, // Strong specular highlights

});

