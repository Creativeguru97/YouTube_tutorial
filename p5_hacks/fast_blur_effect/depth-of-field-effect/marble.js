class Marble{
  constructor(minR, maxR, sSub){
    this.min_R = minR;
    this.max_R = maxR;
    this.radius = random(minR, maxR);

    this.loc = createVector(
      random(0, width),
      random(0-this.radius, height+this.radius)
    );
    this.velX = 0;
    this.velY = map(this.radius, minR, maxR, minR/100, maxR/100);

    this.col;
    this.s_sub = sSub;
    this.changeColor(this.s_sub);
    noStroke();

    this.offset = random(1000);
  }

  show(blurAmount){
    fill(this.col);
    drawingContext.filter = 'blur('+str(blurAmount)+'px)';
    ellipse(this.loc.x, this.loc.y, this.radius);
  }

  ascend(){
    let n = map(noise(this.offset),0, 1, -1, 1);
    this.loc.x += n;
    this.loc.y -= this.velY;
    this.offset += 0.005;
  }

  reposition(){
    if(this.loc.y < 0-this.radius){
      this.changeColor(this.s_sub);
      this.changeRadius();
      this.loc.x = random(0, width);
      this.loc.y = height+this.radius;
    }
  }

  changeColor(s_sub){
    let colorNum = int(random(0, 4));
    if(colorNum == 0) this.col = color(351, 64-s_sub, 91);//薔薇色
    if(colorNum == 1) this.col = color(345, 80-s_sub, 64);//真紅
    if(colorNum == 2) this.col = color(3, 24-s_sub, 96);//虹色
    if(colorNum == 3) this.col = color(31, 52-s_sub, 97);//杏色
  }

  changeRadius(){
    this.radius = random(this.min_R, this.max_R);
  }
}
