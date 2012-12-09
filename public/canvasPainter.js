function drawPopulation(population, canvasId) {
    for(var i=0; i<population.length; i++) {
        for(var j=0; j<population[i].length; j++) {
            if(population[i][j].isAlive()) {
                paintCircle(canvasId, i*10, j*10);
            }
        }
    }
}

function paintCircle(canvasId, x, y) {
    var canvas = document.getElementById(canvasId);
    var context = canvas.getContext("2d");
    context.beginPath();
    context.arc(x, y, 3.5, 0, 2*Math.PI);
    context.strokeStyle = 'blue';
    context.stroke();
    context.fillStyle = '#8ED6FF';
    context.fill();
}