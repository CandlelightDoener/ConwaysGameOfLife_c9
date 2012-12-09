function Cell(alive) {
    this.alive = alive;
    this.numberOfLivingNeighbours = 0;
}

Cell.prototype.letLive = function() {
    this.alive = true;
};

Cell.prototype.letDie = function() {
    this.alive = false;
};

Cell.prototype.isAlive = function() {
    return this.alive;
};

Cell.prototype.setNumberOfLivingNeighbours = function(numberOfLivingNeighbours) {
    this.numberOfLivingNeighbours = numberOfLivingNeighbours;
};

Cell.prototype.evolve = function() {
    if(this.isAlive()) {
        if(this.numberOfLivingNeighbours < 2 || this.numberOfLivingNeighbours > 3) {
            this.letDie();
        }
    } else {
        if(this.numberOfLivingNeighbours === 3) {
            this.letLive();
        }
    }
};

//------------------------------------------------------------------------------

function World(width, height) {
    this.height = height;
    this.width = width;
    
    this.cells = [width];
    for(var i=0; i < width; i++) {
        this.cells[i] = [height];
        for(var j=0; j < height; j++) {
            this.cells[i][j] = new Cell(false);
        }
    }
}

World.prototype.createStartingPopulation = function() {
    this.createOscillatingCrossAt(this.width - 3, 3);
    this.createRandomCluster(0, 10, 0, 10, 0.5);
};

World.prototype.createGliderAt = function(a, b) {
    this.cells[a][b].letLive();
    this.cells[a+1][b].letLive();
    this.cells[a+2][b].letLive();
    this.cells[a+2][b-1].letLive();
    this.cells[a+1][b-2].letLive();
};

World.prototype.createOscillatingCrossAt = function(a, b) {
    this.cells[a][b].letLive();
    this.cells[a-1][b].letLive();
    this.cells[a+1][b].letLive();
    this.cells[a][b-1].letLive();
    this.cells[a][b+1].letLive();
};

World.prototype.createRandomCluster = function(xLeft, xRight, yLow, yHigh, densityBetweenZeroAndOne) {

    var threshold = 1 - densityBetweenZeroAndOne;

    for(var i=xLeft; i<xRight; i++)
        for(var j=yLow; j<yHigh; j++)
            if(Math.random() > threshold)
                this.cells[i][j].letLive();
};

World.prototype.getLatestPopulation = function() {
    return this.cells;
};

World.prototype.evolve = function() {
    this.updateNeighbours();
    this.evolveCells();
};

World.prototype.updateNeighbours = function() {
    for(var i=0; i < this.width; i++) {
        for(var j=0; j < this.height; j++) {
            this.updateCellNeighbours(i, j);
        }
    }
};

World.prototype.evolveCells = function() {
    for(var i=0; i < this.width; i++) {
        for(var j=0; j < this.height; j++) {
            this.cells[i][j].evolve();
        }
    }
};

World.prototype.updateCellNeighbours = function(x, y) {
    var aliveNeighbourCount = 0;
    
    aliveNeighbourCount += this.addOneIfAlive(x-1, y-1);
    aliveNeighbourCount += this.addOneIfAlive(x,   y-1);
    aliveNeighbourCount += this.addOneIfAlive(x+1, y-1);
    aliveNeighbourCount += this.addOneIfAlive(x-1, y  );
    aliveNeighbourCount += this.addOneIfAlive(x+1, y  );
    aliveNeighbourCount += this.addOneIfAlive(x-1, y+1);
    aliveNeighbourCount += this.addOneIfAlive(x,   y+1);
    aliveNeighbourCount += this.addOneIfAlive(x+1, y+1);
    
    this.cells[x][y].setNumberOfLivingNeighbours(aliveNeighbourCount);
};

World.prototype.addOneIfAlive = function(x, y) {
    var wrappedX = (x + this.width) % this.width;
    var wrappedY = (y + this.height) % this.height;
    
    if(this.cells[wrappedX][wrappedY].isAlive())
        return 1;
        
    return 0;
}