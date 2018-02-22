(function ($) {
    "use strict";
    
    var center = new Vector2d();
    var ctx;
    var f;
    var radius, weight;
    var angle;
    var loops;
    var shrink;
    var sons;
    var position;
    var nmax;
    var colors;
    var width, height;
    
    function drawInnerCurve(center, f, step, loops, sens, angle) {
	var na, v = new Vector2d();
	ctx.vectorMoveTo(v.set(center).move(angle,f(0)));
	for (var i = 1; i <= loops*step; i++) {
	    na = angle + 2 * i * Math.PI / step * sens;
	    ctx.vectorLineTo(v.set(center).move(na, f(i / (loops*step))));
	}
    }

    function drawOuterCurve(center, f, step, loops, sens, angle, c, s) {
	var i, t, v = new Vector2d(), oldv = new Vector2d(), a, p = Math.round(loops*step*position);
	for (i = loops*step; i >= 1; i--) {
	    t = i / (loops*step);
	    a = angle + 2 * i * Math.PI / step * sens;
	    v.set(center).move(a,f(t));
	    ctx.vectorLineTo(v);
	    if (i==p && p<=loops*step*position+1) {
	        c.push({c:v.clone(),g:v.clone().sub(oldv),t:t});
	        p = Math.round((s-c.length)*loops*step*position/s);
	    }
	    oldv.set(v);
	}
    }

    function drawSquid(center, radius, weight, loops, sens, angle, n) {
	var c = [];
	ctx.beginPath();
	drawInnerCurve(center, function (t) {return radius*f(t)}, 60, loops, sens, angle);
	drawOuterCurve(center, function (t) {return (weight+radius)*f(t)}, 60, loops, sens, angle, c, sons);
	ctx.fillStyle = colors(n);
	ctx.fill();
	ctx.stroke();
	ctx.closePath();
	drawSquidBabies(radius/shrink, weight, angle, sens, c, n+1);
    }

    function drawSquidBabies(radius, weight, angle, sens, c, n) {
	var v = new Vector2d(), w = new Vector2d();
	for (var i=0;i<c.length;i++) {
    	    if (n<nmax) {
		v.set(c[i].c).add(c[i].g.normal().normalize().multiply(radius*sens));
    		angle = w.set(c[i].c).sub(v).horizontalAngle();	   	    
    		drawSquid(v, radius, f(c[i].t)*weight, loops, (sens==1)?-1:1, angle, n);
    	    }
	}    
    }

    function drawBackground() {
	ctx = $('canvas')[0].getContext('2d');
	ctx.strokeStyle = "rgba(0,0,0,0.6)";
	ctx.shadowColor = "rgba(0,0,0,0.6)";
	ctx.shadowOffsetX = 0;
	ctx.shadowBlur = 70;

	center.set(0.5*width,0.9*height);
	f = function (t) {return (1-t)*(1-t);}
	radius = 350, weight = 100;
	angle = 3*Math.PI/5;
	loops = 3;
	shrink = 1.6;
	sons = 2;
	position = 4/24;
	nmax = 5;
	colors = function (n) {return "#FFFFFF";}
	
	drawSquid(center, radius, weight, loops, 1, angle, 0);
    }

    function drawTree() {
	
	ctx = $('canvas')[1].getContext('2d');
	ctx.strokeStyle = "rgba(0,0,0,0.6)";
	ctx.shadowColor = "rgba(0,0,0,0.6)";
	ctx.shadowOffsetX = 0;
	ctx.shadowBlur = 70;

	center.set(1.02*width,950);
	f = function (t) {return (1-t)*(1-t);}
	radius = 450, weight = 60;
	angle = 4*Math.PI/5;
	loops = 1;
	shrink = 1.6;
	sons = 3;
	position = 5/24;
	nmax = 8;
	colors = function (n) {
            if (n<6) ctx.fillStyle = "#3B2A18"; else ctx.fillStyle = "green";
	}
	
	drawSquid(center, radius, weight, loops, 1, angle, 0);
    }
    
    $(document).ready(function () {
	var m = "simon";
	m += "@";
	m += "guigui.us";

	width = $(window).width();
	height = $(window).height(); 

	$("#m").text(m).attr("href", "mailto:" + m);
	$('canvas').attr('height', height).attr('width',width);
	
	drawBackground();
	if ($('#tree').attr('display') != 'none') drawTree();
	
    });

})(jQuery);
