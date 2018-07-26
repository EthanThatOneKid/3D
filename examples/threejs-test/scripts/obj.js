// https://threejs.org/docs/#api/core/Geometry

function createObj(vertices) {
  let geometry = new THREE.Geometry();

  for (let i = 0; i < vertices.length; i++) {

    geometry.vertices.push(
      new THREE.Vector3(
        vertices[i].x,
        vertices[i].y,
        vertices[i].z
      )
    );

    if (i % 3 == 0) {
      geometry.faces.push(
        new THREE.Face3(
          i - 3,
          i - 2,
          i - 1
        )
      );
    }
  }

  return geometry;
}
