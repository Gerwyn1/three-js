import * as THREE from "three";

export function createCustomShape(
  vertices,
  indices,
  { color = 0x00ff00, wireframeColor = 0xff0000, doubleSided = false, wireframe = false } = {}
) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vertices), 3));
  geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(indices), 1));
  geometry.computeVertexNormals(); // useful if you later use lighting

  const material = new THREE.MeshBasicMaterial({
    color,
    side: doubleSided ? THREE.DoubleSide : THREE.FrontSide,
    wireframe,
  });

  const wireframeMaterial = new THREE.LineBasicMaterial({ color: wireframeColor });

  const mesh = new THREE.Mesh(geometry, material);
  const outline = new THREE.LineLoop(geometry, wireframeMaterial);

  return { mesh, outline };
}

export class CustomShape {
  constructor(
    vertices,
    indices,
    { color = 0x00ff00, wireframeColor = 0xff0000, doubleSided = false, wireframe = false } = {}
  ) {
    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vertices), 3));
    this.geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(indices), 1));
    this.geometry.computeVertexNormals(); // useful if you later use lighting

    this.material = new THREE.MeshBasicMaterial({
      color,
      side: doubleSided ? THREE.DoubleSide : THREE.FrontSide,
      wireframe,
    });
    this.wireframeMaterial = new THREE.LineBasicMaterial({ color: wireframeColor });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.outline = new THREE.LineLoop(this.geometry, this.wireframeMaterial);
  }
}

export function generatePolygon(n, radius = 1) {
  const vertices = [];
  const indices = [];

  // Generate vertices (all lie on a circle in the XY plane, z = 0)
  for (let i = 0; i < n; i++) {
    const angle = (i / n) * Math.PI * 2; // full circle
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    vertices.push(x, y, 0); // (x, y, z)
  }

  // Indices (triangulate using a fan method)
  for (let i = 1; i < n - 1; i++) {
    indices.push(0, i, i + 1);
  }

  return { vertices, indices };
}

// Triangle 
// Quadrilateral → generatePolygon(4)
// Pentagon → generatePolygon(5)
// Hexagon → generatePolygon(6)
// Heptagon → generatePolygon(7)
// Octagon → generatePolygon(8)
// Nonagon → generatePolygon(9)
// Decagon → generatePolygon(10)
// Hendecagon → generatePolygon(11)
// Dodecagon → generatePolygon(12)