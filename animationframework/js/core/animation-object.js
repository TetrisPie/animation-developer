/* jshint -W061 */ // allow "evil eval"

function Animation(width, height, firstSceneId, minWidth, maxWidth, minHeight, maxHeight){
  // this.server = developermode ? 'http://localhost:8080' : 'http://server.animation.io';
  this.server = 'http://animation-io.nodejitsu.com';

  this.firstSceneId = firstSceneId;
  this.loadedScenes = [];
  this.stageDiv = createDiv('stage', 'stage');
  setDivSize(this.stageDiv, width, height);

  // this.scrollingDivWrapper = createDiv('scrollingdivwrapper', 'scrollingdivwrapper');
  // this.scrollingDiv = createDiv('scrollingdiv', 'scrollingdiv');
  // setDivSize(this.scrollingDivWrapper, width, height);
  setDivSize(this.stageDiv, width, height);

  this.width = width;
  this.height = height;
  this.dimensions = {x: width, y: height};
  this.textIsDisplaying = true; // show text as default

  this.minWidth = (typeof minWidth == 'undefined') ? this.width : minWidth;
  this.maxWidth = (typeof maxWidth == 'undefined') ? this.width : maxWidth;
  this.minHeight = (typeof minHeight == 'undefined') ? this.height : minHeight;
  this.maxHeight = (typeof maxHeight == 'undefined') ? this.height : maxHeight;

  this.startAnimationTimestamp = now();
  this.age = function(){
    return now() - this.startAnimationTimestamp;
  };
}

// requestAnim shim layer by Paul Irish
requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function startLoop(){
  // this.animloop = function(){
  //   requestAnimFrame(animloop);
  //     for (var i = 0; i < window.currentScene.actors.length; i++) {
  //       animateactor(window.currentScene.actors[i]);
  //     }
  // };
  // this.animloop();
}