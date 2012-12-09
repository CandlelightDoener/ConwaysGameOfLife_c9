function drawPopulation(population, canvasId) {
    var canvas = document.getElementById(canvasId);
    var context = canvas.getContext("2d"); 
    context.clearRect(0, 0, canvas.width, canvas.height);

    for(var i=0; i<population.length; i++) {
        for(var j=0; j<population[i].length; j++) {
            if(population[i][j].isAlive()) {
                paintLivingCell(context, i*10, j*10);
            } else {
                paintDeadCell(context, i*10, j*10);
            }
        }
    }
}

function paintLivingCell(context, x, y) {
    context.beginPath();
    context.arc(x, y, 3.5, 0, 2*Math.PI);
    context.strokeStyle = 'blue';
    context.stroke();
    context.fillStyle = '#8ED6FF';
    context.fill();
}


function paintDeadCell(context, x, y) {
    context.beginPath();
    context.arc(x, y, 0.5, 0, 2*Math.PI);
    context.strokeStyle = 'red';
    context.stroke();
    context.fillStyle = 'red';
    context.fill();
}