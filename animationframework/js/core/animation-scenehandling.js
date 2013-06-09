Animation.prototype.loadScene = function(sceneid){
  // is the scene maybe already loaded?
  for (var i = this.loadedScenes.length - 1; i >= 0; i--) {
    if (this.loadedScenes[i].id === sceneid) {
      return this.loadedScenes[i];
    }
  }

  // if we reached this point, the scene isn't loaded yet.
  var newScene = eval(sceneid + '()');

  newScene.setDivSizeToStage();

  // newScene.setSzeneSizeToStageIfNotSetInScenedefinition(width, height);
  this.loadedScenes.push(newScene);
  newScene.stageDiv = this.stageDiv;
  this.stageDiv.appendChild(newScene.div);
  newScene.makeInvisible();
  return newScene;
};

Animation.prototype.reloadAndFadeToScene = function(sceneid){
  var sceneNum = parseInt(/scene(\d+)/.exec(sceneid)[1], 10);
  window.location.hash = sceneNum;
  var fadeTime = 1200;
  fadeOut(window.animationwrapper, fadeTime / 2);
  setTimeout(function(){window.location.reload();}, (fadeTime / 2) + 250);
};

Animation.prototype.showScene = function(sceneid, maximumAnimationAge){
  if ((window.animation.age() >= window.animationConfigData.maximumAnimationAge)) {
    window.animation.reloadAndFadeToScene(sceneid);
  } else {
    if ((typeof this.currentScene === 'undefined') || this.currentScene.age() > 1000) { // navigation possible only after 1 second
      // console.log("SHOWING SCENE " + sceneid);
      if (typeof this.currentScene !== 'undefined') {
        this.currentScene.cleanup();
      }
      window.currentScene = this.loadScene(sceneid);
      var sceneNum = getIntegerFromEndOfString(sceneid);
      window.location.hash = sceneNum === 0 ? '' : sceneNum;
      window.currentScene.enterActors();
      window.currentScene.resetActors();
      window.currentScene.makeOthersInvisible();
      window.currentScene.muteOthers();
      window.currentScene.resetAge();
      this.dropUnneededScenes(window.currentScene.preloadSceneIds);
      this.loadNeededScenes(window.currentScene.preloadSceneIds);
      window.animationConfigData.forceReloadTimer = setTimeout('window.animation.reloadAndFadeToScene("' + sceneid + '")', window.animationConfigData.maximumAnimationAge);

      window.animation.scrollingDivWrapper.scrollLeft = 0;
      window.animation.scrollingDivWrapper.scrollTop = 1;
    }
  }
  updateKey('scene', sceneid);
};

Animation.prototype.showFirstScene = function(){
  this.showScene(this.firstSceneId);
};

Animation.prototype.loadedSceneIds = function(){
  var result = [];
  for (var i = this.loadedScenes.length - 1; i >= 0; i--) {
    result.push(this.loadedScenes[i].id);
  }
  return result;
};

Animation.prototype.dropUnneededScenes = function(neededScenes){
  // neededScenes: array if scene-ids
  var droplist = this.loadedSceneIds().minus(neededScenes);
  for (var i = droplist.length - 1; i >= 0; i--) {
    this.dropScene(droplist[i]);
  }
};

Animation.prototype.loadNeededScenes = function(neededScenes){
  var loadlist = neededScenes.minus(this.loadedSceneIds());
  for (var i = loadlist.length - 1; i >= 0; i--) {
    this.loadScene(loadlist[i]);
  }
};

Animation.prototype.dropScene = function(sceneid){
  for (var i = this.loadedScenes.length - 1; i >= 0; i--) {
    if (this.loadedScenes[i].id === sceneid) {
      var element = document.getElementById(sceneid);
      this.stageDiv.removeChild(this.loadedScenes[i].div);
      this.loadedScenes = this.loadedScenes.without(i);
    }
  }
};