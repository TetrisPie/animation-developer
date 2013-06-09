function animationPreflight(){
  setAnimationConfigData(); // read in configuration residing in animationconfig.js
  getOrCreateIdentity();

  if (!compatibleBrowser()) {
    document.getElementById('backupdiv').style.display = "block";
    return;
  }
}

function loadAnimation(title, width, height, firstSceneId, minWidth, maxWidth, minHeight, maxHeight){
  animationPreflight();

  var data = {};
  data.loadInto = 'screen';
  data.title = title;
  data.width = width;
  data.height = height;

  animationLoader(data, firstSceneId, minWidth, maxWidth, minHeight, maxHeight);
}

function loadAnimationInto(title, metaWrapperDivId, firstSceneId, width, height){
  animationPreflight();

  var data = {};
  data.loadInto = 'div';
  data.title = title;
  data.width = data.minWidth = data.maxWidth = width;
  data.height = data.minHeight = data.maxHeight = width;
  data.height = height;

  var metaWrapperDiv = document.getElementById(metaWrapperDivId);
  var targetDiv = createDiv('animationwrapper', '');
  metaWrapperDiv.appendChild(targetDiv);

  animationLoader(data, firstSceneId, width, width, height, height, targetDiv, metaWrapperDiv);
}

function animationLoader(data, firstSceneId, minWidth, maxWidth, minHeight, maxHeight, targetDiv, metaWrapperDiv){
  // called by loadAnimation and loadAnimationInto after they set stuff up
  document.title = data.title;

  if (window.onload) var oldOnload = window.onload;
  window.onload = function(){
    if (oldOnload) oldOnload();

    // scroll away address bar on e.g. iOS-devices:
    setTimeout(function(){window.scrollTo(0, 1);}, 100);

    if (typeof targetDiv !== "undefined") {
      minWidth = maxWidth = targetDiv.clientWidth;
      minHeight = maxHeight = targetDiv.clientHeight;
    }

    window.animation = new Animation(data.width, data.height, keyOr('scene', firstSceneId), minWidth, maxWidth, minHeight, maxHeight);

    if (typeof targetDiv === "undefined") {
      window.animationwrapper = createDiv('animationwrapper', '');
      window.document.body.appendChild(window.animationwrapper);
      window.animationwrapper.appendChild(window.animation.stageDiv);
      window.animation.resizeToWindow = true;
    } else {
      console.log();
      window.animationwrapper = targetDiv;
      window.animationwrapper.appendChild(window.animation.stageDiv);
      window.animation.resizeToDiv = true;
      if (typeof metaWrapperDiv !== "undefined") {
        window.animation.metaWrapperDiv = metaWrapperDiv;
      }
    }

    window.animation.scrollingDivWrapper.appendChild(window.animation.scrollingDiv);
    window.animationwrapper.appendChild(window.animation.scrollingDivWrapper);

    window.animation.adaptScaling();

    if (window.animationConfigData.waitForServer > 0) {
      // according to animationconfig.js the animation should wait for the server to
      // return a result. In the meantime we show a rotating waiting.gif.
      var waitingImg = document.createElement('img');
      waitingImg.src = "images/waiting.gif";
      window.animation.waitingDiv = document.createElement('div');
      window.animation.waitingDiv.id = 'waitingdiv';
      window.animation.waitingDiv.appendChild(waitingImg);
      window.animation.waitingDiv.innerHTML += window.animationConfigData.waitingText;
      window.animation.stageDiv.appendChild(window.animation.waitingDiv);
    }

    waitForCurrentuserDataFromServerFor(window.animationConfigData.waitForServer, function(){
      // remove the waiting-gif, if it was created
      if (typeof window.animation.waitingDiv !== 'undefined') window.animation.stageDiv.removeChild(window.animation.waitingDiv);

      // read scene-number from hashtag in URL or start with default:
      var sceneNum = parseInt(window.location.hash.substring(1), 10);
      if (isNaN(sceneNum)) {
        window.animation.showScene(keyOr('scene', firstSceneId));
      } else{
        eval("window.animation.showScene('scene" + sceneNum + "')");
      }
      startLoop();

      fadeIn(window.animationwrapper);
    }); // <-- waitForCurrentuserDataFromServerFor();
  };

  if (window.onresize) var oldOnresize = window.onresize;
  window.onresize = function() {
    // setGuessedOrientation();
    if(oldOnresize) oldOnresize();
    window.animation.adaptScaling();
  };
}