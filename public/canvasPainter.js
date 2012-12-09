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