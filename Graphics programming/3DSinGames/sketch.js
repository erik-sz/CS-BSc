function setup() {
    createCanvas(900, 800,WEBGL);
    angleMode(DEGREES);    
    
    for(i=0; i < 200; i++){
        let v = createVector(random(-500,500), random(-800, 0), random(-500,500));
        confLoc.push(v)
        confTheta.push(random(0, 360));
    }    
}

var confLoc = []; 
var confTheta = [];

function draw() {
    background(125);
    camera(cos(frameCount/2)*1200, -600, sin(frameCount/2)*1200, 0, 0, 0, 0, 1, 0);
    normalMaterial();
    for(var i=-400; i <= 400; i+=50){
        for(var j=-400; j <= 400; j+=50){
            let distance = dist(0,0,0,i,0,j);
            let length = map(sin(frameCount*2+distance), -1, 1, 100, 300);
            push();            
            stroke(0);
            strokeWeight(2);
            translate(i, 0, j);
            box(50, length, 50);
            pop();
        }
    }
    
    for(i = 0; i < confLoc.length; i++){
        push();
        translate(confLoc[i].x, confLoc[i].y, confLoc[i].z);
        rotateX(confTheta[i]);
        plane(15, 15);        
        pop();
    }
    confetti();
}

function confetti(){
    for(i = 0; i < confLoc.length; i++){
        if (confLoc[i].y < 0){
            confLoc[i].y +=1
            confTheta[i] +=10 
        }
        else{
            confLoc[i].y = -800;
        }        
    }
}