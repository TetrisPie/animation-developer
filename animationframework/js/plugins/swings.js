function Swinging(actor, radius, hertz, swingcenterX, swingcenterY, degreeOffset, triggeredByAction, reactionTargetIndex){
  var swinging = new Plugin(0, 0, actor, triggeredByAction, reactionTargetIndex);
  swinging.degrees = 0; // used/set later
  swinging.runningValue = 0; // used/set later
  swinging.radius = radius;
  swinging.hertz = hertz;
  swinging.swingcenterX = swingcenterX;
  swinging.swingcenterY = swingcenterY;
  swinging.degreeOffset = degreeOffset;

  swinging.reset = function(){
    this.oldDegrees = 0;
    this.newDegrees = 0;
    this.firstRun = true;
  }

	swinging.applybehavior = function(){
		this.runningValue = Math.sin((new Date) * this.hertz/1000);
		this.degrees = (this.runningValue * this.radius);

    if (this.firstRun) {
      this.firstRun = false;      
    } else {
      this.targetObject.tilt = this.degreeOffset + (this.degrees/2);

      this.targetObject.image.style.transformOrigin = this.swingcenterX + 'px ' + this.swingcenterY + 'px';
      this.targetObject.image.style.webkitTransformOrigin = this.swingcenterX + 'px ' + this.swingcenterY + 'px';
      this.targetObject.image.style.msTransformOrigin = this.swingcenterX + 'px ' + this.swingcenterY + 'px';

      this.targetObject.image.style.transform = 'rotate(' + this.targetObject.tilt + 'deg)'; // Webkit (Chrome, Safari)
      this.targetObject.image.style.webkitTransform = 'rotate(' + this.targetObject.tilt + 'deg)'; // Webkit (Chrome, Safari)
      this.targetObject.image.style.msTransform = 'rotate(' + this.targetObject.tilt + 'deg)'; // Internet Explorer
    }

	};

  return swinging;
};

Actor.prototype.swings = function(radius, hertz, swingcenterX, swingcenterY, degreeOffset, triggeredByAction, reactionTargetIndex) {
  this.addBehavior(new Swinging(this, radius, hertz, swingcenterX, swingcenterY, degreeOffset, triggeredByAction, reactionTargetIndex));
};
