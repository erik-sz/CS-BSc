function ConsumerExpenditur() {

    // Name for the visualisation to appear in the menu bar.
    this.name = 'Consumer expenditur 2005-2014';
  
    // Each visualisation must have a unique ID with no special
    // characters.
    this.id = 'consumer-expenditur';
  
    // Title to display above the plot.
    this.title =  'UK Consumer expenditure on food, drink and catering between 2005 and 2019.';
  
      // Names for each axis.
    this.xAxisLabel = 'Year';
    this.yAxisLabel = '£bn';
  
    var marginSize = 35;
  
    // Layout object to store all common plot layout parameters and
    // methods.
    this.layout = {
      marginSize: marginSize,
  
      // Locations of margin positions. Left and bottom have double margin
      // size due to axis and tick labels.
      leftMargin: marginSize * 2,
      rightMargin: width - marginSize,
      topMargin: marginSize,
      bottomMargin: height - marginSize * 5,
      pad: 5,
  
      plotWidth: function() {
        return this.rightMargin - this.leftMargin;
      },
  
      plotHeight: function() {
        return this.bottomMargin - this.topMargin;
      },
  
      // Boolean to enable/disable background grid.
      grid: true,
  
      // Number of axis tick labels to draw so that they are not drawn on
      // top of one another.
      numXTickLabels: 10,
      numYTickLabels: 8,
    };
  
    // Property to represent whether data has been loaded.
    this.loaded = false;
  
    // Preload the data. This function is called automatically by the
    // gallery when a visualisation is added.
    this.preload = function() {
        var self = this;
        this.data = loadTable(
            './data/food/food - consumerexpenditur.csv', 'csv', 'header',
        // Callback function to set the value
        // this.loaded to true.
        function(table) {
            self.loaded = true;
        });
        
    };    

    this.setup = function() {
      // Font defaults.
      textSize(16);
  
      // Set min and max years: assumes data is sorted by date.      
      this.startYear = this.data.getNum(0, 0);
      this.endYear = this.data.getNum(this.data.getRowCount() - 1, 0);
  
      // Find min and max pay gap for mapping to canvas height.
      this.minExpenditur = 30;         // Pay equality (zero pay gap).
      this.maxExpenditur = max(this.data.getColumn(3))+10;

      this.colors = ['red', 'green', 'blue'];
    };
  
    this.destroy = function() {
    };
  
    this.draw = function() {
        push();
        if (!this.loaded) {
            console.log('Data not yet loaded');
            return;
        }
        
        // Draw the title above the plot.
        this.drawTitle();

        // Draw all y-axis labels.
        drawYAxisTickLabels(this.minExpenditur,
                            this.maxExpenditur,
                            this.layout,
                            this.mapExpenditurToHeight.bind(this),
                            0);

        // Draw x and y axis.
        drawAxis(this.layout);

        // Draw x and y axis labels.
        drawAxisLabels(this.xAxisLabel,
                        this.yAxisLabel,
                        this.layout);

        // Plot all pay gaps between startYear and endYear using the width
        // of the canvas minus margins.
        var previous;
        var numYears = this.endYear - this.startYear;

        // Loop over all rows and draw a line from the previous value to
        // the current.
        
        for (var j = 1; j < this.data.getColumnCount(); j++) {  
                    
            for (var i = 0; i < this.data.getRowCount(); i++) {
                
                // Create an object to store data for the current year.
                var current = {
                    // Convert strings to numbers.
                    'year': this.data.getNum(i, 'Year'),
                    'exp': this.data.getNum(i, j)
                };
                if (previous != null) {
                    // Draw line segment connecting previous year to current
                    // year pay gap.
                    strokeWeight(1);
                    stroke(this.colors[j - 1]);  
                    line(this.mapYearToWidth(previous.year),
                        this.mapExpenditurToHeight(previous.exp),
                        this.mapYearToWidth(current.year),
                        this.mapExpenditurToHeight(current.exp));

                    // The number of x-axis labels to skip so that only
                    // numXTickLabels are drawn.
                    var xLabelSkip = ceil(numYears / this.layout.numXTickLabels);

                    // Draw the tick label marking the start of the previous year.
                    if (i % xLabelSkip == 0) {
                    drawXAxisTickLabel(previous.year, this.layout,
                                        this.mapYearToWidth.bind(this));
                    }
                }

                // Assign current year to previous year so that it is available
                // during the next iteration of this loop to give us the start
                // position of the next line segment.
                previous = current;
            }
            // setting previous to null before starting to draw the next line
            // otherwise the if statement above is always true
            previous = null;

            // Drawing the colored rectangles and the titles for the color specific graphlines
            fill(this.colors[j - 1]);
            rect(this.layout.leftMargin, 
                 this.layout.bottomMargin + (marginSize * j), 
                 25, 25);
            textAlign('left');
            text(this.data.columns[j],
                 this.layout.leftMargin+30, 
                 this.layout.bottomMargin + (marginSize * j)+15);
        }
        pop();
    };
  
    this.drawTitle = function() {
        fill(0);
        noStroke();
        textAlign('center', 'center');

        text(this.title,
            (this.layout.plotWidth() / 2) + this.layout.leftMargin,
            this.layout.topMargin - (this.layout.marginSize / 2));
    };
  
    this.mapYearToWidth = function(value) {
        return map(value,
                    this.startYear,
                    this.endYear,
                    this.layout.leftMargin,   // Draw left-to-right from margin.
                    this.layout.rightMargin);
    };
  
    this.mapExpenditurToHeight = function(value) {
        return map(value,
                    this.minExpenditur,
                    this.maxExpenditur,
                    this.layout.bottomMargin, // Smaller pay gap at bottom.
                    this.layout.topMargin);   // Bigger pay gap at top.
    };
  }
  