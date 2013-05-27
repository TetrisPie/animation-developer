/* global Plugin, Actor, floatValueOfOr  */

function Appearing(actor, startAfter, appearLength, startsVisible, triggeredByAction, reactionTargetIndex){
  var appearing = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);

  appearing.originalOpacity = actor.currentOpacity;
  appearing.originalVisibility = actor.image.style.visibility;

  appearing.newOpacity = 0;
  appearing.opacityStep = 0;
  appearing.appearLength = appearLength;
  started = false;


  if ((typeof startsVisible !== 'undefined') && startsVisible === true) {
    appearing.startsVisible = true;
  } else {
    appearing.startsVisible = false;
  }

  appearing.cleanup = function(){
    this.cleanupPlugin();
    if (this.startsVisible) {
      this.targetObject.setVisible();
    }
  };

  appearing.reset = function () {
      this.resetPlugin(); // quasi "call to super";
      started = false;
      if (this.startsVisible) {
          this.targetObject.setVisible();
      } else {
          this.targetObject.setInvisible();
      }
      this.opacityStep = 60 / this.appearLength; // assuming 60 frames per second
  };
  appearing.reset();

  appearing.applybehavior = function () {
      if (!started) {
          this.resetStartAnimationTimestamp();
          started = true;
          return;
      }
      if (!this.done && (this.age() > startAfter)) {
          this.targetObject.setVisible();
          this.newOpacity = this.newOpacity.addUntilTarget(this.opacityStep, 1);
          this.targetObject.alterOpacity(this.newOpacity);
          this.isDoneWhen(this.targetObject.currentOpacity >= 1);
      }
  };
  return appearing;
}

Actor.prototype.appears = function(startAfter, appearLength, startsVisible, triggeredByAction, reactionTargetIndex) {
  var behavior = new Appearing(this, startAfter, appearLength, startsVisible, triggeredByAction, reactionTargetIndex);
  if(typeof triggeredByAction !== 'undefined'){
    behavior.triggeredByAction = triggeredByAction;
  }
  this.addBehavior(behavior);
  return this;
};

Actor.prototype.appearsOnTouch = function(appearLength){
  this.setInitialOpacity(0);
  this.reacts("this.appears(0," + appearLength + ", true, false, reactionTargetIndex);", 1);
  return this;
};

Actor.prototype.letsAppearStartsVisible = function(targetObject, appearLength){
  this.reacts("this.appears(0, " + floatValueOfOr(appearLength, 1000) + ", true, true, reactionTargetIndex);", 1, targetObject);
  return this;
};

Actor.prototype.letsAppear = function(targetObject, appearLength){
  targetObject.setInvisible();
  this.reacts("this.appears(0, " + floatValueOfOr(appearLength, 1000) + ", false, true, reactionTargetIndex);", 1, targetObject);
  return this;
};

Actor.prototype.letsAppear2 = function(targetObject, startAfter, appearLength){
  targetObject.setInvisible();
  this.reacts("this.appears(" + startAfter + ", " + floatValueOfOr(appearLength, 1000) + ", false, true, reactionTargetIndex);", 1, targetObject);
  return this;
};

