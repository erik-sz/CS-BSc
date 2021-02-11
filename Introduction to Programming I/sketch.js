/*

The Game Project - Final

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;
var game_score;
var lives;
var collectables;
var canyons;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var jumpSound;
var collectSound;
var winSound;
var plummetSound;

function setup()
    {
        createCanvas(1024, 576);
        floorPos_y = height * 3/4;
        lives = 3;       
       
        preload();
        startGame() 
        
    }

function draw()
    {
        
        background(100, 155, 255); // fill the sky blue
        noStroke();
        fill(0,155,0);
        rect(0, floorPos_y, width, height/4); // draw some green ground

        push();
        translate(scrollPos, 0);
                
        // Draw clouds.
        drawClouds();
        // Draw mountains.
        drawMountains();
        // Draw trees.
        drawTrees();        
        // Draw canyons.
         for (var i = 0; i < canyons.length; i++)
             {
                 drawCanyons(canyons[i]);
                 checkCanyon(canyons[i]);
             }
        // Draw collectable items.
        for (var i = 0; i < collectables.length; i++)
            {
                if(collectables[i].isFound == false)
                    {
                        drawCollectable(collectables[i]);
                        checkCollectable(collectables[i]);
                        
                    }
                
            }
        
        renderFlagpole();
        pop();
                
        checkPlayerDie();
        
        // Draw game character.
        drawGameChar();
        
        // Draw score.
        fill(225);
        noStroke;
        textSize(14);
        text("SCORE: " + game_score, 20,20);
        
        // Draw lives text and tokens
        fill(225);
        noStroke;
        textSize(14);
        text("LIVES: ", 120, 20);
        for( i = lives; i > 0; i--)
            {                
//                ellipse(150 + i * 25, 15, 10, 10);
                
                //  standing front facing code
                fill(0);
                rect(150 + (i * 25)-11*0.5, 10, 22*0.5, 33*0.5);
                fill(0, 204, 255);
                
                ellipse(150 + (i *25), 10-5, 20*0.5, 20*0.5);
            // left hand
                ellipse(150 + (i * 25)-12*0.5, 10+10*0.5, 7*0.5, 17*0.5);
            // right hand
                ellipse(150 + (i * 25)+12*0.5, 10+10*0.5, 7*0.5, 17*0.5);
            // left leg
                ellipse(150 + (i * 25)-7*0.5, 10+35*0.5 , 7*0.5, 17*0.5);
            // right leg
                ellipse(150 + (i * 25)+7*0.5, 10+35*0.5, 7*0.5, 17*0.5);
                
            }
        // Logic that checks and draws game over
        if(lives < 1)
            {
                
                fill(255, 0, 0);
                noStroke();
                textSize(40)
                text("Game Over", width/2-120, 150);
                text("Press space to continue", width/2-220, 195);
                return;
            }
        
        // Logic that check that the character finished the level
        if(flagpole.isReached == true)
            {
                
                fill(255, 0, 0);
                noStroke();
                textSize(40)
                text("Level complete", width/2-150, 150);
                text("Press space to continue", width/2-220, 195);
                
                return;
            }

        // Logic to make the game character move or the background scroll.
        if(isLeft)
            {
                if(gameChar_x > width * 0.2)
                    {
                        gameChar_x -= 5;
                    }
                else
                    {
                        scrollPos += 5;
                    }
            }

        if(isRight)
            {
                if(gameChar_x < width * 0.8)
                    {
                        gameChar_x  += 5;
                    }
                else
                    {
                        scrollPos -= 5; // negative for moving against the background
                    }
            }
        
        
        // Logic to make the game character rise and fall.
        
        if (gameChar_y != floorPos_y)
            {
                gameChar_y += 2;
                isFalling = true; 
            }
	    else isFalling = false;
        
        if (flagpole.isReached == false)
            {
                checkFlagpole();
            }
        
        // Update real position of gameChar for collision detection.
        gameChar_world_x = gameChar_x - scrollPos;
    }


// ---------------------
// Key control functions
// ---------------------

function keyPressed()
    {
        if (keyCode==37 || key == 'A')
            {
                isLeft = true; 
            }

        else if(keyCode == 39 || key == 'D')
            {
                isRight = true; 
            }
        // push space to jump so the character appears 170px up from floor level
        else if(keyCode == 32 || key == ' ')
            {
                if (gameChar_y == floorPos_y)
                gameChar_y -= 170;
                jumpSound.play();
            }

    }

function keyReleased()
    {
    // left key released
        if (keyCode == 37 || key == 'A')
            {
                isLeft = false;
	        }
	// right key released
        else if(keyCode == 39  || key == 'D')
            {
                isRight = false;
            }
    // space key released 
        else if(keyCode == 32 || key == ' ')
           {
               if (gameChar_y == floorPos_y)
               gameChar_y -= 100;
           }
    }


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
    {
        // draw game character

        if(isLeft && isFalling)
            {
            //  jumping-left code
                fill(0);
                rect(gameChar_x-7, gameChar_y-55, 14, 33);
                fill(0, 204, 255);
                ellipse(gameChar_x, gameChar_y-60, 20, 20);
            //  hand
                ellipse(gameChar_x-12, gameChar_y-45, 17, 7);
            //  left leg
                ellipse(gameChar_x-13, gameChar_y-22, 17, 7);
            //  right leg
                ellipse(gameChar_x+3, gameChar_y-22, 7, 17);

            }
        else if(isRight && isFalling)
            {
            //  jumping-right code
                fill(0);
                rect(gameChar_x-7, gameChar_y-55, 14, 33);
                fill(0, 204, 255);
                ellipse(gameChar_x, gameChar_y-60, 20, 20);
            //  hand
                ellipse(gameChar_x+12, gameChar_y-45, 17, 7);
            //  left leg
                ellipse(gameChar_x-3, gameChar_y-22, 7, 17);
            //  right leg

            }
        else if(isLeft)
            {
            //  walking left code
                fill(0);
                rect(gameChar_x-7, gameChar_y-40, 14, 33);
                fill(0, 204, 255);
                ellipse(gameChar_x, gameChar_y-45, 20, 20);
            //  hand
                ellipse(gameChar_x-12, gameChar_y-30, 17, 7);
            //  leg
                ellipse(gameChar_x, gameChar_y-5, 7, 17);

            }
        else if(isRight)
            {
            //  walking right code
                fill(0);
                rect(gameChar_x-7, gameChar_y-40, 14, 33);
                fill(0, 204, 255);
                ellipse(gameChar_x, gameChar_y-45, 20, 20);
            //  hand
                ellipse(gameChar_x+12, gameChar_y-30, 17, 7);
            //  leg
                ellipse(gameChar_x, gameChar_y-5, 7, 17);


            }
        else if(isFalling || isPlummeting)
            {
            //  jumping facing forwards code
                fill(0);
                rect(gameChar_x-11, gameChar_y-55, 22, 33);
                fill(0, 204, 255);
                ellipse(gameChar_x, gameChar_y-60, 20, 20);
            // left hand
                ellipse(gameChar_x-15, gameChar_y-50, 17, 7);
            // right hand
                ellipse(gameChar_x+15, gameChar_y-50, 17, 7);
            // left leg
                ellipse(gameChar_x-7, gameChar_y-20 , 7, 17);
            // right leg
                ellipse(gameChar_x+7, gameChar_y-20, 7, 17);

            }
        else
            {
            //  standing front facing code
                fill(0);
                rect(gameChar_x-11, gameChar_y-40, 22, 33);
                fill(0, 204, 255);
                ellipse(gameChar_x, gameChar_y-45, 20, 20);
            // left hand
                ellipse(gameChar_x-12, gameChar_y-30, 7, 17);
            // right hand
                ellipse(gameChar_x+12, gameChar_y-30, 7, 17);
            // left leg
                ellipse(gameChar_x-7, gameChar_y-5 , 7, 17);
            // right leg
                ellipse(gameChar_x+7, gameChar_y-5, 7, 17);
            }
    }

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds()
    {
        for (var i = 0; i < clouds.length; i++) 
            {
                fill(150);
                ellipse(clouds[i].x_pos+5, clouds[i].y_pos+5, 60*(clouds[i].size/100), 60*(clouds[i].size/100));
                ellipse(clouds[i].x_pos - 35*(clouds[i].size/100), clouds[i].y_pos+5, 85*(clouds[i].size/100), 85*(clouds[i].size/100));
                ellipse(clouds[i].x_pos + 45*(clouds[i].size/100), clouds[i].y_pos+5, 35*(clouds[i].size/100), 35*(clouds[i].size/100));
                
                fill(250);
                ellipse(clouds[i].x_pos, clouds[i].y_pos, 60*(clouds[i].size/100), 60*(clouds[i].size/100));
                ellipse(clouds[i].x_pos - 40*(clouds[i].size/100), clouds[i].y_pos, 85*(clouds[i].size/100), 85*(clouds[i].size/100));
                ellipse(clouds[i].x_pos + 40*(clouds[i].size/100), clouds[i].y_pos, 35*(clouds[i].size/100), 35*(clouds[i].size/100));
            }
    }

// Function to draw mountains objects.
function drawMountains()
    {
        for (var i = 0; i < mountains.length; i++) 
            {
                fill(100);
                triangle(mountains[i].x_pos, mountains[i].y_pos - 332 * (mountains[i].size/100), 
                         mountains[i].x_pos - 100 * (mountains[i].size/100), mountains[i].y_pos, 
                         mountains[i].x_pos + 100 * (mountains[i].size/100), mountains[i].y_pos);
                
                fill(80);
                triangle(mountains[i].x_pos, mountains[i].y_pos - 332 * (mountains[i].size/100), 
                         mountains[i].x_pos + 60 * (mountains[i].size/100), mountains[i].y_pos, 
                         mountains[i].x_pos + 100 * (mountains[i].size/100), mountains[i].y_pos);
                
                fill(255);
                triangle(mountains[i].x_pos, mountains[i].y_pos - 332 * (mountains[i].size/100), 
                         mountains[i].x_pos - 30 * (mountains[i].size/100), mountains[i].y_pos - 232 * (mountains[i].size/100), 
                         mountains[i].x_pos + 30 * (mountains[i].size/100), mountains[i].y_pos - 232 * (mountains[i].size/100));
                
            }
    }

// Function to draw trees objects.
function drawTrees()
    {
         for (var i = 0; i < trees.length; i++) 
            {
                fill(128, 0, 0);
                push();
                stroke(51, 51, 0);
                rect(trees[i].x_pos, trees[i].y_pos - 60*(trees[i].size/100), 16*(trees[i].size/100), 62*(trees[i].size/100));
                fill(51, 102, 0);
                triangle(trees[i].x_pos + 8*(trees[i].size/100), trees[i].y_pos - 120*(trees[i].size/100), 
                         trees[i].x_pos - 33*(trees[i].size/100), trees[i].y_pos - 60*(trees[i].size/100), 
                         trees[i].x_pos + 48*(trees[i].size/100), trees[i].y_pos - 60*(trees[i].size/100));
                
                triangle(trees[i].x_pos + 8*(trees[i].size/100), trees[i].y_pos - 146*(trees[i].size/100), 
                         trees[i].x_pos - 27*(trees[i].size/100), trees[i].y_pos - 86*(trees[i].size/100), 
                         trees[i].x_pos + 42*(trees[i].size/100), trees[i].y_pos - 86*(trees[i].size/100));
                
                triangle(trees[i].x_pos + 8*(trees[i].size/100), trees[i].y_pos - 174*(trees[i].size/100), 
                         trees[i].x_pos - 22*(trees[i].size/100), trees[i].y_pos -110*(trees[i].size/100), 
                         trees[i].x_pos + 37*(trees[i].size/100), trees[i].y_pos -110*(trees[i].size/100));
                pop();
                
            }
    }

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.


function drawCanyons(t_canyons)
    {
        fill(70, 30, 0);
        triangle(t_canyons.x_pos, floorPos_y, t_canyons.x_pos + t_canyons.width, floorPos_y, (t_canyons.x_pos + t_canyons.width / 2), 1500); 
    }

// Function to check character is over a canyon.

function checkCanyon(t_canyons)
    {
        if (gameChar_world_x > t_canyons.x_pos && gameChar_world_x < (t_canyons.x_pos + t_canyons.width) && gameChar_y >= floorPos_y) 
            {
                isPlummeting = true;
                plummetSound.play();
            }

        if (isPlummeting) 
            {
                gameChar_y += 10;
            }
    }      

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable)
    {
        fill(255,0,0,140);
        triangle(t_collectable.x_pos, t_collectable.y_pos, 
                 t_collectable.x_pos-10*(t_collectable.size/100), t_collectable.y_pos-20*(t_collectable.size/100), 
                 t_collectable.x_pos, t_collectable.y_pos-30*(t_collectable.size/100));
        
        strokeWeight(2);
        fill(230,0,120,240);
        triangle(t_collectable.x_pos, t_collectable.y_pos, 
                 t_collectable.x_pos+10*(t_collectable.size/100), t_collectable.y_pos-20*(t_collectable.size/100), 
                 t_collectable.x_pos, t_collectable.y_pos-30*(t_collectable.size/100));  
        
        
    }

// Function to check character has collected an item.

function checkCollectable(t_collectable)
    {
        if (dist(gameChar_world_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 35) 
            {
                t_collectable.isFound = true;
                collectSound.play();
                game_score += 1;
            }
    }

function renderFlagpole()
    {
        push();
        strokeWeight(5);
        stroke(0);
        line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
        fill(255,0,255);
        noStroke();
        
        if(flagpole.isReached)
            {
               rect(flagpole.x_pos, floorPos_y - 250, 50, 50)
            }
        else
            {
                rect(flagpole.x_pos, floorPos_y - 50, 50, 50)
            }
        pop();
    }

function checkFlagpole()
    {
        var d = abs(gameChar_world_x - flagpole.x_pos);

        if(d < 15)
            {
                flagpole.isReached = true;
                winSound.play();
//               
            }
    }

function checkPlayerDie()
    {
        if (gameChar_y > 576)
            {
                lives -= 1; 
                startGame();
            }       
    }

function startGame()
    {   gameChar_x = width/2;
        gameChar_y = floorPos_y;
        
        // Variable to control the background scrolling.
        scrollPos = 0;

        // Variable to store the real position of the gameChar in the game
        // world. Needed for collision detection.
        gameChar_world_x = gameChar_x - scrollPos;
        
        // Boolean variables to control the movement of the game character.
        isLeft = false;
        isRight = false;
        isFalling = false;
        isPlummeting = false;


        // Initialise arrays of scenery objects.
        
        trees = [{x_pos: 100, y_pos: floorPos_y, size: 100},
                  {x_pos: 580, y_pos: floorPos_y, size: 80},
                  {x_pos: 1200, y_pos: floorPos_y, size: 90},
                 {x_pos: 140, y_pos: floorPos_y, size: 70},
                 {x_pos: 180, y_pos: floorPos_y, size: 95},
                 {x_pos: 1200, y_pos: floorPos_y, size: 90},
                 {x_pos: 1200, y_pos: floorPos_y, size: 50},
                 {x_pos: 1200, y_pos: floorPos_y, size: 50},
                  {x_pos: 2100, y_pos: floorPos_y, size: 90}];            
        
        clouds = [{x_pos: 170, y_pos: 150, size: 100},
                  {x_pos: 650, y_pos: 250, size: 70},
                  {x_pos: 1170, y_pos: 150, size: 130},
                  {x_pos: 2070, y_pos: 150, size: 200}, 
                  {x_pos: 2770, y_pos: 150, size: 50}
                 ];

        mountains = [{x_pos: 390, y_pos: floorPos_y, size: 80},
                     {x_pos: 340, y_pos: floorPos_y, size: 50},
                     {x_pos: 840, y_pos: floorPos_y, size: 120},
                     {x_pos: 760, y_pos: floorPos_y, size: 80},
                     {x_pos: 1340, y_pos: floorPos_y, size: 90},
                     {x_pos: 1940, y_pos: floorPos_y, size: 125},
                     {x_pos: 2740, y_pos: floorPos_y, size: 70}
                    ];

        canyons = [
            {x_pos: 2300, width: 200},
            {x_pos: 1500, width: 100}
            ];
        
        collectables = [
            {x_pos: 1660, y_pos: 430, isFound: false, size: 80},
            {x_pos: 800, y_pos: 430, isFound: false, size: 130},
            {x_pos: 2220, y_pos: 430, isFound: false, size: 130},
            {x_pos: 1980, y_pos: 430, isFound: false, size: 130},
            {x_pos: 2600, y_pos: 430, isFound: false, size: 130},
            {x_pos: 1010, y_pos: 300, isFound: false, size: 100}
            
            ];
          

        game_score = 0;
        flagpole = {isReached: false, x_pos: 3000};
        
    }

function preload() {
    soundFormats('wav');
    
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.3);
    collectSound = loadSound('assets/diamond.wav');
    collectSound.setVolume(0.3);
    winSound = loadSound('assets/backgroundsound.wav');
    winSound.setVolume(0.3);
    plummetSound = loadSound('assets/plummeting.wav');
    plummetSound.setVolume(0.3);
}