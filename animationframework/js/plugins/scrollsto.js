function ScrollingTo(actor, targetX, targetY, forceX, forceY, leaveScrollbarInvisible, triggeredByAction, reactionTargetIndex){
  var scrollingto = new Plugin(0, 0.5);

  scrollingto.triggeredByAction = triggeredByAction;

  scrollingto.reset = function(){
    this.force = {x: forceX, y: forceY};
    this.finishedScrollingTo = false;
  };
  scrollingto.reset();

  scrollingto.applybehavior = function () {
      if (!this.finishedScrollingTo) {
          var moveVector = vector(window.animation.stageDiv.scrollLeft, window.animation.stageDiv.scrollTop, targetX, targetY);
          if (moveVector.distance > 2) {
              window.animation.stageDiv.style.overflowX = "hidden";
              window.animation.stageDiv.style.overflowY = "hidden";
              window.animation.stageDiv.scrollLeft += this.force.x * moveVector.x;
              window.animation.stageDiv.scrollTop += this.force.y * moveVector.y;
          } else {
              this.finishedScrollingTo = true;
              if (leaveScrollbarInvisible){ 
              window.animation.stageDiv.style.overflowX = "hidden";
              window.animation.stageDiv.style.overflowY = "hidden";
              } else { 
              window.animation.currentScene.setScrolling(); 
              }
          };
      };
  };
  return scrollingto;
};

// --------------------------------

Actor.prototype.scrollsTo = function(targetX, targetY, forceX, forceY, leaveScrollbarInvisible, triggeredByAction, reactionTargetIndex) {
  triggeredByAction = (typeof triggeredByAction === 'undefined') ? false : triggeredByAction
  var behavior = new ScrollingTo(this, targetX, targetY, forceX, forceY, leaveScrollbarInvisible, triggeredByAction, reactionTargetIndex)
  this.addBehavior(behavior);
  return this;
};

Actor.prototype.scrollsToOnTouch = function(targetX, targetY, forceX, forceY){
  this.reacts("this.scrollsTo(" + targetX + "," + targetY + "," + forceX + "," + forceY + ", false, true, reactionTargetIndex);", 1);
  return this;
};

Actor.prototype.scrollsToOnTouch2 = function(targetX, targetY, forceX, forceY){
  this.reacts("this.scrollsTo(" + targetX + "," + targetY + "," + forceX + "," + forceY + ", true, reactionTargetIndex);", 1);
  return this;
};



