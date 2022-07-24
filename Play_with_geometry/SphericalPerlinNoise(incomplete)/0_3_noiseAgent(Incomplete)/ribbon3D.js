class Ribbon3d{

  constructor(theCount, pos){
    this.count = theCount;//How many points has the ribbon.
    this.vectors = [];
    this.agentColor = 0;
    this.agentAlpha = 0;

    for(let i=0; i<this.count; i++){
      this.vectors[i] = pos.copy();
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

  drawLineRibbon(){//float
    beginShape();
    for(let i=0; i<this.count-1; i+=8){
      vertex(this.vectors[i].x, this.vectors[i].y, this.vectors[i].z);
    }
    endShape();
  }
}
