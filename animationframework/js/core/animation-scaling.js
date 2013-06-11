Animation.prototype.scaleStageToDivOrWindow = function(){
  if (this.resizeToDiv) {
    this.scaleToDiv();
  } else if (this.resizeToWindow){
    this.scaleToWindow();
  }
};

Animation.prototype.scaleToWindow = function(){
  console.log("scaling to window");

  var winWidth = window.innerWidth;
  var winHeight = window.innerHeight;
  var newHeight = winHeight;
  var newWidth = winWidth;

  var windowFactor = window.innerWidth / window.innerHeight;
  var animationFactor = this.width / this.height;

  var scaleFactor;

  if (this.minWidth !== 0 && (animationFactor > windowFactor)) {
    // the WIDTH has to be set
    if (winWidth < this.minWidth) {
      winWidth = this.minWidth;
    } else if (winWidth > this.maxWidth) {
      winWidth = this.maxWidth;
    }
    scaleFactor = winWidth / this.width;
    newHeight = winWidth * scaleFactor;

  } else if (this.minWidth !== 0){
    // the HEIGHT has to be set
    if (winHeight < this.minHeight) {
      winHeight = this.minHeight;
    } else if (winHeight > this.maxHeight) {
      winHeight = this.maxHeight;
    }
    scaleFactor = winHeight / this.height;
    newWidth = winHeight * scaleFactor;
  }

  if (scaleFactor != 1) {
    rescale(scaleFactor);
  }

  // position on screen:
  // window.animationwrapper.style.marginTop = ((window.innerHeight - parseInt(this.height * scaleFactor, 10))/2) + 'px';
  // window.animationwrapper.style.width = newWidth + 'px';
  // window.animationwrapper.style.marginLeft = ((window.innerWidth - parseInt(this.width * scaleFactor, 10))/2) + 'px';
  // window.animationwrapper.style.height = newHeight + 'px';
};

Animation.prototype.rescale = function(scaleFactor){
  this.stageDiv.style.width = (this.width * scaleFactor) + "px";
  // this.stageDiv.style.transformOrigin = "0 0";
  // this.stageDiv.style.transform = "scale(" + scaleFactor + ", " + scaleFactor + ")";
  // this.stageDiv.style.msTransformOrigin = "0 0";
  // this.stageDiv.style.msTransform = "scale(" + scaleFactor + ", " + scaleFactor + ")";
  // this.stageDiv.style.webkitTransformOrigin = "0 0";
  // this.stageDiv.style.webkitTransform = "scale(" + scaleFactor + ", " + scaleFactor + ")";
  // this.stageDiv.style.OTransformOrigin = "0 0";
  // this.stageDiv.style.OTransform = "scale(" + scaleFactor + ", " + scaleFactor + ")";
};

Animation.prototype.scaleToDiv = function(){
    var divWidth = window.animationwrapper.clientWidth;
    var divHeight = window.animationwrapper.clientHeight;
    var newWidth, newHeight;

    /*
      If the height of the div can be determined (if it has been set
      via CSS as opposed to being automatically determined by the
      browser-engine) and it is bigger than 10 (0 + borders or similar),
      we will also take the div-height into consideration.
    */

    if (1==2 && divHeight > 10 && divWidth > 10) {
      // take both height and width into consideration
      // console.log("take both height and width into consideration");

      // TODO : do this actually

    } else if (divWidth > 10){ // take only width into consideration
      // console.log("take only width into consideration");

      if (divWidth > this.maxWidth) { // the div is wider than allowed, set to maximum
        newWidth = this.maxWidth;
      } else if (divWidth < this.minWidth) { // the div is narrower than allowed, set to minimum
        newWidth = this.minWidth;
      } else { // div-width is within permitted scope
        newWidth = divWidth;
      }
      newHeight = newWidth / (this.width/this.height);

    } else if (divHeight > 10){ // take only height into consideration
      console.log("take only height into consideration");
      // TODO

    } else { // use default animation size
      console.log("use default animation size");
      // TODO
    }

    if (typeof window.metaWrapperDiv !== "undefined") {
      // metaWrapperDiv.style.height = newHeight + "px";
      // metaWrapperDiv.style.width = newWidth + "px";
    }

    window.animation.rescale(parseFloat(newWidth/window.animation.width));
  };