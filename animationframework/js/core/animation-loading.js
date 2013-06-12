function animationPreflight(){
  setAnimationConfigData(); // read in configuration residing in animationconfig.js

  if (!compatibleBrowser()) {
    document.getElementById('backupdiv').style.display = "block";
    return;
  }
}

function loadAnimation(title, width, height, firstSceneId, minWidth, maxWidth, minHeight, maxHeight){
  animationPreflight();

  // prepare the data object
  // TODO we should be passing nothing but this data object eventually, as this is a non-animator-facing
  var data = {};
  data.loadIntoType = 'window';
  data.title = title;
  data.width = width;
  data.height = height;

  // create the animationWrapper and put it on screen
  window.animationwrapper = createDiv('animationwrapper', '');
  window.document.body.appendChild(window.animationwrapper);

  // get or create user, or transfer identity, then launch the loader
  getOrCreateIdentity(function(){
    animationLoader(data, firstSceneId, width, width, height, height);
  });

  animationLoader(data, firstSceneId, minWidth, maxWidth, minHeight, maxHeight);
}

function loadAnimationInto(title, metaWrapperDivId, firstSceneId, width, height){
  animationPreflight();

  // prepare the data object
  // TODO we should be passing nothing but this data object eventually, as this is a non-animator-facing
  var data = {};
  data.loadIntoType = 'div';
  data.title = title;
  data.width = data.minWidth = data.maxWidth = width;
  data.height = data.minHeight = data.maxHeight = width;
  data.height = height;

  window.metaWrapperDiv = document.getElementById(metaWrapperDivId);
  window.animationwrapper = createDiv('animationwrapper', '');
  window.metaWrapperDiv.appendChild(window.animationwrapper);

  // get or create user, or transfer identity, then launch the loader
  getOrCreateIdentity(function(){
    animationLoader(data, firstSceneId, width, width, height, height);
  });

}

function animationLoader(data, firstSceneId, minWidth, maxWidth, minHeight, maxHeight){
  // called by loadAnimation and loadAnimationInto after they set stuff up
  document.title = data.title;

  if (window.onload) var oldOnload = window.onload;
  window.onload = function(){
    if (oldOnload) oldOnload();

    // scroll away address bar on e.g. iOS-devices:
    setTimeout(function(){window.scrollTo(0, 1);}, 100);

    // whoa, create the animation
    window.animation = new Animation(data.width, data.height, keyOr('scene', firstSceneId), minWidth, maxWidth, minHeight, maxHeight);

    // stageDiv cam from constructor, add it to animationwrapper
    window.animationwrapper.appendChild(window.animation.stageDiv);

    // later when resizing it matters whether we are resizing to window or div
    window.animation.resizeToDiv = (data.loadIntoType === 'div');
    window.animation.resizeToWindow = (data.loadIntoType === 'window');

    // when embedded in div, the div's size (set via CSS) sets the limits (otherwise the window)
    if (window.animation.resizeToDiv) {
      minWidth = maxWidth = window.animationwrapper.clientWidth;
      minHeight = maxHeight = window.animationwrapper.clientHeight;
    }

    // let's do our first scale…
    window.animation.scaleStageToDivOrWindow();

    // Waiting, part 1/2: are we waiting for data from server? set waiting-div!
    if (window.animationConfigData.waitForServer > 0) {
      window.animation.waitingDiv = waitingDiv(window.animationConfigData.waitingText);
      window.animation.stageDiv.appendChild(window.animation.waitingDiv);
    }

    // Waiting, part 2/2: ask for data, wait for response, then launch animation
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
    if(oldOnresize) oldOnresize();
    window.animation.scaleStageToDivOrWindow();
  };
}