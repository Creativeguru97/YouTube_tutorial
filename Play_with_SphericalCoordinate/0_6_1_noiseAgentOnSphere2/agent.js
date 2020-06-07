class Agent{
  constructor(){
    this.position = createVector();
    this.theta = random(0, 180);
    this.phi = random(0, 360);
    this.noiseScale = 300;
    this.noiseStrength = 10;
    this.stepSize = random(5, 10);
    this.ribbon = new Ribbon3d(this.position, int(random(10, 20), 190));
  }

  show(){
    this.ribbon.drawLineRibbon(5.0);
    // stroke(200, 100, 100);
    // point(this.position.x, this.position.x, this.position.x);
  }

  move(){
    this.angle = noise(this.theta / this.noiseScale, this.phi / this.noiseScale);
    // this.theta += map(this.angle, 0, 1, -0.5, 0.5)*this.stepSize;
    // this.phi += map(this.angle, 0, 1, -0.5, 0.5)*this.stepSize;

    this.theta += sin(this.angle)*20;
    this.phi += cos(this.angle);

    // console.log(sin(this.angle));

    this.position.x = r * sin(this.theta) * cos(this.phi);
    this.position.y = r * sin(this.theta) * sin(this.phi);
    this.position.z = r * cos(this.theta);

    this.ribbon.update(this.position);
  }
}
