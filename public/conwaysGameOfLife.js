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
    this.cells[10][20] = true;
    this.cells[10][21] = true
}

World.prototype.getCells = function() {
    return this.cells;
}