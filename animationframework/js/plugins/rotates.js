function Rotating(actor, hertz, triggeredByAction, reactionTargetIndex){
  var rotating = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);
  rotating.spin = 360/60*hertz; // framerate 60
  rotating.applybehavior = function(){
    this.targetObject.spin += this.spin;
  };

  return rotating;
};

Actor.prototype.rotates = function(hertz, triggeredByAction, reactionTargetIndex) {
  var behaviour = new Rotating(this, hertz, triggeredByAction, reactionTargetIndex);
  this.addBehavior(behaviour);
  return this;
};

Actor.prototype.rotatesOnTouch = function(hertz, reactsHowOften, triggeredByAction, reactionTargetIndex) {
  this.reacts("this.rotates(" + hertz + ", true, reactionTargetIndex);", reactsHowOften);
  return this;
};

Actor.prototype.letsRotate = function(targetObject, hertz, reactsHowOften){
  this.reacts("this.rotates(" + hertz + ", true, reactionTargetIndex);", reactsHowOften, targetObject);
  return this;
};
