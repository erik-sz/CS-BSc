var speed;

function setup() {
    createCanvas(900, 700);
}

function draw() {
    background(0);
    speed = frameCount;
    


    translate(width/2, height/2);
    push();
    rotate(radians(speed/3));
    celestialObj(color(255,150,0), 200); // SUN 
    pop();
 
    
    rotate(radians(speed));
    translate(300, 0);
    push();
    rotate(radians(speed));
    celestialObj(color(0,0,255), 80); // EARTH
    pop();

    rotate(radians(-speed*2));
    translate(100, 0);
    celestialObj(color(250), 30); // MOON
 
}

function celestialObj(c, size){
    strokeWeight(5);
    fill(c);
    stroke(0);
    ellipse(0, 0, size, size);
    line(0, 0, size/2, 0);


}
