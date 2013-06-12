/* global createDiv, Actor */
/* exported Scene */

function Scene(id, title, width, height){
  this.id = id;
  this.title = (typeof title !== 'undefined' ? title : id);
  this.div = createDiv(id, 'scene');

  this.isVisible = false;
  this.actors = [];
  this.texts = [];
  this.textDisplaying = true;
  this.alwaysShowsText = false;
  this.scrollingLocked = false;
  this.displayedAt = Date.now();
  scrollingPerspectiveStrength = 'undefined';

  // dimensions of the scene's div and related settings -->
  this.dimensions = {};
  this.dimensions.x = (typeof width !== 'undefined') ? parseInt(width, 10) : 0;
  this.dimensions.y = (typeof height !== 'undefined') ? parseInt(height, 10) : 0;
  // <-- dimensions of the scene's div and related settings

  this.scrollToZero = function(){
    // Useful for triggering scroll-event
    this.scrollTo(100,100);
    this.scrollTo(0,0);
  };
  this.scrollToZero();

  this.setSzeneSizeToStageIfNotSetInScenedefinition = function(newWidth, newHeight){
    // width
    if (this.dimensions.x === 0) this.dimensions.x = parseInt(newWidth, 10);
    this.div.style.width = this.dimensions.x + 'px';
    // height
    if (this.dimensions.y === 0) this.dimensions.y = parseInt(newHeight, 10);
    this.div.style.height = this.dimensions.y + 'px';
  };

  this.setDivSizeToStage = function(myWidth, myHeight){
    setDivSize(this.div, window.animation.width, window.animation.height);
  };
3
  this.resetAge = function(){
    this.displayedAt = Date.now();
    return this.displayedAt;
  };

  this.age = function(){
    return Date.now() - this.displayedAt;
  };

  this.alwaysShowText = function(){
    this.alwaysShowsText = true;
  };

  // scene itself should preload as minimum,
  // further preload-scenes are added by the navigates-plugin
  this.preloadSceneIds = [id];

  this.resetActors = function(){
    for (var i = this.actors.length - 1; i >= 0; i--) {
      this.actors[i].reset();
    }
  };

  this.removeBehaviorsThatCameFromReacts = function(){
    for (var i = this.actors.length - 1; i >= 0; i--) {
      try {
        this.actors[i].removeBehaviorsThatCameFromReacts();
      } catch(e){}
    }
  };

  this.makeVisible = function () {
    this.scrollToZero();
    this.div.style.display = 'block';
    this.isVisible = true;
    this.scrollingLocked = false;
    this.setScrolling();

    // EXPERIMENTAL
    this.div.style.width = width + "px";
    this.div.style.height = height + "px";
  };

  this.makeInvisible = function(){
    this.div.style.display = 'none';
    this.isInvisible = false;
    this.resetActors(); // while we are at it
    this.removeBehaviorsThatCameFromReacts();
  };
  this.makeInvisible(); // start out invisible

  this.cleanup = function () {
    for (var i = this.actors.length - 1; i >= 0; i--) {
      this.actors[i].cleanupBehaviors();
    }
    this.scrollingLocked = false;
  };

  this.makeOthersInvisible = function(){
    var showTextInCurrent = window.animation.textIsDisplaying;
    for (var i = window.animation.loadedScenes.length - 1; i >= 0; i--) {
      if (window.animation.loadedScenes[i].id.match(this.id)) {
        this.makeVisible();
      } else {
        window.animation.loadedScenes[i].makeInvisible();
        window.animation.loadedScenes[i].hideText();
      }
    }

    if (showTextInCurrent || this.alwaysShowsText) {
      this.showText();
    } else {
      this.hideText();
    }

    window.animation.textIsDisplaying = showTextInCurrent;
  };

  this.mute = function(){
    for (var i = 0; i < this.actors.length; i++) {
      try {
        this.actors[i].pauseAudio();
      } catch(e){}
    }
  };

  this.muteOthers = function(){
    for (var i = window.animation.loadedScenes.length - 1; i >= 0; i--) {
      if (!window.animation.loadedScenes[i].id.match(this.id)) {
        window.animation.loadedScenes[i].mute();
      }
    }
  };

  this.enterActors = function(){
    for (var i = 0; i < this.actors.length; i++) {
      this.actors[i].enter(this);
    }
  };

  this.write = function(myX, myY, html, cssclass){
    var newText = document.createElement('div');
    newText.innerHTML = html;
    newText.setAttribute('class', 'text ' + (typeof cssclass === "undefined" ? "" : cssclass));
    newText.style.left = myX + 'px';
    newText.style.top = myY + 'px';
    this.div.appendChild(newText);
    this.texts.push(newText);
  };

  this.showText = function(){
    this.textDisplaying = true;
    for (var i = this.texts.length - 1; i >= 0; i--) {
      this.texts[i].style.visibility = 'visible';
    }
    window.animation.textIsDisplaying = true;
  };

  this.hideText = function(){
    this.textDisplaying = false;
    for (var i = this.texts.length - 1; i >= 0; i--) {
      this.texts[i].style.visibility = 'hidden';
    }
    window.animation.textIsDisplaying = false;
  };

  return this;
}

Scene.prototype.scrollTo = function (x, y) {
  if (typeof x !== 'undefined') window.animation.stageDiv.scrollLeft = x;
  if (typeof y !== 'undefined') window.animation.stageDiv.scrollTop = y;
};

Scene.prototype.lockScrolling = function () {
  this.scrollingLocked = true;
  this.setScrolling();
};

Scene.prototype.unlockScrolling = function () {
  this.scrollingLocked = false;
  this.setScrolling();
};

Scene.prototype.setScrolling = function () {
  if ((this.dimensions.x > window.animation.width) && !(this.scrollingLocked)) {
    window.animation.stageDiv.style.overflowX = "scroll";
  } else {
    window.animation.stageDiv.style.overflowX = "hidden";
  }

  if ((this.dimensions.y > window.animation.height) && !(this.scrollingLocked)) {
    window.animation.stageDiv.style.overflowY = "scroll";
  } else {
    window.animation.stageDiv.style.overflowY = "hidden";
  }
};
