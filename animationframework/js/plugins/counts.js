function CountResetter(actor, triggeredByAction, reactionTargetIndex){
  var countresetter = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);

  countresetter.reset = function(){
    this.resetPlugin(); // quasi "call to super";
    this.targetObject.counter = 0;
    this.targetObject.addsToCounter(0);
  };
  countresetter.reset();

  return countresetter
}


Actor.prototype.letsCount = function(targetObject, amount){
  targetObject.addBehavior(new CountResetter(targetObject));
  targetObject.counter = 0;
  targetObject.addsToCounter(0);
  this.reacts("this.addsToCounter(" + amount + ", true, reactionTargetIndex);", 0, targetObject);
};


Actor.prototype.addsToCounter = function(amount, triggeredByAction, reactionTargetIndex) {
  var targetObject;

  if (triggeredByAction) {
    targetObject = this.reactionTargets[reactionTargetIndex];
  } else {
    targetObject = this;
  };

  targetObject.counter += amount;

  if (typeof targetObject.hasTextDiv === 'undefined') {
    targetObject.setText(targetObject.counter);
  } else {
    if (targetObject.originalText.indexOf('%count%') >= 0) {
      targetObject.setText(targetObject.originalText.replace('%count%', targetObject.counter)) ;
    } else {
     targetObject.setText(targetObject.counter);      
    };
  };
};


Actor.prototype.multipliesCounter = function(amount, triggeredByAction, reactionTargetIndex) {
  var targetObject;

  if (triggeredByAction) {
    targetObject = this.reactionTargets[reactionTargetIndex];
  } else {
    targetObject = this;
  };

  targetObject.counter *= amount;

  if (typeof targetObject.hasTextDiv === 'undefined') {
    targetObject.setText(targetObject.counter);
  } else {
    if (targetObject.originalText.indexOf('%count%') >= 0) {
      targetObject.setText(targetObject.originalText.replace('%count%', targetObject.counter)) ;
    } else {
     targetObject.setText(targetObject.counter);      
    };
  };
};

Actor.prototype.letsMultiply = function(targetObject, amount){
  targetObject.counter = 0;
  this.reacts("this.multipliesCounter(" + amount + ", true, reactionTargetIndex);", 0, targetObject);
};