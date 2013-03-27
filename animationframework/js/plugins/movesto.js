// moves the actor towards a certain point

function MovingTo(actor, targetX, targetY, forceX, forceY, triggeredByAction, reactionTargetIndex){
  var movingto = new Plugin(0, 0.5);
  
  movingto.triggeredByAction = triggeredByAction;
  movingto.actor = actor;

  // l("triggeredByAction: " + triggeredByAction);

  if (isNumeric(reactionTargetIndex)) {
    movingto.targetObject = actor.reactionTargets[reactionTargetIndex];
  } else {
    movingto.targetObject = actor;
  };

  movingto.reset = function(){
    this.force = {x: forceX, y: forceY};
    this.finishedMovingTo = false;
  };
  movingto.reset();

  movingto.applybehavior = function(){
    if (!this.finishedMovingTo) {
      var moveVector = vector(this.targetObject.position.x, this.targetObject.position.y, targetX, targetY);
      if(moveVector.distance > 2){
        this.targetObject.vector.x += this.force.x * moveVector.x;
        this.targetObject.vector.y += this.force.y * moveVector.y;
      } else {
        this.finishedMovingTo = true;
      };      
    };
  };
  return movingto;
};

// --------------------------------

Actor.prototype.movesTo = function(targetX, targetY, forceX, forceY, triggeredByAction, reactionTargetIndex) {
  triggeredByAction = (typeof triggeredByAction === 'undefined') ? false : triggeredByAction

  for (var i = this.behaviors.length - 1; i >= 0; i--) {
    try {
      this.behaviors[i].finishedMovingTo = true;      
    }
    catch(e){}
  };

  for (var i = this.scene.actors.length - 1; i >= 0; i--) {
    for (var j = 0; j < this.scene.actors[i].behaviors.length; j++){
      try {
        if (this.scene.actors[i].reactionTargets[j].filename === this.filename) {
          this.scene.actors[i].behaviors[j].finishedMovingTo = true;   
          l("finished");
        };
      }
      catch(e){
        l("not applicable");
      }
    };
  };

  var behavior = new MovingTo(this, targetX, targetY, forceX, forceY, triggeredByAction, reactionTargetIndex)
  this.addBehavior(behavior);
};

Actor.prototype.movesToOnTouch = function(targetX, targetY, forceX, forceY){
  this.reacts("this.movesTo(" + targetX + "," + targetY + "," + forceX + "," + forceY + ", true, reactionTargetIndex);", 1);
};

Actor.prototype.letsMoveTo = function(targetObject, targetX, targetY, forceX, forceY){
  this.reacts("this.movesTo(" + targetX + "," + targetY + "," + forceX + "," + forceY + ", true, reactionTargetIndex);", 1, targetObject);
};

Actor.prototype.movesToOnTouch = function(targetX, targetY, forceX, forceY){
  this.reacts("this.movesTo(" + targetX + "," + targetY + "," + forceX + "," + forceY + ", true, reactionTargetIndex);", 1);
};
