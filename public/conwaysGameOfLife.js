function Cell(alive) {
    this.alive = alive;
    this.numberOfLivingNeighbours = 0;
}

Cell.prototype.letLive = function() {
    this.alive = true;
}

Cell.prototype.letDie = function() {
    this.alive = false;
}

Cell.prototype.isAlive = function() {
    return this.alive;
}

Cell.prototype.setNumberOfLivingNeighbours = function(numberOfLivingNeighbours) {
    this.numberOfLivingNeighbours = numberOfLivingNeighbours;
}

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
}

//------------------------------------------------------------------------------

function World() {
    this.cells = [50];
    for(var i=0; i < 50; i++) {
        this.cells[i] = [50];
        for(var j=0; j < 50; j++) {
            this.cells[i][j] = new Cell(false);
        }
    }
}

World.prototype.createStartingPopulation = function() {
    this.createOscillatingCrossAt(47,20);
}

World.prototype.createGliderAt = function(a, b) {
    this.cells[a][b].letLive();
    this.cells[a+1][b].letLive();
    this.cells[a+2][b].letLive();
    this.cells[a+2][b-1].letLive();
    this.cells[a+1][b-2].letLive();
}

World.prototype.createOscillatingCrossAt = function(a, b) {
    this.cells[a][b].letLive();
    this.cells[a-1][b].letLive();
    this.cells[a+1][b].letLive();
    this.cells[a][b-1].letLive();
    this.cells[a][b+1].letLive();
}

World.prototype.createRandomCluster = function() {

    for(var i=22; i<28; i++)
        for(var j=22; j<28; j++)
            if(Math.random() > 0.5)
                this.cells[i][j].letLive();
}

World.prototype.getLatestPopulation = function() {
    return this.cells;
}

World.prototype.evolve = function() {
    this.updateNeighbours();
    this.evolveCells();
}

World.prototype.updateNeighbours = function() {
    for(var i=0; i < 50; i++) {
        for(var j=0; j < 50; j++) {
            this.updateCellNeighbours(i, j);
        }
    }
}

World.prototype.evolveCells = function() {
    for(var i=0; i < 50; i++) {
        for(var j=0; j < 50; j++) {
            this.cells[i][j].evolve();
        }
    }
}

World.prototype.updateCellNeighbours = function(x, y) {
    var aliveNeighbourCount = 0;
    
    for(var i=Math.max(0, x-1); i < Math.min(50, x+2); i++)
        for(var j=Math.max(0, y-1); j < Math.min(50, y+2); j++)
            if(i != x || j != y)
                if(this.cells[i][j].isAlive())
                    aliveNeighbourCount++;
    
    this.cells[x][y].setNumberOfLivingNeighbours(aliveNeighbourCount);
}