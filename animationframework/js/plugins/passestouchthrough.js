// doesn't work in Internet Explorer and Opera, only Webkit & Mozilla

Actor.prototype.passesTouchThrough = function(){
	this.image.style.pointerEvents = "none";
};