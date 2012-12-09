function paintCircle(x, y) {
    var world = document.getElementById("world");
    var kontext = world.getContext("2d");
    kontext.beginPath();
    kontext.arc(x, y, 3.5, 0, 2*Math.PI);
    kontext.strokeStyle = 'blue';
    kontext.stroke();
    kontext.fillStyle = '#8ED6FF';
    kontext.fill();
}