function Cell(alive) {
    this.alive = alive;
    this.aliveSinceGeneration = Math.max();
}

Cell.prototype.letLive = function(generation) {
    this.alive = true;
    this.aliveSinceGeneration = generation;
}

Cell.prototype.letDie = function() {
    this.alive = false;
    this.aliveSinceGeneration = Math.max();
}

Cell.prototype.isAlive = function() {
    return this.alive;
}

Cell.prototype.aliveSinceGeneration = function() {
    return this.aliveSinceGeneration;
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
    
    for(var i=22; i<28; i++)
        for(var j=22; j<28; j++)
            if(Math.random() > 0.5)
                this.cells[i][j].letLive(generationZero);
}

World.prototype.getLatestPopulation = function() {
    return this.cells;
}

World.prototype.evolve = function() {
    
}