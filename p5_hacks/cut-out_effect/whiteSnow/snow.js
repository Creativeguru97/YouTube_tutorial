class Snow{
  constructor(minR, maxR){
    this.min_R = minR;
    this.max_R = maxR;
    this.radius = random(minR, maxR);

    this.loc = createVector(
      random(0, width),
      random(0-this.radius, layer1.height+this.radius)
    );
    this.velX = 0;
    this.velY = map(this.radius, minR, maxR, minR/20, maxR/20);
    noStroke();

    this.offset = random(1000);
  }

  show(blurAmount, i){
    layer1.drawingContext.filter = 'blur('+str(blurAmount)+'px)';
    layer1.erase(100-i, 100);
    layer1.noStroke();
    layer1.ellipse(this.loc.x, this.loc.y, this.radius);
    layer1.noErase();
    layer1.drawingContext.filter = 'blur(0px)';
  }

  descend(){
    let n = map(noise(this.offset),0, 1, -1, 1);
    this.loc.x += n;
    this.loc.y += this.velY;
    this.offset += 0.005;
  }

  reposition(){
    if(this.loc.y > layer1.height+this.radius){
      this.changeRadius();
      this.loc = createVector(
        random(0, layer1.width),
        -this.radius
      );
    }
  }

  changeRadius(){
    this.radius = random(this.min_R, this.max_R);
  }
}
