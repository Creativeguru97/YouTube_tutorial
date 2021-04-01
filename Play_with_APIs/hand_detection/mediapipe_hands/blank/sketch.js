//------- Condortable p5 world :))))) -------//

let font
let canvas;

let sketch = function(p){

  p.setup = function(){
    canvas = p.createCanvas(640, 480, p.WEBGL);
    canvas.id("canvas");

    p.colorMode(p.HSB, 360, 100, 100, 100);
  }

  p.draw = function(){
    p.clear();
    // p.background(0);

    p.translate(-p.width/2, -p.height/2);

    if(detections != undefined){
      if(detections.multiHandLandmarks != undefined){
          // p.drawHands();
          p.drawLines([0, 5, 9, 13, 17, 0]);
          p.drawLines([0, 1, 2, 3 ,4]);
          p.drawLines([5, 6, 7, 8]);
          p.drawLines([9, 10, 11, 12]);
          p.drawLines([13, 14, 15, 16]);
          p.drawLines([17, 18, 19, 20]);

          p.drawLandmarks([0, 1], 0);//palm base
          p.drawLandmarks([1, 5], 60);//thumb
          p.drawLandmarks([5, 9], 120);//index finger
          p.drawLandmarks([9, 13], 180);//middle finger
          p.drawLandmarks([13, 17], 240);//ring finger
          p.drawLandmarks([17, 21], 300);//pinky
      }
    }
  }

  p.drawHands = function(){
    for(let i=0; i<detections.multiHandLandmarks.length; i++){
      for(let j=0; j<detections.multiHandLandmarks[i].length; j++){
        let x = p.int(detections.multiHandLandmarks[i][j].x * p.width);
        let y = p.int(detections.multiHandLandmarks[i][j].y * p.height);
        let z = p.int(detections.multiHandLandmarks[i][j].z);

        p.stroke(255);
        p.strokeWeight(10);
        p.point(x, y, z);
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
        let z = detections.multiHandLandmarks[i][index[j]].z;

        let _x = detections.multiHandLandmarks[i][index[j+1]].x * p.width;
        let _y = detections.multiHandLandmarks[i][index[j+1]].y * p.height;
        let _z = detections.multiHandLandmarks[i][index[j+1]].z;
        p.line(x, y, _x, _y);
      }
    }
  }

  p.drawLandmarks = function(indexArray, hue){
    p.noFill();
    p.strokeWeight(10);
    for(let i=0; i<detections.multiHandLandmarks.length; i++){
      for(let j=indexArray[0]; j<indexArray[1]; j++){
        let x = detections.multiHandLandmarks[i][j].x * p.width;
        let y = detections.multiHandLandmarks[i][j].y * p.height;
        let z = detections.multiHandLandmarks[i][j].z;
        p.stroke(hue, 40, 255);
        p.point(x, y);
      }
    }
  }

}

let myp5 = new p5(sketch);
