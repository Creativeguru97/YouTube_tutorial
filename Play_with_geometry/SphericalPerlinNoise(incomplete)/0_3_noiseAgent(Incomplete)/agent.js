class Agent{
  constructor(){
    this.position = createVector(
      random(-100, 100),
      random(-100, 100),
      random(-100, 100)
    );
    this.ribbon = new Ribbon3d(int(random(10, 30)), this.position);

    this.speed = random(0.05, 0.5);
    this.noiseScale = 100;
    this.noiseX = 0;
    this.noiseY = 0;
    this.noiseZ = 0;
    this.noiseZoffset = random(0, 0.15);
    this.stepSize = random(0.8, 1.0);
    this.offset;

    this.theta = random(0, 180);
    this.phi = random(0, 360);
  }

  show(){
    vertex(
      this.position.x,
      this.position.y,
      this.position.z
    )
    // this.ribbon.drawLineRibbon();
  }

  move(){
    this.noiseX = map(sin(this.theta)*cos(this.phi), -1, 1, 0, 3);
    this.noiseY = map(sin(this.theta)*sin(this.phi), -1, 1, 0, 3);
    this.noiseZ = map(cos(this.theta), -1, 1, 0, 3);

    let angleTheta = (noise(this.noiseX+this.noiseZoffset, this.noiseY, this.noiseZ)-0.5)*this.stepSize;
    let anglePhi = (noise(this.noiseX+this.noiseZoffset, this.noiseY, this.noiseZ)-0.5)*this.stepSize;

    this.position.x = 250 * sin(this.theta += angleTheta) * cos(this.phi += anglePhi);
    this.position.y = 250 * sin(this.theta += angleTheta) * sin(this.phi += anglePhi);
    this.position.z = 250 * cos(this.theta += angleTheta);
    // this.ribbon.update(this.position);

    this.noiseZoffset+=0.001;
  }

  // move(){
  //   this.angleTheta = noise(this.position.x / this.noiseScale, this.position.y / this.noiseScale, this.position.z / this.noiseScale) * 1000;
  //   this.anglePhi = noise(this.position.x / this.noiseScale, this.position.y / this.noiseScale, this.position.z / this.noiseScale) * 1000;
  //
  //   this.position.x += sin(this.angleTheta) * cos(this.anglePhi) * this.stepSize;
  //   this.position.y += sin(this.angleTheta) * sin(this.anglePhi) * this.stepSize;
  //   this.position.z += cos(this.angleTheta) * this.stepSize;
  //
  //   // this.ribbon.update(this.position);
  // }
}
