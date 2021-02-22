function StudentGrades() {

    // Name for the visualisation to appear in the menu bar.
    this.name = 'Student Grades';

    // Each visualisation must have a unique ID with no special
    // characters.
    this.id = 'student-grades';

    // Title to display above the plot.
    this.title = "Students' marks at Dream University";

    // The size of the graph
    this.graphSize = 1;

    // This is an array of colors to separate the different graphlines
    var graphLineColor = ['magenta', 'red', 'blue', 'green'];

    

    // This is an array of the X and Y coordinates for the axesGrid
    this.axesGridArray = [];

    // Property to represent whether data has been loaded.
    this.loaded = false;

    // Preload the data. This function is called automatically by the
    // gallery when a visualisation is added.
    this.preload = function() {
        var self = this;
        this.tableData = loadTable(
            './data/student-grades/grades.csv', 'csv', 'header',
            // Callback function to set the value
            // this.loaded to true.
            function(table) {
                self.loaded = true;
            });           
    };

    this.destroy = function() {
    };

    this.layout = {
        // The center of the graph.
        XcenterPoint : width*0.57,
        YcenterPoint : height/2,

        // The length of an axis.
        axesSize : 250 *  this.graphSize,

        // Number of axis tick labels to draw so that they are not drawn on top of one another.
        numOfTickLabels : 5
    }

    this.setup = function() {
        angleMode(DEGREES);

        // This is an array of the X and Y coordinates for the graphlines 
        this.graphLineCoordinates = [];

        this.numberOfAxes = this.tableData.getColumnCount() - 1;
        
        // Generates the X and Z coordinates for each dot for the graphlines 
        this.graphLineCoordArray();

        // Generates the X and Z coordinates for each dot for the axesGrid
        this.axesGrid();
        
    }

    this.draw = function() {
        push();
        if (!this.loaded) {
            console.log('Data not yet loaded');
            return;
        }

        // Draws the axes spiderchart
        this.drawAxes();

        // Draws the graph lines for each students
        this.drawGraphLines();
          
        // Draws the titles beside the spider chart.
        this.drawTitles();  
        pop();       
    }

    // Draws the axes, the axesGrid and the labels of the axes
    this.drawAxes = function() {
        push();
        
        strokeWeight(0.5);
        stroke(0);

        // Translate the center point of the graph 
        translate(this.layout.XcenterPoint, this.layout.YcenterPoint);

        // Draw the axes of the graph based on the number of the columns in the data
        for(i = 1; i <= this.numberOfAxes; i++){
            
            // Calculates the angle in degree between the axes 
            let degree = round(360 / this.numberOfAxes) * i;

            // Calculates the position for the outer coordinates of the axes, XYcoord is an array with 2 elements, x and y 
            let XYcoord = this.cartesianCalc(degree, this.layout.axesSize);
            
            // Draws the axes lines
            line(0, 0, XYcoord[0], XYcoord[1]);    
            
            // Draws labels of the axes
            let XYcoordText = this.cartesianCalc(degree, this.layout.axesSize + 20);
            push();

            strokeWeight(0.2);
            textAlign(CENTER);
            textSize(20);

            // If the current axes label is on the left side the text align is RIGHT, if on the right it is LEFT
            if(XYcoordText[0] < 0){textAlign(RIGHT);}
            if(XYcoordText[0] > 0){textAlign(LEFT);}

            text(this.tableData.columns[i], XYcoordText[0],XYcoordText[1]);
            
            pop();
        } 
        
        // Draws the grid between axes
        for(i = 0; i < this.numberOfAxes; i++){
            for(j = 0; j < 5; j++){
                push();
                
                let temp = (i + 1) * 20;
                strokeWeight(0.6);
                stroke(150);
                
                if (j == this.numberOfAxes-1){
                    line(this.axesGridArray[i][j][0], 
                        this.axesGridArray[i][j][1],
                        this.axesGridArray[i][0][0], 
                        this.axesGridArray[i][0][1]);
                    textAlign(RIGHT);   
                    text(temp, this.axesGridArray[i][j][0], this.axesGridArray[i][j][1]);
                }                
                
                else{line(this.axesGridArray[i][j][0], 
                          this.axesGridArray[i][j][1],
                          this.axesGridArray[i][j+1][0], 
                          this.axesGridArray[i][j+1][1]);
                }

                pop();
            }
        }
        pop();
    }

    // Creates a multidimensional array with all of the x and y coordinates, for drawing the axesGrid
    // it is called in the setup function, so it is calculated only ones to save processing power
    this.axesGrid = function(){

        let axesGridDistance = 20; 

        for(i = 1; i < 6; i++){           

            let tempArray = [];

            for (var j = 1; j <= this.numberOfAxes; j++) {    

                // Calculates the angle in degree between the axes
                let degree = round(360 / this.numberOfAxes) * j;

                // Temporary array to store coordinates for one graph line
                tempArray.push(this.cartesianCalc(degree, this.mapToGraphsize((axesGridDistance * i) - 5)));
            }

            this.axesGridArray.push(tempArray);
        } 
    }

    // Draws the graph lines for each students and 
    this.drawGraphLines = function(){

        push();
        // Translate the center point of the graph 
        translate(this.layout.XcenterPoint, this.layout.YcenterPoint);
        strokeWeight(2);
        for(i = 0; i < this.graphLineCoordinates.length; i++){1
            stroke(graphLineColor[i]);
            for(j = 0; j < this.graphLineCoordinates[i].length; j++){               
               
                // This if statement checks, that the loop is at the last axis. If it is true, it connects the last dots with the first dots
                if (j == this.graphLineCoordinates[i].length-1){
                    line(this.graphLineCoordinates[i][j][0], 
                        this.graphLineCoordinates[i][j][1],
                        this.graphLineCoordinates[i][0][0], 
                        this.graphLineCoordinates[i][0][1]);}               
                
                else{line(this.graphLineCoordinates[i][j][0], 
                     this.graphLineCoordinates[i][j][1],
                     this.graphLineCoordinates[i][j+1][0], 
                     this.graphLineCoordinates[i][j+1][1]);}
                fill(graphLineColor[i]);    
                ellipse(this.graphLineCoordinates[i][j][0], this.graphLineCoordinates[i][j][1], 8);

                // Draws the marks in numbers at every dots of the graphLines
                push();
                strokeWeight(0.3);
                stroke(1);
                fill(1);                
                textSize(15);
                textAlign(LEFT);
                text(this.tableData.get(i,j+1), this.graphLineCoordinates[i][j][0] + 10, this.graphLineCoordinates[i][j][1]);  
                pop();
      
            }
        }
        pop();
    }
    
    // This function draws the titles of the chart and the graphLines beside the graph
    this.drawTitles = function() {
        push();

        // This 5 lines draws the title of the graph
        strokeWeight(0.3);
        stroke(0);
        fill(0);
        textSize(25);
        textAlign(LEFT);
        text(this.title, 20, 60);
        textSize(15);
        
        // This for loop draws the rectangles and the titles of the graphLines 
        for(i = 0; i < this.tableData.getRowCount(); i++){
            fill(graphLineColor[i]);
            stroke(graphLineColor[i]);
            rect(20, height / 2 + i * 20, 15, 15);

            push();
            fill(1);
            stroke(1);
            text(this.tableData.get(i, 0), 40, height / 2 + i * 20 + 12);
            pop();
        }    
        pop();
    }
    
    
    // Calculates the x and y coordinates for drawing the graph lines and the axes
    this.cartesianCalc = function(degree, hypotenuse){
        let x, y;
        // Returns the an array with x and y coordinates if it is in the first quarter of the circle
        if(0 <= degree && degree <= 90){
            x = hypotenuse * sin(degree); 
            y = -hypotenuse * cos(degree); 
            return [round(x), round(y)];
        }
        // Returns the an array with x and y coordinates if it is in the second quarter of the circle
        if(90 < degree && degree <= 180){
            x = hypotenuse * cos(degree-90); 
            y = hypotenuse * sin(degree-90); 
            return [round(x), round(y)];
        }
        // Returns the an array with x and y coordinates if it is in the third quarter of the circle
        if(180 < degree && degree <= 270){
            x = -hypotenuse * sin(degree-180); 
            y = hypotenuse * cos(degree-180); 
            return [round(x), round(y)];
        }
        // Returns the an array with x and y coordinates if it is in the fourth quarter of the circle
        if(270 < degree && degree <= 360){
            x = -hypotenuse * cos(degree-270); 
            y = -hypotenuse * sin(degree-270); 
            return [round(x), round(y)];
        }        
    }

    this.mapToGraphsize = function(value){
        return map(value, 0, 100, 0, this.layout.axesSize);        
    }
    

    // Create a multidimensional array with all of the x and y coordinates, for drawing the graph lines
    // it is called in the setup function, so it is calculated only ones to save processing power
    this.graphLineCoordArray = function(){
        for(i = 0; i < this.tableData.getRowCount(); i++){           

            let tempArray = [];

            for (var j = 1; j <= this.numberOfAxes; j++) {    

                // Calculates the angle in degree between the axes
                let degree = round(360 / this.numberOfAxes) * j;

                // Temporary array to store coordinates for one graph line
                tempArray.push(this.cartesianCalc(degree, this.mapToGraphsize(this.tableData.get(i, j) - 5)));
            }
            this.graphLineCoordinates.push(tempArray);
        } 
    }
}