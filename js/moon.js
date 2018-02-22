(function ($) {
    "use strict";

    var face = ":)";
    var radius = 150;
    var p = new Vector2d();
    var center = new Vector2d();
    var m = new Vector2d();
    var ctx;
    var width, height;
    var state = 0;
    var resetTimer = 0;
    
    function handleMouse(event) {
	p.set(event.clientX, event.clientY);
    }
    
    function init() {
	var canvas = $('#moon');
	
	width =  $(window).width();
	height = $(window).height();

	center = new Vector2d(0.64*width, 300);
	m = new Vector2d(0.64*width, -300);
	
	canvas.attr('height', height).attr('width', width);
	ctx = canvas[0].getContext('2d');
	ctx.strokeStyle = "rgba(0,0,0,1)";
	ctx.shadowColor = "rgba(255,255,255,0.6)";
	ctx.shadowOffsetX = 0;
	ctx.shadowBlur = 100;
	ctx.fillStyle = "#cccccc"
	ctx.font = "bold 200px Arial";
	ctx.textAlign = "center";
	document.onmousemove = handleMouse;
    }

    function update() {
	var d1, d2, a, b, v = new Vector2d();

	d1 = p.distSquared(center);
	if (d1 < 300*300) {
	    if (resetTimer) {
		clearTimeout(resetTimer);
		resetTimer = 0;
		face = ":|";
		state = 1;
	    }
	} else if (d1 > 320*320) {
	    if (resetTimer == 0) {
		resetTimer = setTimeout(function() {
		    face = ":)";
		    state = 0;
		}, 10);
		console.log(resetTimer);
	    }
	}

	if (state == 1) {
	    a = v.set(center).sub(p).horizontalAngle();
	    v.set(p).move(a, 500);
	    d2 = v.distSquared(m);
	    if (d2>5) {
		a = Math.pow(d2,1/4)/1+1;
		m.add(v.sub(m).normalize().multiply(a));
	    }
	} else {
	    d2 = m.distSquared(center);
	    if (d2>5) {
		a = Math.pow(d2,1/4)/1+1;
		m.add(v.set(center).sub(m).normalize().multiply(a));
	    }
	}
	
    }
    
    function draw () {
	ctx.beginPath();
	ctx.clearRect(0, 0, width, height);
	ctx.arc(m.x, m.y, radius, 0, 2 * Math.PI, false);
	ctx.fill();
	ctx.stroke();
	ctx.save();
	ctx.fillStyle = "#999999"
	ctx.shadowBlur = 0;
	ctx.translate(m.x, m.y);
	ctx.rotate(Math.PI/2);
	ctx.fillText(face,-40, 50);
	ctx.restore();
	ctx.closePath();
    }

    function loop(ts) {
	update();
	draw();
	window.requestAnimationFrame(loop);
    }
    
    $(document).ready(function () {
	init();
	window.requestAnimationFrame(loop);
    });
    
    
})(jQuery);
