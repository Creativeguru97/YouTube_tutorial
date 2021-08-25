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
        // p.drawFaces();
        p.HUD();
      }
    }
  }

  p.drawFaces = function(){
    // let limit = p.map(p.mouseX, 1, p.width, 1, 468);
    // if(limit > 468) limit = 468;
    // console.log(limit);
    // detections.multiFaceLandmarks[i].length

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

  p.HUD = function(){
    for(let i=0; i<detections.multiFaceLandmarks.length; i++){
      //one of the point of left eye
      let xL = detections.multiFaceLandmarks[i][249].x * p.width - p.width/2;
      let yL = detections.multiFaceLandmarks[i][249].y * p.height - p.height/2;
      let zL = detections.multiFaceLandmarks[i][249].z * 500;
      //one of the point of right eye
      let xR = detections.multiFaceLandmarks[i][7].x * p.width - p.width/2;
      let yR = detections.multiFaceLandmarks[i][7].y * p.height - p.height/2;
      let zR = detections.multiFaceLandmarks[i][7].z * 500;

      let xT = detections.multiFaceLandmarks[i][10].x * p.width - p.width/2;
      let yT = detections.multiFaceLandmarks[i][10].y * p.height - p.height/2;
      let zT = detections.multiFaceLandmarks[i][10].z * 500;

      let xB = detections.multiFaceLandmarks[i][152].x * p.width - p.width/2;
      let yB = detections.multiFaceLandmarks[i][152].y * p.height - p.height/2;
      let zB = detections.multiFaceLandmarks[i][152].z * 500;



      p.stroke(360, 100, 100);
      p.strokeWeight(20);
      p.point(xL, yL, zL);
      p.point(xR, yR, zR);
      p.point(xT, yT, zT);
      p.point(xB, yB, zB);

      // console.log(p.mouseX);

      // p.stroke(0, 100, 100);
      // p.strokeWeight(30);
      let angleY = p.atan2(zL - zR, xL - xR);
      let angleX = p.atan2(yL - yR, xL - xR);
      let angleZ = p.atan2(yT - yB, zT - zB);

      let distV = p.dist(xT, yT, xB, yB);

      let depth = p.map(distV, p.width/4, p.width/2, 120, 240);

      p.push();
        p.translate(xL+depth/4, yL+depth/1.5, zL-50);
        p.rotateY(angleY+40);
        p.rotateX(-angleX-20);
        p.rotateZ(angleZ);
        p.texture(hud);
        p.noStroke();
        p.box(depth, depth, 0);
      p.pop();

      p.push();
        p.translate(xR-depth/4, yR+depth/1.5, zR-50);
        p.rotateY(angleY-40);
        p.rotateX(angleX-20);
        p.rotateZ(angleZ);
        p.texture(hud);
        p.noStroke();
        p.box(depth, depth, 0);
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
