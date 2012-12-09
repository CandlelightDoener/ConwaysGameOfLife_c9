var pixelPerField = 10;
var radiusOfField = pixelPerField / 2;

function stretchCanvasToSize(width, height, canvasId) {
    var canvas = document.getElementById(canvasId);
    var context = canvas.getContext("2d"); 
    context.canvas.width = width;
    context.canvas.height = height;
}

function drawPopulation(population, canvasId) {
    var canvas = document.getElementById(canvasId);
    var context = canvas.getContext("2d"); 
    context.clearRect(0, 0, canvas.width, canvas.height);

    for(var i=0; i<population.length; i++) {
        for(var j=0; j<population[i].length; j++) {
            if(population[i][j].isAlive()) {
                paintLivingCell(context, i*pixelPerField, j*pixelPerField);
            } else {
                paintDeadCell(context, i*pixelPerField, j*pixelPerField);
            }
        }
    }
}

function paintLivingCell(context, x, y) {
    //context.fillStyle = '#8ED6FF';
    context.fillStyle = "rgba(142, 214, 255, 0.5)";
    context.strokeStyle = 'blue';
    context.fillRect(x, y, pixelPerField, pixelPerField);
    context.strokeRect(x, y, pixelPerField, pixelPerField);
}

function paintDeadCell(context, x, y) {
    context.beginPath();
    context.arc(x + radiusOfField, y + radiusOfField, 1, 0, 2*Math.PI);
    context.strokeStyle = "rgba(255, 204, 0, 0.2)";
    context.stroke();
}