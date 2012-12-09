function Cell(alive) {
    this.alive = alive;
    this.lastStatusChangeInGeneration = 0;
}

Cell.prototype.letLive = function(generation) {
    this.alive = true;
    this.lastStatusChangeInGeneration = generation;
}

Cell.prototype.letDie = function(generation) {
    this.alive = false;
    this.lastStatusChangeInGeneration = generation;
}

Cell.prototype.wasAliveBeforeGeneration = function(generation) {
    if(this.alive)
        return this.lastStatusChangeInGeneration < generation;
}

Cell.prototype.isAlive = function() {
    return this.alive;
}

Cell.prototype.evolve = function(neighbourCount, generation) {
    if(this.isAlive()) {
        if(neighbourCount < 2 || neighbourCount > 3) {
            this.letDie(generation);
        }
    } else {
        if(neighbourCount == 3) {
            this.letLive(generation);
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

World.prototype.createRandomStartingPopulation = function() {
    
    var generationZero = 0;
    
    this.cells[0][0].letLive(generationZero);
    this.cells[0][1].letLive(generationZero);
    this.cells[1][0].letLive(generationZero);
    this.cells[1][1].letLive(generationZero);
    
    for(var i=22; i<28; i++)
        for(var j=22; j<28; j++)
            if(Math.random() > 0.5)
                this.cells[i][j].letLive(generationZero);
}

World.prototype.getLatestPopulation = function() {
    return this.cells;
}

World.prototype.evolve = function(generation) {
    for(var i=0; i < 50; i++) {
        for(var j=0; j < 50; j++) {
            this.evolveCell(i, j, generation);
        }
    }
}

World.prototype.evolveCell = function(x, y, generation) {
    var neighbourCount = 0;
    
    for(var i=Math.max(0, x-1); i < Math.min(50, x+1); i++)
        for(var j=Math.max(0, y-1); j < Math.min(50, y+1); j++)
            if(i != x || j != y)
                if(this.cells[i][j].wasAliveBeforeGeneration(generation))
                    neighbourCount++;
    
    this.cells[x][y].evolve(neighbourCount, generation);
}