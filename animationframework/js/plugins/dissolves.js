/* global Plugin, Actor, floatValueOfOr  */

function Dissolving(actor, startAfter, dissolveLength, triggeredByAction, reactionTargetIndex){
  var dissolving = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);
  dissolving.originalOpacity = actor.currentOpacity;
  dissolving.originalVisibility = actor.image.style.visibility;
  dissolving.startAfter = startAfter;
  dissolving.newOpacity = 0;
  dissolving.opacityStep = 60 / dissolveLength; // assuming 60 frames per seconds
  started = false;

  dissolving.reset = function(){
    this.resetPlugin();
    started = false;
    this.newOpacity = this.originalOpacity;
    this.targetObject.image.style.visibility = this.originalVisibility;
    this.targetObject.alterOpacity(this.originalOpacity);
  };
  dissolving.reset();

  dissolving.cleanup = function(){
    this.targetObject.image.style.visibility = this.originalVisibility;
    this.targetObject.alterOpacity(this.originalOpacity);
  };

  dissolving.applybehavior = function(){
    if (!started) {
          this.resetStartAnimationTimestamp();
          started = true;
      }
    if (!this.done && (this.age() > this.startAfter)) {
      this.newOpacity = this.newOpacity.subtractUntilZero(this.opacityStep);
      this.targetObject.alterOpacity(this.newOpacity);

      this.isDoneWhen(this.newOpacity <= 0 && this.targetObject.currentOpacity <= 0);
      if (this.done) {
        this.targetObject.setInvisible();
      }
    }
  };

  return dissolving;
}

Actor.prototype.dissolves = function(startAfter, dissolveLength, triggeredByAction, reactionTargetIndex) {
  var behavior = new Dissolving(this, startAfter, dissolveLength, triggeredByAction, reactionTargetIndex);
  if(typeof triggeredByAction !== 'undefined'){
    behavior.triggeredByAction = triggeredByAction;
  }
  this.addBehavior(behavior);
  return this;
};

Actor.prototype.dissolvesOnTouch = function(dissolveLength){
  this.reacts("this.dissolves(0, " + floatValueOfOr(dissolveLength, 1000) + ", true, reactionTargetIndex);", 1);
  return this;
};

Actor.prototype.dissolvesOnTouch2 = function(startAfter, dissolveLength){
  this.reacts("this.dissolves(" + startAfter + ", " + floatValueOfOr(dissolveLength, 1000) + ", true, reactionTargetIndex);", 1);
  return this;
};

Actor.prototype.letsDissolve = function(targetObject, dissolveLength){
  this.reacts("this.dissolves(0, " + floatValueOfOr(dissolveLength, 1000) + ", true, reactionTargetIndex);", 1, targetObject);
  return this;
};

Actor.prototype.letsDissolve2 = function(targetObject, startAfter, dissolveLength){
  this.reacts("this.dissolves(" + startAfter + ", " + floatValueOfOr(dissolveLength, 1000) + ", true, reactionTargetIndex);", 1, targetObject);
  return this;
};

