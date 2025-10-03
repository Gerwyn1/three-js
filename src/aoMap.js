// The real world has shadows everywhere.
// Not just the big dramatic ones from a light source, but soft, subtle ones that happen where light struggles to reach — like:

// The crease in your palm
// The edge where a cup touches the table
// The space under your eye
// The gap between stacked tiles or coins
// These shadows are barely noticeable at first glance — but without them, everything feels... fake.

// So How Do We Fake These Shadows?
// We bake them.
// We calculate how occluded (blocked) each part of the model is from ambient light, and we save that info into a black-and-white image:

// We’re not adding new lights.
// We’re just telling the renderer:

// "Hey, treat this crevice like it’s in a darker place. Don’t blast it with ambient light."

// aoMaps just sit quietly in your material — doing the hard work of selling depth.
// But once you turn them off?
// Your whole model feels like it’s in a blank white box.

// 💡 Focus on where pieces meet — like seams, corners, or curved details. That’s where AO does its best work.
// With AO: Shadow hugs the curves and cavities
// Without AO: Everything looks equally flat

// Ambient Occlusion isn’t flashy. It won’t make your scene explode with color.

// But when it’s missing, your viewer feels it — even if they don’t know why.

// AO maps fill the silence between surfaces
// They give weight to floating objects
// They let your models rest in their world
// It’s not about adding more — It’s about subtracting brightness where light doesn’t belong.

// So next time your model feels too clean, too flat, too CG… don’t just add another light.

// Try adding a shadow that doesn’t come from one. Try ambient occlusion.

const material = new THREE.MeshStandardMaterial({
  map: colorMap,
  aoMap: aoMap,
  aoMapIntensity: 1,
});

// Next up, we’ll explore Emissive Maps — to make your objects glow from within, like neon signs, lava, or magical runes. 🔥
