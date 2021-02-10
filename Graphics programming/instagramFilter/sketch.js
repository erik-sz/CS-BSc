// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg
var imgIn;
var matrix = [
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64]
];
/////////////////////////////////////////////////////////////////
function preload() {
    imgIn = loadImage("assets/husky.jpg");
    
}
/////////////////////////////////////////////////////////////////
function setup() {
    createCanvas((imgIn.width * 2), imgIn.height);

   
}
/////////////////////////////////////////////////////////////////
function draw() {
    background(125);
    image(imgIn, 0, 0);
    image(earlyBirdFilter(imgIn), imgIn.width, 0);
    noLoop();
}
/////////////////////////////////////////////////////////////////
function mousePressed(){
  loop();
}
/////////////////////////////////////////////////////////////////
function earlyBirdFilter(img){
  var resultImg = createImage(imgIn.width, imgIn.height);
  resultImg = sepiaFilter(imgIn);
  resultImg = darkCorners(resultImg);
  resultImg = radialBlurFilter(resultImg);
  resultImg = borderFilter(resultImg)
  return resultImg;
}

function sepiaFilter(imgIn){
  var imgOut = createImage(imgIn.width, imgIn.height);

  imgOut.loadPixels();
  imgIn.loadPixels();

  for (x=0; x<imgIn.width; x++){
    for (y=0; y<imgIn.height; y++){
      var index = (y*imgIn.width + x)*4;

      var oldRed = imgIn.pixels[index + 0];
      var oldGreen = imgIn.pixels[index + 1];
      var oldBlue = imgIn.pixels[index + 2];

      var newRed = (oldRed * .393) + (oldGreen *.769) + (oldBlue * .189);
      var newGreen = (oldRed * .349) + (oldGreen *.686) + (oldBlue * .168);
      var newBlue = (oldRed * .272) + (oldGreen *.534) + (oldBlue * .131);

      imgOut.pixels[index + 0] = newRed;
      imgOut.pixels[index + 1] = newGreen;
      imgOut.pixels[index + 2] = newBlue;
      imgOut.pixels[index + 3] = 255;      
    }
  }

  imgOut.updatePixels();
  return imgOut;
}

function  darkCorners(imgIn){
  var imgOut = createImage(imgIn.width, imgIn.height);

  imgOut.loadPixels();
  imgIn.loadPixels();

  for (x=0; x<imgIn.width; x++){
    for (y=0; y<imgIn.height; y++){
      var index = (y*imgIn.width + x)*4;

      var oldRed = imgIn.pixels[index + 0];
      var oldGreen = imgIn.pixels[index + 1];
      var oldBlue = imgIn.pixels[index + 2];
  
      var dst = round(dist(x, y, imgIn.width/2, imgIn.height/2));
      var dynLum;
      if(dst <= 300){dynLum = 1}
      else if (dst >= 301 && dst <= 450){dynLum = map(dst, 301, 450, 1, 0.4)}
      else{dynLum = map(dst, 451, 515, 0.4, 0)}

      imgOut.pixels[index + 0] = oldRed * dynLum;
      imgOut.pixels[index + 1] = oldGreen * dynLum;
      imgOut.pixels[index + 2] = oldBlue * dynLum;
      imgOut.pixels[index + 3] = 255;
    }
  }
  imgOut.updatePixels();
  return imgOut;
}

function radialBlurFilter(imgIn){
  var imgOut = createImage(imgIn.width, imgIn.height);
  var matrixSize = matrix.length;

  imgOut.loadPixels();
  imgIn.loadPixels();  

  for (x=0; x<imgIn.width; x++){
    for (y=0; y<imgIn.height; y++){
      var index = (y*imgIn.width + x)*4;
      var dst = round(dist(x, y, mouseX, mouseY));
      var dynBlur = map(dst, 100, 300, 0, 1);
      var c = convolution(x, y, matrix, matrixSize, imgIn);

      var r = imgIn.pixels[index + 0];
      var g = imgIn.pixels[index + 1];
      var b = imgIn.pixels[index + 2];
      
      imgOut.pixels[index + 0] = c[0]*dynBlur + r*(1-dynBlur);
      imgOut.pixels[index + 1] = c[1]*dynBlur + g*(1-dynBlur);
      imgOut.pixels[index + 2] = c[2]*dynBlur + b*(1-dynBlur);
      imgOut.pixels[index + 3] = 255;
    }
  }
  imgOut.updatePixels();
  return imgOut;
}

function convolution (x, y, matrix, matrixSize, imgIn){
  var totalRed = 0.0;
  var totalGreen = 0.0;
  var totalBlue = 0.0;
  var offset = floor(matrixSize / 2);

  for (var i = 0; i < matrixSize; i++) {
    for (var j = 0; j < matrixSize; j++) {
        // Get pixel loc within convolution matrix
        var xloc = x + i - offset;
        var yloc = y + j - offset;
        var index = (xloc + imgIn.width * yloc) * 4;

        // ensure we don't address a pixel that doesn't exist
        index = constrain(index, 0, imgIn.pixels.length - 1);


        // multiply all values with the mask and sum up
        totalRed += imgIn.pixels[index + 0] * matrix[i][j];
        totalGreen += imgIn.pixels[index + 1] * matrix[i][j];
        totalBlue += imgIn.pixels[index + 2] * matrix[i][j];
    }
}
  return [totalRed, totalGreen, totalBlue];
}

function borderFilter(imgIn){
  var buffer = createGraphics(imgIn.width, imgIn.height);  
  buffer.image(imgIn, 0, 0);
  buffer.fill(255, 0);
  buffer.stroke(255);
  buffer.strokeWeight(50);
  buffer.rect(0, 0, imgIn.width, imgIn.height, 50);
  return buffer;
}