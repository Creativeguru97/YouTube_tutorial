let sketch = function(p){
  let canvas;
  let dMouse = [];
  let closest;

  p.setup = function(){
    canvas = p.createCanvas(640, 480);
    canvas.id("canvas");
    p.colorMode(p.HSB);

    p.stroke(255);
    p.strokeWeight(3);
  }

  p.draw = function(){
    p.clear();
    if(detections != undefined){
      if(detections.multiFaceLandmarks != undefined && detections.multiFaceLandmarks.length >= 1){
        p.faceMesh();
      }
    }
  }

  p.faceMesh = function(){

    p.beginShape(p.POINTS);
    for(let j=0; j<detections.multiFaceLandmarks[0].length; j++){
      let x = detections.multiFaceLandmarks[0][j].x * p.width;
      let y = detections.multiFaceLandmarks[0][j].y * p.height;
      p.vertex(x, y);
    }
    p.endShape();
  }
}

let myp5 = new p5(sketch);
