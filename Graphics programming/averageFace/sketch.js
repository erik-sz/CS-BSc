var imgs = [];
var avgImg;
var numOfImages = 30;

//////////////////////////////////////////////////////////
function preload() { // preload() runs once
    for(i=0; i<numOfImages; i++){
        let strng = "assets/" + i + ".jpg" ;
        imgs[i] = loadImage(strng);

    }
}
//////////////////////////////////////////////////////////
function setup() {
    createCanvas(imgs[0].width*2, imgs[0].height);
    pixelDensity(1);
    avgImg = createGraphics(imgs[0].width, imgs[0].height);      
}
//////////////////////////////////////////////////////////
function draw() {
    background(125);

    for(i=0; i<numOfImages; i++){
        imgs[i].loadPixels();        
    }
    avgImg.loadPixels(); 

    for (let i = 0; i < imgs[0].width; i++) {
        for (let j = 0; j < imgs[0].height; j++) {
            var sumR = 0;
            var sumG = 0;
            var sumB = 0;

            for(k=0; k<numOfImages; k++){
                
                sumR += (imgs[k].pixels[(imgs[0].width*j+i)*4+0])/numOfImages; 
                sumG += (imgs[k].pixels[(imgs[0].width*j+i)*4+1])/numOfImages; 
                sumB += (imgs[k].pixels[(imgs[0].width*j+i)*4+2])/numOfImages; 
            }
            
            avgImg.set(i, j, color(sumR, sumG, sumB));            
        }
    }

    avgImg.updatePixels();


    image(imgs[0], 0, 0, width/2, height);
    image(avgImg, width/2, 0, width/2, height);

    noLoop();
}
