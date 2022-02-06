class Petal{
  constructor(minR, maxR){
    this.min_R = minR;
    this.max_R = maxR;
    this.radius = random(this.min_R, this.max_R);

    this.loc = createVector(
      random(0, width),
      random(0, height),
    );
    this.vel = createVector(
      map(this.radius, this.min_R, this.max_R, -this.min_R/3, -this.max_R/3),
      map(this.radius, this.min_R, this.max_R, this.min_R/3, this.max_R/3)
    );

    this.angle = 1;
    this.aAdd = map(noise(random(100)), 0, 1, -0.02, 0.02);
  }

  show(blurAmount, i){
    layer2.erase(100-i, 100);

    layer2.push();
    layer2.translate(this.loc.x, this.loc.y);
    this.pRotate();
    layer2.drawingContext.filter = 'blur('+str(blurAmount)+'px)';

    layer2.beginShape();
    layer2.vertex(0, -this.radius*1.5);             //0
    layer2.vertex(this.radius*0.5, -this.radius*2); //1
    layer2.vertex(this.radius*0.9, -this.radius);   //2
    layer2.vertex(this.radius, 0);                  //3
    layer2.vertex(this.radius*0.7, this.radius);    //4
    layer2.vertex(0, this.radius*2);                //5
    layer2.vertex(-this.radius*0.7, this.radius);   //6
    layer2.vertex(-this.radius, 0);                 //7
    layer2.vertex(-this.radius*0.9, -this.radius);  //8
    layer2.vertex(-this.radius*0.5, -this.radius*2);//9
    layer2.endShape();
    layer2.pop();

    layer2.noErase();
  }

  descend(){
    this.loc.add(this.vel);
  }

  pRotate(){
    this.angle += this.aAdd;
    layer2.rotate(this.angle);
  }

  reinitialize(){
    if(this.loc.y > layer2.height+this.radius*2){
      this.angle = 1;
      this.loc = createVector(
        random(0, layer2.width*1.5),
        0-this.radius*2,
      );
    }
  }
}
