function BeingPublic(actor, globalkey, triggeredByAction, reactionTargetIndex){

  /*

    INDEVELOPMENT

    public actors are synced across all instances of this animation

  */

  var beingPublic = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);

  beingPublic.reset = function(){
    this.resetPlugin(); // quasi "call to super";
  };
  beingPublic.reset();

  beingPublic.applybehavior = function(){

  };

  return beingPublic;
};

Actor.prototype.isPublic = function(globalkey, triggeredByAction, reactionTargetIndex) {
  this.addBehavior(new BeingPublic(this, globalkey, triggeredByAction, reactionTargetIndex));
  return this;
};


