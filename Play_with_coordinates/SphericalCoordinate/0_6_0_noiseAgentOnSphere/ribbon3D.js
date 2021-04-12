class Ribbon3d{
  // PVector[] p;

  constructor(theP, theCount, hue_){
    this.count = theCount;//How many points has the ribbon.
    this.vectors = [];
    this.hue = hue_;
    this.agentColor = 0;
    this.agentAlpha = 0;
    this.thickness = 0;

    for(let i=0; i<this.count; i++){
      this.vectors[i] = createVector();
    }
  }

  update(theP){
    //Shift the values to the right side
    //Simple queue

    for(let i=this.count-1; i>0; i--){
      // p[i].set(p[i-1]);
      this.vectors[i].set(this.vectors[i-1]);
    }
    this.vectors[0].set(theP);
  }

  drawLineRibbon(theWidth){//float
    //Draw the ribbon with lines
    noFill();

    for(let i=0; i<this.count-1; i++){
      // this.agentAlpha = 100-(100/this.count*i);//This is key to make latter of agents look gradually fade aways
      // this.agentColor = color(200, 100, 100, this.agentAlpha);
      // stroke(this.agentColor);
      stroke(200, 100, 100);

      this.thickness = theWidth - (theWidth/this.count * i);
      strokeWeight(this.thickness);
      point(this.vectors[i].x, this.vectors[i].y, this.vectors[i].z);
    }
  }
}
