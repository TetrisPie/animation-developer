Actor.prototype.isInLayer = function(layerNumber, factorX, factorY) {
  this.layer = layerNumber;

  if (typeof(this.scene.layers) == 'undefined') {
    // create the layers-array in this scene if necessary
    this.scene.layers = [];
  }

  if (typeof this.scene.layers[layerNumber] == 'undefined') {
    // create this layer if missing
    this.scene.layers[layerNumber] = [];
  }

  // put this actor in its layer
  this.scene.layers[layerNumber].push(this);

  var myactor = this;

  if (this.scene.handheldPerspectiveIsSet) {
    window.shiftByOrientation = function(){
      if (window.DeviceOrientationEvent) {
        bindEvent(window, "deviceorientation", function () {
            if (window.orientation === "portrait") {
              myactor.shiftAbsolute((myactor.scene.perspecticeFactorX * event.gamma/5.0), (myactor.scene.perspecticeFactorX * event.beta/5.0));
            } else {
              // on iPads that are held in landscape mode
              // the deviceorientation change event still delivers
              // coordinates as if the device was being held in portrait mode,
              // therefore we switch them when shifting
              myactor.shiftAbsolute((myactor.scene.perspecticeFactorX * event.beta/5.0), (myactor.scene.perspecticeFactorX * event.gamma/5.0));
            }
        }, true);
      }
    };
    window.shiftByOrientation();
  }

  return this;
};

/*
  In order to change the perspective with the movement of the iPad, the
  scene-script has to set how x- and y-tilting affect the x- and y-perspectives.
  This is done via the function scene.handheldPerspective().
*/
// Scene.prototype.handheldPerspectiveIsSet = false; // default: ignore device-tilting
// Scene.prototype.handheldPerspective = function(factorX, factorY){
//   // script can omit
//   if (typeof factorX == "undefined") factorX = 1;
//   if (typeof factorY == "undefined") factorY = 1;
//   this.handheldPerspectiveIsSet = true;
//   this.perspecticeFactorX = factorX;
//   this.perspecticeFactorY = factorY;
// };


Actor.prototype.shiftAbsolute = function(shiftingAmountX, shiftingAmountY, triggeredByAction, reactionTargetIndex){
for (var layernumber = 1; layernumber < this.scene.layers.length; layernumber++) {
    if (typeof this.scene.layers[layernumber] != "undefined") {
      for (var actorCounterInLayer = this.scene.layers[layernumber].length - 1; actorCounterInLayer >= 0; actorCounterInLayer--) {
        var obj = this.scene.layers[layernumber][actorCounterInLayer];
        if (shiftingAmountX) {
          obj.offsetX = shiftingAmountX * (layernumber-1);
        }
        if (shiftingAmountY) {
          obj.offsetY = shiftingAmountY * (layernumber-1);
        }
      }
    }
  }
  return this;
};

Scene.prototype.scrollingPerspective = function(strength){
  (function(){
    // add scroll listener to stage
    bindEvent(window.animation.stageDiv, 'scroll', function(callee){
      var overflowX = window.animation.currentScene.dimensions.x - window.animation.width;

      // scrollX is calculated as percentage difference between a centered scrolling position and current
      var scrollX = (callee.srcElement.scrollLeft - (overflowX/2)) / (overflowX/200);
      // var scrollY = (callee.srcElement.scrollTop - (overflowY/2)) / (overflowY/200);

      window.animation.currentScene.setPerspective(scrollX * strength, callee.srcElement.scrollTop);
    });
  })();
};


Scene.prototype.setPerspective = function(shiftingAmountX, shiftingAmountY){
  for (var layernumber = 1; layernumber < this.layers.length; layernumber++) {
    if (typeof this.layers[layernumber] != "undefined") {
      for (var actorCounterInLayer = this.layers[layernumber].length - 1; actorCounterInLayer >= 0; actorCounterInLayer--) {
        var obj = this.layers[layernumber][actorCounterInLayer];
        if (shiftingAmountX) {
          obj.offsetX = shiftingAmountX * (layernumber-1);
          obj.needsMoving = true;
        }
        if (shiftingAmountY) {
          obj.offsetY = shiftingAmountY * (layernumber-1);
          obj.needsMoving = true;
        }
      }
    }
  }
};

Actor.prototype.shiftsPerspective = function(shiftingAmountX, shiftingAmountY, triggeredByAction, reactionTargetIndex){
  this.scene.shiftPerspective(shiftingAmountX, shiftingAmountY);
  return this;
};

Actor.prototype.shiftsPerspectiveOnTouch = function(shiftingAmountX, shiftingAmountY){
  this.reacts("this.shiftsPerspective(" + shiftingAmountX + ", " + shiftingAmountY + ", true, reactionTargetIndex)", 0);
  return this;
};

Scene.prototype.shiftPerspective = function(shiftingAmountX, shiftingAmountY){
  for (var layernumber = 1; layernumber < this.layers.length; layernumber++) {
    if (typeof this.layers[layernumber] != "undefined") {
      for (var actorCounterInLayer = this.layers[layernumber].length - 1; actorCounterInLayer >= 0; actorCounterInLayer--) {
        var obj = this.layers[layernumber][actorCounterInLayer];
        if (shiftingAmountX) {
          obj.offsetX += shiftingAmountX * (layernumber-1);
          obj.needsMoving = true;
        }
        if (shiftingAmountY) {
          obj.offsetY += shiftingAmountY * (layernumber-1);
          obj.needsMoving = true;
        }
      }
    }
  }
};

