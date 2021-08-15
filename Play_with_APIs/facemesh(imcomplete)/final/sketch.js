//------- Condortable p5 world :))))) -------//

let canvas;

let sketch = function(p){

  let hud;

  p.preload = function(){
    hud = p.loadImage("images/hud.png");
  }

  p.setup = function(){
    canvas = p.createCanvas(640, 480, p.WEBGL);
    canvas.id("canvas");

    p.colorMode(p.HSB);
    p.angleMode(p.DEGREES);
    p.imageMode(p.CENTER);
    p.frameRate(30);
  }

  p.draw = function(){
    p.clear();
    if(detections != undefined){
      if(detections.multiFaceLandmarks != undefined){
        p.drawFaces();
        p.drawEyeLight();
      }
    }
  }

  p.drawFaces = function(){
    for(let i=0; i<detections.multiFaceLandmarks.length; i++){
      for(let j=0; j<detections.multiFaceLandmarks[i].length; j++){
        let x = detections.multiFaceLandmarks[i][j].x * p.width - p.width/2;
        let y = detections.multiFaceLandmarks[i][j].y * p.height - p.height/2;
        let z = detections.multiFaceLandmarks[i][j].z;
        // p.strokeWeight(0);
        // p.textFont('Helvetica Neue');
        // p.text(j, x, y);
        p.stroke(255);
        p.strokeWeight(3);
        p.point(x, y, z);
      }
    }
  }

  p.drawEyeLight = function(){
    for(let i=0; i<detections.multiFaceLandmarks.length; i++){
      let xL = detections.multiFaceLandmarks[i][7].x * p.width - p.width/2;
      let yL = detections.multiFaceLandmarks[i][7].y * p.height - p.height/2;
      let zL = detections.multiFaceLandmarks[i][7].z * 500;

      let xR = detections.multiFaceLandmarks[i][249].x * p.width - p.width/2;
      let yR = detections.multiFaceLandmarks[i][249].y * p.height - p.height/2;
      let zR = detections.multiFaceLandmarks[i][249].z * 500;

      p.stroke(360, 100, 100);
      p.strokeWeight(20);
      p.point(xL, yL, zL);
      p.point(xR, yR, zR);

      console.log(p.mouseX);


      // p.stroke(0, 100, 100);
      // p.strokeWeight(30);
      let a = p.atan2(zR - zL, xR - xL);
      let d = p.dist(xR, yR, xL, yL);

      let depth = p.map(d, p.width/4, p.width/2, 170, 340);

      p.push();
        p.translate(xR+depth/4, yR+depth/1.5, zR);
        p.rotateY(a+40);
        p.texture(hud);
        p.noStroke();
        p.box(depth, depth, 0);
        // p.image(hud, 200, 0, 200, 200);
      p.pop();
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
