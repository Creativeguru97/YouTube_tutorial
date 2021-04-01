let handpose;
let detections = [];

let canvas;
let video;


function setup(){
  canvas = createCanvas(640, 480, WEBGL);//3D mode!!!
  canvas.id("canvas");

  video = createCapture(VIDEO);
  video.id("video");
  video.size(width, height);

  const options = {
    flipHorizontal: false, // boolean value for if the video should be flipped, defaults to false
    maxContinuousChecks: Infinity, // How many frames to go without running the bounding box detector. Defaults to infinity, but try a lower value if the detector is consistently producing bad predictions.
    detectionConfidence: 0.8, // Threshold for discarding a prediction. Defaults to 0.8.
    scoreThreshold: 0.75, // A threshold for removing multiple (likely duplicate) detections based on a "non-maximum suppression" algorithm. Defaults to 0.75
    iouThreshold: 0.3, // A float representing the threshold for deciding whether boxes overlap too much in non-maximum suppression. Must be between [0, 1]. Defaults to 0.3.
  }

  handpose = ml5.handpose(video, options, modelReady);
  colorMode(HSB);
}

function modelReady() {
  console.log("Model ready!");
  handpose.on('predict', results => {
    detections = results;

    // console.log(detections);
  });
}


function draw(){
  clear();
  //In webgl mode, origin of the coordinate setted to centre.
  //So I re-positioned it to top-left.
  translate(-width/2, -height/2);

  if(detections.length > 0){
    // drawHands();
    drawParts();
  }
}


function drawHands(){
  noFill();
  stroke(255);
  strokeWeight(6);

  for(let i=0; i<detections.length; i++){
    for(let j=0; j<detections[i].landmarks.length; j++){
      point(
        detections[i].landmarks[j][0],
        detections[i].landmarks[j][1],
        detections[i].landmarks[j][2]
      );
    }
  }
}//Function end


function drawParts(){
  noFill();
  strokeWeight(6);

  for(let i=0; i<detections.length; i++){
    //--- palm base ---
    for(let j=0; j<detections[i].annotations.palmBase.length; j++){
      stroke(0, 40, 255);
      point(
        detections[i].annotations.palmBase[j][0],
        detections[i].annotations.palmBase[j][1],
        detections[i].annotations.palmBase[j][2]
      );
    }

    //--- thumb ---
    for(let j=0; j<detections[i].annotations.thumb.length; j++){
      stroke(60, 40, 255);
      point(
        detections[i].annotations.thumb[j][0],
        detections[i].annotations.thumb[j][1],
        detections[i].annotations.thumb[j][2]
      );
    }

    //--- index finger ---
    for(let j=0; j<detections[i].annotations.indexFinger.length; j++){
      stroke(120, 40, 255);
      point(
        detections[i].annotations.indexFinger[j][0],
        detections[i].annotations.indexFinger[j][1],
        detections[i].annotations.indexFinger[j][2]
      );
    }

    //--- middle finger ---
    for(let j=0; j<detections[i].annotations.middleFinger.length; j++){
      stroke(180, 40, 255);
      point(
        detections[i].annotations.middleFinger[j][0],
        detections[i].annotations.middleFinger[j][1],
        detections[i].annotations.middleFinger[j][2]
      );
    }

    //--- ring finger ---
    for(let j=0; j<detections[i].annotations.ringFinger.length; j++){
      stroke(240, 40, 255);
      point(
        detections[i].annotations.ringFinger[j][0],
        detections[i].annotations.ringFinger[j][1],
        detections[i].annotations.ringFinger[j][2]
      );
    }

    //--- pinky ---
    for(let j=0; j<detections[i].annotations.pinky.length; j++){
      stroke(300, 40, 255);
      point(
        detections[i].annotations.pinky[j][0],
        detections[i].annotations.pinky[j][1],
        detections[i].annotations.pinky[j][2]
      );
    }
  }
}//Function end
