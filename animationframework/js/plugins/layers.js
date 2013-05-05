Actor.prototype.isInLayer = function(layerNumber, factorX, factorY) {
  if (typeof factorX == "undefined") factorX = 1;
  if (typeof factorY == "undefined") factorY = 1;

  this.layer = layerNumber;

  if (typeof(this.scene.layers) == 'undefined') {
    // create the layers-array in this scene if necessary
    this.scene.layers = [];
  };

  if ((layerNumber != 1) && (typeof this.scene.layers[layerNumber])) {
    // create this layer if missing or equal 1. (1 means no change in perspective)
    this.scene.layers[layerNumber] = [];
  };

  if (layerNumber != 1) {
    // put this actor in its layer
    this.scene.layers[layerNumber].push(this);
  };

  var myactor = this;

  if (this.scene.handheldPerspectiveIsSet) {
    window.shiftByOrientation = function(){
    if (window.DeviceOrientationEvent) {
      bindEvent(window, "deviceorientation", function () {
          // l(event.gamma);
          myactor.shiftAbsolute((factorX * event.gamma/5.0), (factorY * event.beta/5.0))
      }, true);
    }
    };
    window.shiftByOrientation();
  };

  return this;
};

Scene.prototype.handheldPerspectiveIsSet = false;
Scene.prototype.handheldPerspective = function(){
  Scene.prototype.handheldPerspectiveIsSet = true;
};


Actor.prototype.shiftAbsolute = function(shiftingAmountX, shiftingAmountY, triggeredByAction, reactionTargetIndex){
  for (var i = 0; i < this.scene.layers.length; i++) {
    if (typeof this.scene.layers[i] != "undefined") {
      for (var k = this.scene.layers[i].length - 1; k >= 0; k--) {
        var obj = this.scene.layers[i][k]
        if (shiftingAmountX) {
          obj.offsetX = shiftingAmountX * (i-1);
        };
        if (shiftingAmountY) {
          obj.offsetY = shiftingAmountY * (i-1);
        };
      };
    };
  };
  return this;
};

Actor.prototype.shiftsPerspective = function(shiftingAmountX, shiftingAmountY, triggeredByAction, reactionTargetIndex){
  for (var i = 0; i < this.scene.layers.length; i++) {
    if (typeof this.scene.layers[i] != "undefined") {
      for (var k = this.scene.layers[i].length - 1; k >= 0; k--) {
        var obj = this.scene.layers[i][k]
        if (shiftingAmountX) {
          obj.offsetX += shiftingAmountX * (i-1);
        };
        if (shiftingAmountY) {
          obj.offsetY += shiftingAmountY * (i-1);
        };
      };
    };
  };
  return this;
};

Actor.prototype.shiftsPerspectiveOnTouch = function(shiftingAmountX, shiftingAmountY){
  this.reacts("this.shiftsPerspective(" + shiftingAmountX + ", " + shiftingAmountY + ", true, reactionTargetIndex)", 0);
  return this;
};

