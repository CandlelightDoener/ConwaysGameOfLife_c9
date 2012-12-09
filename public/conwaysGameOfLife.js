function World() {
    this.cells = [50];
    for(var i=0; i < 50; i++) {
        this.cells[i] = [50];
        for(var j=0; j < 50; j++) {
            this.cells[i][j] = false;
        }
    }
}

World.prototype.createRandomStartingPopulation = function() {
    
    for(var i=22; i<28; i++)
        for(var j=22; j<28; j++)
            if(Math.random() > 0.5)
                this.cells[i][j] = true;
}

World.prototype.getCells = function() {
    return this.cells;
}