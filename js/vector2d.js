function Vector2d(x,y) {
    this.x = x;
    this.y = y;
}

Vector2d.prototype = {
    set: function (x,y) {
	if (typeof y == "undefined") {
	    this.x = x.x;
	    this.y = x.y;
	}
	else {
	    this.x = x;
	    this.y = y;
	}
	return this;
    },
    horizontalAngle: function () {
	return this.y>0 ? Math.acos(this.x/this.norm()) : -Math.acos(this.x/this.norm());
    },
    norm: function () {
	return Math.sqrt(this.x*this.x+this.y*this.y);
    },
    normalize: function () {
	var n = this.norm();
	this.x /= n;
	this.y /= n;
	return this;
    },
    add: function (v) {
	this.x += v.x;
	this.y += v.y;
	return this;
    },
    sub: function (v) {
	this.x -= v.x;
	this.y -= v.y;
	return this;
    },    
    multiply: function (t) {
	this.x = this.x*t;
	this.y = this.y*t;
	return this;
    },
    normal: function () {
	var a = this.x;
	this.x = -this.y;
	this.y = a;
	return this;
    },
    scalar: function (v) {
	return this.x*v.x+this.y*y;
    },
    move: function (angle, distance) {
	this.x += distance * Math.cos(angle);
	this.y += distance * Math.sin(angle);
	return this;
    },
    clone: function (v) {
	return new Vector2d(this.x, this.y);
    },
    distSquared: function(v) {
	return (this.x-v.x)*(this.x-v.x)+(this.y-v.y)*(this.y-v.y);
    },
    dist: function(v) {
	return Math.sqrt(this.distSquared(v));
    },
    print: function () {
	console.log(this.x+" "+this.y);
    }
}

$.extend(CanvasRenderingContext2D.prototype,{
    vectorMoveTo: function (v) {
	this.moveTo(v.x,v.y);
    },
    vectorLineTo: function (v) {
	this.lineTo(v.x,v.y);
    }
});
