function CountResetter(actor, triggeredByAction, reactionTargetIndex){
  var countresetter = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);

  countresetter.reset = function(){
    this.resetPlugin(); // quasi "call to super";
    this.targetObject.counter = parseInt(keyOr(this.targetObject.syncKey + "-counter", 0));
    this.targetObject.autosetCountertext();
  };
  countresetter.reset();

  return countresetter;
}

////////////////////

Actor.prototype.initializeCounterIfNeeded = function(initialAmount){
  if (typeof this.counterInitialized === 'undefined') {
    this.addBehavior(new CountResetter(this));
    this.counter = parseInt(keyOr(this.syncKey + "-counter", initialAmount || 0));
    this.counterInitialized = true;
  }
};

Actor.prototype.autosetCountertext = function(){
  if ((typeof this.hasTextDiv !== 'undefined') && (this.originalText.indexOf('%count%') >= 0)) {
    this.setText(this.originalText.replace('%count%', this.counter)) ;
  } else {
    this.setText(this.counter);
  }
  if(this.syncs) updateKey(this.syncKey + "-counter", this.counter);
  return this;
};

////////////////////

Actor.prototype.addsToCounter = function(amount, triggeredByAction, reactionTargetIndex) {
  var targetObject = triggeredByAction ? this.reactionTargets[reactionTargetIndex] : this;
  targetObject.counter = parseInt(targetObject.counter) + amount;
  targetObject.autosetCountertext();
  return this;
};

Actor.prototype.letsAddToCounter = function(targetObject, amount){
  targetObject.initializeCounterIfNeeded();
  this.reacts("this.addsToCounter(" + amount + ", true, reactionTargetIndex);", 0, targetObject);
  return this;
};

////////////////////

Actor.prototype.multipliesCounter = function(amount, triggeredByAction, reactionTargetIndex) {
  var targetObject = triggeredByAction ? this.reactionTargets[reactionTargetIndex] : this;
  targetObject.counter = parseInt(targetObject.counter) * amount;
  targetObject.autosetCountertext();
  return this;
};

Actor.prototype.letsMultiply = function(targetObject, amount){
  targetObject.initializeCounterIfNeeded();
  this.reacts("this.multipliesCounter(" + amount + ", true, reactionTargetIndex);", 0, targetObject);
  return this;
};