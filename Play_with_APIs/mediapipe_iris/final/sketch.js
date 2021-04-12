//------- Condortable p5 world :))))) -------//

let canvas;

let sketch = function(p){
  p.setup = function(){
    canvas = p.createCanvas(640, 480);
    canvas.id("canvas");

    p.colorMode(p.HSB);
  }

  p.draw = function(){
    p.clear();
    if(detections != undefined){
      if(detections.multiHandLandmarks != undefined){
      }
    }
  }

  p.drawHands = function(){
    for(let i=0; i<detections.multiHandLandmarks.length; i++){
      for(let j=0; j<detections.multiHandLandmarks[i].length; j++){
        let x = detections.multiHandLandmarks[i][j].x * p.width;
        let y = detections.multiHandLandmarks[i][j].y * p.height;
        let z = detections.multiHandLandmarks[i][j].z;
        // p.strokeWeight(0);
        // p.textFont('Helvetica Neue');
        // p.text(j, x, y);
        p.stroke(255);
        p.strokeWeight(10);
        p.point(x, y);
      }
    }
  }

  p.drawLandmarks = function(indexArray, hue){
    p.noFill();
    p.strokeWeight(8);
    for(let i=0; i<detections.multiHandLandmarks.length; i++){
      for(let j=indexArray[0]; j<indexArray[1]; j++){
        let x = detections.multiHandLandmarks[i][j].x * p.width;
        let y = detections.multiHandLandmarks[i][j].y * p.height;
        // let z = detections.multiHandLandmarks[i][j].z;
        p.stroke(hue, 40, 255);
        p.point(x, y);
      }
    }
  }

  p.drawLines = function(index){
    p.stroke(0, 0, 255);
    p.strokeWeight(3);
    for(let i=0; i<detections.multiHandLandmarks.length; i++){
      for(let j=0; j<index.length-1; j++){
        let x = detections.multiHandLandmarks[i][index[j]].x * p.width;
        let y = detections.multiHandLandmarks[i][index[j]].y * p.height;
        // let z = detections.multiHandLandmarks[i][index[j]].z;

        let _x = detections.multiHandLandmarks[i][index[j+1]].x * p.width;
        let _y = detections.multiHandLandmarks[i][index[j+1]].y * p.height;
        // let _z = detections.multiHandLandmarks[i][index[j+1]].z;
        p.line(x, y, _x, _y);
      }
    }
  }
}

let myp5 = new p5(sketch);
