
let maskCanvas;

let facemesh;
let predictions = [];
let inputImg;

let shapesData;

let imgIndex = 0;
const imgLength = 4;
const resolution = 1080;

function preload(){
  // shapesData = loadJSON("archive/pumpkin.json");
  // shapesData = loadJSON("archive/ghost.json");
  shapesData = loadJSON("archive/ghost_withEyes.json");
  // shapesData = loadJSON("archive/grey.json");
  // shapesData = loadJSON("archive/operaMask.json");
  // shapesData = loadJSON("archive/operaMask2.json");
  // shapesData = loadJSON("archive/operaMask3.json");
  // shapesData = loadJSON("archive/operaMask4.json");
  // shapesData = loadJSON("archive/fox.json");
  // shapesData = loadJSON("archive/clown.json");
  // shapesData = loadJSON("archive/clown2.json");
  // shapesData = loadJSON("archive/clown3.json");
  // shapesData = loadJSON("archive/guard.json");
}

function setup(){
  maskCanvas = createCanvas(resolution, resolution);
  maskCanvas.id("canvas");
  colorMode(HSB, 360, 100, 100, 100);

  shapes = shapesData.shapes;
  console.log(shapes);

  // inputImg = createImg("testFootages/images/test1.png", imageReady);
  // inputImg = createImg("testFootages/video/"+nf(str(imgIndex), 3, 0)+".png", imageReady);
  inputImg = createImg("participants/Kazuki/footages/"+nf(str(imgIndex), 4, 0)+".png", imageReady);
  // inputImg = createImg("2.png", imageReady);
  inputImg.id("inputImg");

  inputImg.hide(); // hide the image in the browser
  frameRate(0.5);
}

function imageReady() {
  facemesh = ml5.facemesh(modelReady);

  facemesh.on("predict", results => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Model ready!");
  facemesh.predict(inputImg);
}

function draw(){
  if (predictions.length > 0) {
    if(imgIndex < imgLength) screenShot();
    if(imgIndex == imgLength-1) noLoop();

    if(imgIndex < imgLength-1){
      inputImg.remove();
      imgIndex++;
      // inputImg = createImg("testFootages/video/"+nf(str(imgIndex), 3, 0)+".png", imageReady);
      inputImg = createImg("participants/Kazuki/footages/"+nf(str(imgIndex), 4, 0)+".png", imageReady);
    }
  }
}

function screenShot(){
  // image(inputImg, 0, 0, width, height);
  clear();
  // drawKeypoints();
  drawShapes();
  glow();
  if(imgIndex < imgLength) saveFrames(str(imgIndex), 'png', 1, 1);
}

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;

    // Draw facial keypoints.
    for (let j = 0; j < keypoints.length; j += 1) {
      const [x, y] = keypoints[j];

      stroke(100, 0, 100);
      strokeWeight(6);
      point(x, y);
    }
  }
}

function drawShapes(){
  strokeWeight(3);
  for(let s = 0; s < shapes.length; s++){
    fill(
      shapes[s].fill_H,
      shapes[s].fill_S,
      shapes[s].fill_B,
      shapes[s].fill_O
    );

    stroke(
      shapes[s].stroke_H,
      shapes[s].stroke_S,
      shapes[s].stroke_B,
      shapes[s].stroke_O
    );

    beginShape();
      for(let p=0; p<shapes[s].shapeVerticies.length; p++){
        const index = shapes[s].shapeVerticies[p]
        vertex(
          predictions[0].scaledMesh[index][0],
          predictions[0].scaledMesh[index][1]
        );
      }
    endShape();
  }
}

function glow(){
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = 12;
  drawingContext.shadowColor = 'rgba(255, 255, 255, 100)';
}
