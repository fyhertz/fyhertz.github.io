var ctx, center = new Vector2d(0,0);
var f = function (t) {return (1-t)*(1-t);}
var radius = 450, weight = 60;
var angle = 4*Math.PI/5;
var loops = 1;
var shrink = 1.6;
var sons = 3;
var position = 5/24;
var nmax = 8;

function drawInnerCurve(center, f, step, loops, sens, angle) {
    ctx.vectorMoveTo(center.deplace(angle,f(0)));
    for (var i = 1; i <= loops*step; i++) {
	     na = angle + 2 * i * Math.PI / step * sens;
	     ctx.vectorLineTo(center.deplace(na, f(i / (loops*step))));
    }
}

function drawOuterCurve(center, f, step, loops, sens, angle, c, s) {
    var i, t, v, oldv, a, p = Math.round(loops*step*position), w;
    for (i = loops*step; i >= 1; i--) {
	     t = i / (loops*step);
	     a = angle + 2 * i * Math.PI / step * sens;
	     v = center.deplace(a,f(t));
	     ctx.vectorLineTo(v);
	     if (i==p && p<=loops*step*position+1) {
	         c.push({c:v,g:v.substract(oldv),t:t});
	         p = Math.round((s-c.length)*loops*step*position/s);
	     }
	     oldv = v;
    }
}


function drawSquid(center, radius, weight, loops, sens, angle, n) {
    var c = [];
    ctx.beginPath();
    drawInnerCurve(center, function (t) {return radius*f(t)}, 60-n*6, loops, sens, angle);
    drawOuterCurve(center, function (t) {return (weight+radius)*f(t)}, 60, loops, sens, angle, c, sons);  
    if (n<6) ctx.fillStyle = "#3B2A18"; else ctx.fillStyle = "green";
    ctx.fill();
    ctx.stroke();
    drawSquidBabies(radius/shrink, weight, angle, sens, c, n+1);
}

function drawSquidBabies(radius, weight, angle, sens, c, n) {
    for (var i=0;i<c.length;i++) {
    	  if (n<nmax) {
    	      v = c[i].c.add(c[i].g.normal().normalize().multiply(radius*sens));
    	      angle = c[i].c.substract(v).horizontalAngle();	   	    
    	      drawSquid(v, radius, f(c[i].t)*weight, loops, (sens==1)?-1:1, angle, n);
    	  }
    }    
}

$(document).ready(function () {

    var m = "simon";
    m += "@";
    m += "guigui.us";
    $("#m").text(m).attr("href", "mailto:" + m);
    
    var canvas = $('canvas');

    canvas.attr('height',$(window).height());
    center.set(1050,900);

    ctx = canvas[0].getContext('2d');
    ctx.strokeStyle = "rgba(0,0,0,0.6)";
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowOffsetX = 0;
    ctx.shadowBlur = 70;

    drawSquid(center, radius, weight, loops, 1, angle, 0);
    
});
