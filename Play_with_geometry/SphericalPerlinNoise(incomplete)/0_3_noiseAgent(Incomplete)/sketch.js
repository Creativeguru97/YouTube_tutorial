let r = 160;

let agents = [];

let thetaNoise;
let offset = 0;
let noiseScale = 0.015;

function setup(){
  createCanvas(800, 600, WEBGL);//size(600, 400);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100);

  for(let i = 0; i < 150; i++){
    let agent = new Agent();
    agents.push(agent);
  }

  // for(let theta=0; theta<180; theta+=30){
  //   agents[theta] = [];
  //   for(let phi=0; phi<360; phi+=30){
  //     let agent = new Agent();
  //     agents[theta].push(agent);
  //   }
  // }

  // console.log(agents);
}

function draw(){
  background(230, 50, 15);
  orbitControl(4, 4);//Mouse control

  rotateX(90);

  for(let i = 0; i < agents.length; i++){
    agents[i].move();
    agents[i].show();
  }
  // 
  // for(let theta=0; theta<180; theta+=30){
  //   for(let phi=0; phi<360; phi+=30){
  //     agents[i].move();
  //     agents[i].show();
  //   }
  // }
}
