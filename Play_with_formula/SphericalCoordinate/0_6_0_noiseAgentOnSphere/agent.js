class Agent{
  constructor(){
    this.position = createVector();
    this.theta = random(0, 180);
    this.phi = random(0, 360);
    this.speed = random(0.05, 0.5);
    this.noiseScale = 300;
    this.stepSize = random(0.1, 0.3);
    this.ribbon = new Ribbon3d(this.position, int(random(10, 20), 190));
  }

  show(){
    stroke(200, 100, 100);
    this.ribbon.drawLineRibbon(5.0);
    // point(this.position.x, this.position.y, this.position.z);


  }

  move(thetaNoise){
    this.phi += this.speed;

    this.position.x = r * sin(this.theta+thetaNoise*10) * cos(this.phi);
    this.position.y = r * sin(this.theta+thetaNoise*10) * sin(this.phi);
    this.position.z = r * cos(this.theta+thetaNoise*10);

    this.ribbon.update(this.position);
  }
}
