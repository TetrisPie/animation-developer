/* global Plugin, Actor, floatValueOfOr */ 

function PlayVideo(actor, startAfter, startsAt, playLength, triggeredByAction, reactionTargetIndex){
  var playing = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);

  playing.originalPlayTime = actor.image.currentTime * 1000;
  playing.newPlayTime = startsAt;
  playing.playLength = playLength;
  playing.initVideo = true;

  if (typeof startsAt == 'undefined') {
    playing.startsAtBegin = true;
  } else {
    playing.startsAtBegin = false;
  }

  playing.cleanup = function () {
      this.cleanupPlugin();
      this.targetObject.image.pause();
      if (this.startsAtBegin) {
          this.targetObject.image.currentTime = 0;
      } else {
          this.targetObject.image.currentTime = playing.newPlayTime/1000;
      }
  };

  playing.reset = function () {
        if (playing.initVideo) {
            if (this.targetObject.image.currentSrc != '') {
                if (this.startsAtBegin) {
                    this.targetObject.image.currentTime = 0;
                } else {
                    this.targetObject.image.currentTime = playing.newPlayTime / 1000;
                }
                playing.initVideo = false;
            }
        }
      this.resetPlugin(); // quasi "call to super";
  };
  playing.reset();

  playing.applybehavior = function () {
      if (!this.done && (this.targetObject.age() > startAfter)) {
          this.targetObject.image.play();
          this.isDoneWhen(true)
      }
  };
  return playing;
}

Actor.prototype.playvideo = function (startAfter, startsAt, playLength, triggeredByAction, reactionTargetIndex) {
    var behavior = new PlayVideo(this, startAfter, startsAt, playLength, triggeredByAction, reactionTargetIndex);
    if (typeof triggeredByAction !== 'undefined') {
        behavior.triggeredByAction = triggeredByAction;
    }
    this.addBehavior(behavior);
    return this;
};

/*

Actor.prototype.playvideoOnTouch = function(appearLength){
  this.reacts("this.playvideo(0," + appearLength + ", true, true, reactionTargetIndex);", 1);
  return this;
};

Actor.prototype.resumevideoOnTouch = function(appearLength){
  this.reacts("this.playvideo(0," + appearLength + ", true, false, reactionTargetIndex);", 1);
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

*/
