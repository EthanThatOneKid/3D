class Confetti {

  constructor(radius, rgb, pos = {x: 0, y: 0}) {
    this.radius = radius;
    this.rgb = rgb || {r: 255, g: 255, b: 255};
    this.timer = 0;

    this.material = this.createMaterial();
    this.geometry = this.createGeometry();
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.x = pos.x;
    this.mesh.position.y = pos.y;
    this.mesh.position.z = pos.z || Math.random();
  }

	update() {
    this.timer++;
    let timer = this.timer * 0.01;
    /* Desmos Equation: y\ =\ -\sin\left(\frac{2\pi x+\pi}{2}\right) */
    let vel = {
      x: -0.002 * Math.sin((2 * Math.PI * timer + Math.PI) * 0.5),
      y: -0.002
    };
    this.mesh.rotation.y += 0.02;
    this.mesh.position.y += vel.y;
    this.mesh.position.x += vel.x;
	}

  createMaterial() {
    let col2 = JSON.parse(JSON.stringify(this.rgb));
    let rnd = Math.random() * 3;
    if (rnd < 1) col2.r = Math.min(Math.max(parseInt(col2.r + ((rnd) * 50)), 1), 255);
    else if (rnd < 2) col2.g = Math.min(Math.max(parseInt(col2.g + ((rnd) * 50)), 1), 255);
    else col2.b = Math.min(Math.max(parseInt(col2.b + ((rnd - 0.5) * 50)), 1), 255);

    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(`rgb(
        ${Math.floor(Math.random() * Math.abs(this.rgb.r - col2.r) + Math.min(this.rgb.r, col2.r))},
        ${Math.floor(Math.random() * Math.abs(this.rgb.g - col2.g) + Math.min(this.rgb.g, col2.g))},
        ${Math.floor(Math.random() * Math.abs(this.rgb.b - col2.b) + Math.min(this.rgb.b, col2.b))}
      )`)
    });
  }

  createGeometry() {
    let shape = new THREE.Shape();
    shape.lineTo(1,  0);
    shape.lineTo(1,  3);
    shape.lineTo(0, 3);
    let geometry = new THREE.ExtrudeGeometry(shape, /* Extrude Settings */ {
      amount: 1,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 1,
      bevelThickness: 0.2
    });
    geometry.scale(this.radius, this.radius, this.radius);
    return geometry;
  }
}


class ConfettiShower {

  constructor(radius, density, config) {
    this.radius = radius || 0.5;
    this.thresh = density || 3;
    this.theme = config ? config.theme : {r: 255, g: 127, b: 0};
    this.confetties =  [];
    for (let i = 0; i < this.thresh; i++) this.createNewConfetti();
  }

  update() {
    for (let i = this.confetties.length - 1; i >= 0; i--) {
      this.confetties[i].update();
      if (this.confetties[i].mesh.position.y < -1) {
        scene.remove(this.confetties[i].mesh);
        this.confetties.splice(i, 1);
        this.createNewConfetti();
      }
    }
  }

  createNewConfetti() {
    let gimme = new Confetti(0.02,
      this.theme,
      {x: Math.random() - this.radius, y: Math.random()}
    );
    this.confetties.push(gimme);
    scene.add(gimme.mesh);
  }

  changeTheme(theme) {
    this.theme.r = theme.r;
    this.theme.g = theme.g;
    this.theme.b = theme.b;
  }
}
