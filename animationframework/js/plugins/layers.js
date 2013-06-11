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

Scene.prototype.scrollingPerspective = function (neutralLayer, horizonLayer) {
    /*
    On the triggering of a scroll event of the “scrollingDivWrapper”,
    the scene is beeing scrolled taking perspective into account.
    The “strength”-value determines how strong the perspective-effect
    for the neutralLayer.
    * “neutralLayer” moves exactly the same speed as the scroll bar, default is layer 10.
    * “horizonLayer“ doesn't move at all, default is layer 0.
    */

    this.neutralLayer = (typeof neutralLayer === 'undefined' ? 10 : neutralLayer);
    this.horizonLayer = (typeof horizonLayer === 'undefined' ? 0 : horizonLayer);
    this.layerMultiplier = 1 / (this.neutralLayer - this.horizonLayer);

    var myscene = this;

    bindEvent(window.animation.stageDiv, 'scroll', function (callee) {

    // TODO: are we adding scroll events on every scene load, endlessly?

    if (myscene.isVisible) {
      var overflowX = window.currentScene.dimensions.x - window.animation.width;
      var overflowY = window.currentScene.dimensions.y - window.animation.height;

      // scrolly is calculated as percentage difference between a centered scrolling position and current
      var scrollX = -(callee.srcElement.scrollLeft - overflowX / 2.0) / 2;
      var scrollY = -(callee.srcElement.scrollTop - overflowY / 2.0) / 2;
      var diva = -(callee.srcElement.scrollLeft - overflowX / 2.0);
      var divb = (overflowX / 200.0);
      window.currentScene.setPerspective(scrollX, scrollY);
    };

  });
};

Scene.prototype.setPerspective = function(shiftingAmountX, shiftingAmountY) {
  // go through all layers…
  if (typeof this.layers === 'undefined') return; // scene has no layers, so no perspective to set

  for (var layernumber = 0; layernumber < this.layers.length; layernumber++) {
    // shift the images in this layer if there are any:
    if (typeof this.layers[layernumber] != "undefined") {
      // calculate shifting-strength for this layer:
      var shiftfactor = 1 - ((this.neutralLayer - layernumber) * this.layerMultiplier);
      for (var actorCounterInLayer = this.layers[layernumber].length - 1; actorCounterInLayer >= 0; actorCounterInLayer--) {
        var obj = this.layers[layernumber][actorCounterInLayer];
        if (shiftingAmountX) {
          if (obj.zeroOffsX == 0) {
            if (layernumber >= this.horizonLayer){
               obj.zeroOffsX = shiftingAmountX * shiftfactor * 2;
            } else
            {
               obj.zeroOffsX = -(shiftingAmountX * shiftfactor * 2);
            }
          }
          obj.offsetX = shiftingAmountX * shiftfactor * 2;
          obj.needsMoving = true;
        }
        if (shiftingAmountY) {
          if (obj.zeroOffsY == 0) {
            if (layernumber >= this.horizonLayer){
              obj.zeroOffsY = shiftingAmountY * shiftfactor * 2;
            } else
            {
              obj.zeroOffsY = -(shiftingAmountY * shiftfactor * 2);
            }
          }
          obj.offsetY = shiftingAmountY * shiftfactor * 2;
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
  for (var layernumber = 0; layernumber < this.layers.length; layernumber++) {
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
