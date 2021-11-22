class Agent{
  constructor(){
    this.position = createVector();
    this.theta = random(0, 180);
    this.phi = random(0, 360);
    this.speed = random(0.05, 0.5);
    this.noiseScale = 300;
    this.noiseX = 0;
    this.noiseY = 0;
    this.noiseZ = 0;
    this.noiseZoffset = 0;
    this.stepSize = random(0.1, 0.3);
    this.ribbon = new Ribbon3d(int(random(10, 20), 190));
    this.offset;
  }

  show(){
    stroke(200, 100, 100);
    this.ribbon.drawLineRibbon(5.0);
    // point(this.position.x, this.position.y, this.position.z);
  }

  move(){
    this.noiseX = map(sin(this.theta)*cos(this.phi), -1, 1, 0, 3);
    this.noiseY = map(sin(this.theta)*sin(this.phi), -1, 1, 0, 3);
    this.noiseZ = map(cos(this.theta), -1, 1, 0, 3);
    this.angleTheta = noise(this.noiseX, this.noiseY, this.noiseZ+this.noiseZoffset) * 10;
    this.anglePhi = noise(this.noiseX, this.noiseY, this.noiseZ+this.noiseZoffset) * 10;

    this.position.x = r * sin(this.angleTheta) * cos(this.anglePhi);
    this.position.y = r * sin(this.angleTheta) * sin(this.anglePhi);
    this.position.z = r * cos(this.angleTheta);

    this.ribbon.update(this.position);

    this.noiseZoffset+=0.005;
  }
}
