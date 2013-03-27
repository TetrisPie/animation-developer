var Reaction = function(actor, reactioncode, reactHowOften){
  this.actor = actor;
  this.reactioncode = reactioncode;
  this.reactHowOften = reactHowOften;
  this.runs = 0;

  if (notNumeric(this.reactHowOften) || this.reactHowOften < 0) {
    this.reactHowOften = 0;
  };

  this.reset = function(){
    if (this.runs > 0) {
      this.actor.image.style.cursor = 'pointer';
      this.runs = 0;
    };
  };

  return this;
};

Actor.prototype.react = function(){
  for (var i = 0; i < this.reactions.length; i++) {
    var myReaction = this.reactions[i];

    if ((myReaction.reactHowOften == 0) || (myReaction.runs < myReaction.reactHowOften)) {

      // l(myReaction.reactioncode.replace('reactionTargetIndex', i));   
      eval(myReaction.reactioncode.replace('reactionTargetIndex', i));   

      // update reaction counter:
      myReaction.runs++;

      // if this will be run no more, set cursor to 
      if ((myReaction.reactHowOften > 0) && (myReaction.runs >= myReaction.reactHowOften)) {
        this.image.style.cursor = 'auto';
      };
    };
  };
};

// The following are called via plugin/script:

Actor.prototype.reacts = function(reactioncode, reactHowOften, reactionTarget){
  this.image.style.cursor = 'pointer';
  reactionTarget = (typeof reactionTarget === 'undefined') ? this : reactionTarget;
  var reaction = new Reaction(this, reactioncode, reactHowOften, reactionTarget);
  this.reactions.push(reaction);
  this.reactionTargets.push(reactionTarget);
};

Actor.prototype.reactsOnce = function(reactioncode, reactionTarget){
  this.image.style.cursor = 'pointer';
  reactionTarget = (typeof reactionTarget === 'undefined') ? this : reactionTarget;
  var reaction = new Reaction(this, reactioncode, 1, reactionTarget);
  this.reactions.push(reaction);
};

Actor.prototype.reactsTwice = function(reactioncode, reactionTarget){
  this.image.style.cursor = 'pointer';
  reactionTarget = (typeof reactionTarget === 'undefined') ? this : reactionTarget;
  var reaction = new Reaction(this, reactioncode, 2, reactionTarget);
  this.reactions.push(reaction);
};
