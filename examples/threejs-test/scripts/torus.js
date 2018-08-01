/* PARAMETERS:
** R = dist from center of tube to center of torus
** r = radius of tube
** detail = amount of vertices in the output array
*/

class Torus {
  constructor(R, r, detail = 32) {
    this.radius = R;
    this.tubeRadius = r;
    this.detail = detail;
    this.vertices = Torus.getVertices(R, r, detail);
  }

  static getVertices(R, r, detail = 32) {
    // empty list
    let vertices = [];
    // iterating through all the thetas
    for (let radian1 = 0; radian1 <= Math.PI * 2; radian1 += Math.PI * 2 / detail) {
      // iterating through all the phis
      for (let radian2 = 0; radian2 <= Math.PI * 2; radian2 += Math.PI * 2 / detail * 10) {
        // appending list with a vector
        vertices.push(Torus.getVector(radian1, radian2));
      }
    }
    return vertices;
  }

  static getVector(theta, phi) {
    // https://en.wikipedia.org/wiki/Torus#Geometry
    return [
      /* x */ ((R + (r * Math.cos(theta))) * Math.cos(phi)).toFixed(6),
      /* y */ ((R + (r * Math.cos(theta))) * Math.sin(phi)).toFixed(6),
      /* z */ (r * Math.sin(theta)).toFixed(6)
    ];
  }
}
