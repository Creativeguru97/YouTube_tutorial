class Cloud{
  constructor(minR, maxR){
    this.min_R = minR;
    this.max_R = maxR;
    this.radius = random(this.min_R, this.max_R);

    this.loc = createVector(
      random(0, layer1.width),
      random(layer1.height*2/3, layer1.height)
    );
    this.velX = random(0.8, 1.2);
    this.velY = 0;
    noStroke();

    this.offset = random(1000);
  }

  show(){
    layer1.drawingContext.filter = 'blur(24px)';
    layer1.erase(100, 100);
    layer1.ellipse(this.loc.x, this.loc.y, this.radius);
    layer1.noErase();
    layer1.drawingContext.filter = 'blur(0px)';
  }

  ascend(){
    let n = map(noise(this.offset),0, 1, -0.1, 0.1);
    this.loc.x -= this.velX;
    this.loc.y += n;
    this.offset += 0.005;
  }

  reposition(){
    if(this.loc.x < -this.radius){
      this.changeRadius();
      this.loc = createVector(
        layer1.width+this.radius,
        random(layer1.height*5/6, layer1.height)
      );
    }
  }

  changeRadius(){
    this.radius = random(this.min_R, this.max_R);
  }
}
