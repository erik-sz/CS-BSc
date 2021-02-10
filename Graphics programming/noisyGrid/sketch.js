var stepSize = 20;
var noiseScale;

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
}
///////////////////////////////////////////////////////////////////////
function draw() {
  background(125);

  colorGrid();
  compassGrid();

  noiseScale = map(mouseX, width, 0, 0.02, 0.06);
}
///////////////////////////////////////////////////////////////////////
function colorGrid(){
  // your code here
  for(i=0; i < 25; i++)
  {
    for(j=0; j < 25; j++)
    {
      let ns = noise(frameCount*noiseScale, i*noiseScale, j*noiseScale);
      
      let c1 = color(255, 0, 0);
      let c2 = color(0, 255, 0);
      let lerpCl = lerpColor(c1, c2, ns);
      
      fill(lerpCl);
      noStroke();
      rect(i*stepSize, j*stepSize, stepSize, stepSize);      
    }
  }
}
///////////////////////////////////////////////////////////////////////
function compassGrid(){
  // your code here  
  translate(-12, -12);
  for(i=0; i < 25; i++)
  {
    translate(0, stepSize);
    for(j=0; j < 25; j++)
    {
      translate(stepSize, 0);
      let ns = noise(frameCount*noiseScale, i*noiseScale, j*noiseScale);
      let mp = map(ns, 0, 1, 0, 720);
      
      push();
      stroke(5);
      strokeWeight(3);
      rotate(mp);
      line(0, 0, 0, -20);
      pop();
    }
    translate(-25*stepSize, 0);
  }
}
