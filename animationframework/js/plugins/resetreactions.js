Actor.prototype.triggerResetReactions = function(triggeredByAction, reactionTargetIndex){
  // l("triggering reset action on " + this.reactionTargets[reactionTargetIndex].filename);
  this.reactionTargets[reactionTargetIndex].resetReactions();
};

Actor.prototype.letsResetReactions = function(targetObject, appearLength, startVisible){
  this.reacts("this.triggerResetReactions(true, reactionTargetIndex)", 1, targetObject);
};
