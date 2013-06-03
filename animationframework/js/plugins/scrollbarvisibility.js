function ScrollbarVisibility(actor, visible, triggeredByAction, reactionTargetIndex){
  var scrollbarVisibility = new Plugin(0, 0.5);

  scrollbarVisibility.triggeredByAction = triggeredByAction;

  scrollbarVisibility.reset = function(){
    this.finishedVisibility = false;
  };
  scrollbarVisibility.reset();

  scrollbarVisibility.applybehavior = function () {
      if (!this.finishedVisibility) {
        if (!visible) {
            window.animation.stageDiv.style.overflow = 'hidden';
        } else {
            window.animation.currentScene.setScrolling();
        };
      };
      this.finishedVisibility = true; 
  };
  return scrollbarVisibility;
};

// --------------------------------

Actor.prototype.scrollbarVisibility = function(visible, triggeredByAction, reactionTargetIndex) {
  triggeredByAction = (typeof triggeredByAction === 'undefined') ? false : triggeredByAction
  var behavior = new ScrollbarVisibility(this, visible, triggeredByAction, reactionTargetIndex)
  this.addBehavior(behavior);
  return this;
};

Actor.prototype.scrollbarVisibleOnTouch = function(){
  this.reacts("this.scrollbarVisibility(true , true, reactionTargetIndex);", 1);
  return this;
};

Actor.prototype.scrollbarInvisibleOnTouch = function(){
  this.reacts("this.scrollbarVisibility(false , true, reactionTargetIndex);", 1);
  return this;
};



