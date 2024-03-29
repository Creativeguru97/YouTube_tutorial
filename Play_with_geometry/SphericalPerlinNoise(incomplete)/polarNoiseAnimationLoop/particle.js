class Particle {
  constructor() {
    this.xNoise = new NoiseLoop(0.5, -width, width * 2);
    this.yNoise = new NoiseLoop(0.5, -height, height * 2);
    this.dNoise = new NoiseLoop(7, 10, 120);
    this.rNoise = new NoiseLoop(7, 160, 260);
  }

  render(a) {
    noStroke();
    let x = this.xNoise.value(a);
    let y = this.yNoise.value(a);
    let d = this.dNoise.value(a);
    let r = this.rNoise.value(a);
    fill(r, 50, 100, 200);
    ellipse(x, y, d);
  }
}
