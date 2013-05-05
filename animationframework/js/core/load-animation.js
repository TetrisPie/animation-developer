function Animation(width, height, firstSceneId, minWidth, maxWidth, minHeight, maxHeight){
	config(this); // read in configuration residing in animationconfig.js

	this.firstSceneId = firstSceneId;
	this.loadedScenes = new Array;
	this.stageDiv = createDiv('stage', 'stage');
	this.stageDiv.style.width = width + 'px';
	this.stageDiv.style.height = height + 'px';
	this.width = width;
	this.height = height;
	this.textIsDisplaying = true; // show text as default

	this.minWidth = (typeof minWidth == 'undefined') ? this.width : minWidth ;
	this.maxWidth = (typeof maxWidth == 'undefined') ? this.width : maxWidth ;
	this.minHeight = (typeof minHeight == 'undefined') ? this.height : minHeight ;
	this.maxHeight = (typeof maxHeight == 'undefined') ? this.height : maxHeight ;

	this.startAnimationTimestamp = now();
	this.age = function(){
		return now() - this.startAnimationTimestamp;
	};

	this.scaleToWindow = function(){
		var winWidth = window.innerWidth;
		var winHeight = window.innerHeight;
		var newHeight = winHeight;
		var newWidth = winWidth;
		var winWidth = winWidth

		var windowFactor = window.innerWidth / window.innerHeight;
		var animationFactor = this.width / this.height;

		if (this.minWidth != 0 && (animationFactor > windowFactor)) {
			// the WIDTH has to be set
			if (winWidth < this.minWidth) {
				winWidth = this.minWidth
			} else if (winWidth > this.maxWidth) {
				winWidth = this.maxWidth;
			};
			var scaleFactor = winWidth / this.width;
			newHeight = winWidth * scaleFactor;

		} else if (this.minWidth != 0){
			// the HEIGHT has to be set
			if (winHeight < this.minHeight) {
				winHeight = this.minHeight
			} else if (winHeight > this.maxHeight) {
				winHeight = this.maxHeight;
			};
			var scaleFactor = winHeight / this.height;
			newWidth = winHeight * scaleFactor;
		};

		if (scaleFactor != 1) {
			rescale(this.stageDiv, scaleFactor);
		};

		// position on screen:
		window.animationwrapper.style.marginTop = ((window.innerHeight - parseInt(this.height * scaleFactor))/2) + 'px';
		window.animationwrapper.style.width = newWidth + 'px';
		window.animationwrapper.style.marginLeft = ((window.innerWidth - parseInt(this.width * scaleFactor))/2) + 'px';
		window.animationwrapper.style.height = newHeight + 'px';
	};

	this.loadScene = function(sceneid){
		// is the scene maybe already loaded?
		for (var i = this.loadedScenes.length - 1; i >= 0; i--) {
			if (this.loadedScenes[i].id === sceneid) {
				return this.loadedScenes[i];
			};
		};

		// if we reached this point, the scene isn't loaded yet.
		var newScene = eval(sceneid + '()');
		newScene.setDimensions(width, height);
		this.loadedScenes.push(newScene);
		this.stageDiv.appendChild(newScene.div);
		newScene.makeInvisible();
		return newScene;
	};

	this.reloadAndFadeToScene = function(sceneid){
		var sceneNum = parseInt(/scene(\d+)/.exec(sceneid)[1], 10);
		window.location.hash = sceneNum;
		var fadeTime = 1200;
		fadeOut(window.animationwrapper, fadeTime / 2);
		setTimeout("window.location.reload()", (fadeTime / 2) + 250);
	}

	this.showScene = function(sceneid, maximumAnimationAge){
		if ((this.animation.age() >= this.config.maximumAnimationAge)) {
			reloadAndFadeToScene(sceneid);
		} else {
			if ((typeof this.currentScene === 'undefined') || this.currentScene.age() > 1000) { // navigation possible only after 1 second
				// console.log("SHOWING SCENE " + sceneid);
				if (typeof this.currentScene !== 'undefined') {
					this.currentScene.cleanup();
				}
				this.currentScene = loadScene(sceneid);
				var sceneNum = getIntegerFromEndOfString(sceneid);
				window.location.hash = sceneNum == 0 ? '' : sceneNum;
				this.currentScene.enterActors();
				this.currentScene.resetActors();
				this.currentScene.makeOthersInvisible();
				this.currentScene.muteOthers();
				this.currentScene.resetAge();
				this.dropUnneededScenes(this.currentScene.preloadSceneIds);
				this.loadNeededScenes(this.currentScene.preloadSceneIds);
				window.forceReloadTimer = setTimeout('reloadAndFadeToScene("' + sceneid + '")', window.animation.config.maximumAnimationAge);
			};
		};
	}

	this.showFirstScene = function(){
		this.showScene(this.firstSceneId);
	};

	this.loadedSceneIds = function(){
		var result = new Array;
		for (var i = this.loadedScenes.length - 1; i >= 0; i--) {
			result.push(this.loadedScenes[i].id);
		};
		return result;
	};

	this.dropUnneededScenes = function(neededScenes){
		// neededScenes: array if scene-ids
		var droplist = this.loadedSceneIds().minus(neededScenes);
		for (var i = droplist.length - 1; i >= 0; i--) {
			this.dropScene(droplist[i]);
		};
	};

	this.loadNeededScenes = function(neededScenes){
		var loadlist = neededScenes.minus(this.loadedSceneIds());
		for (var i = loadlist.length - 1; i >= 0; i--) {
			this.loadScene(loadlist[i]);
		};
	};

	this.dropScene = function(sceneid){
		for (var i = this.loadedScenes.length - 1; i >= 0; i--) {
			if (this.loadedScenes[i].id === sceneid) {
				var element = document.getElementById(sceneid);
				this.stageDiv.removeChild(this.loadedScenes[i].div);
				this.loadedScenes = this.loadedScenes.without(i);
			};
		};
	};
	return this;
};


function loadAnimation(title, width, height, firstSceneId, minWidth, maxWidth, minHeight, maxHeight){
	if (!compatibleBrowser()) {
		document.getElementById('backupdiv').style.display = "block";
		return;
	};
	animationLoader(title, width, height, firstSceneId, minWidth, maxWidth, minHeight, maxHeight);
}

function loadAnimationInto(title, targetDivId, firstSceneId, width, height){
	var targetDiv = document.getElementById(targetDivId);
	animationLoader(title, width, height, firstSceneId, width, width, height, height, targetDiv);
}

function animationLoader(title, width, height, firstSceneId, minWidth, maxWidth, minHeight, maxHeight, targetDiv){
	document.title = title;

	if (window.onload) var oldOnload = window.onload;
	window.onload = function(){
		if (oldOnload) oldOnload();

		// scroll away address bar:
		setTimeout(function() { window.scrollTo(0, 1) }, 100);

		window.animation = Animation(width, height, firstSceneId, minWidth, maxWidth, minHeight, maxHeight);

		if (typeof targetDiv === 'undefined') {
			window.animationwrapper = createDiv('animationwrapper', '');
			window.document.body.appendChild(window.animationwrapper);
			window.animationwrapper.appendChild(this.stageDiv);
			window.animation.scaleToWindow();
		} else {
			window.animationwrapper = targetDiv;
			window.animationwrapper.appendChild(this.stageDiv);
		};

		// read scene-number from hashtag in URL or start with default:
		var sceneNum = parseInt(window.location.hash.substring(1));
		if (isNaN(sceneNum)) {
			window.animation.showScene(firstSceneId);
		} else{
			eval("window.animation.showScene('scene" + sceneNum + "')");
		};
		window.animation.startLoop();

		// setTimeout(function(){window.animationwrapper.style.opacity = 1},2000);
		// window.animationwrapper.style.opacity = 0.2;
		fadeIn(window.animationwrapper);
	};

	if (window.onresize) var oldOnresize = window.onresize;
	window.onresize = function() {
		// setGuessedOrientation();
		if(oldOnresize) oldOnresize();
		window.animation.scaleToWindow();
	};
}

function setGuessedOrientation(){
  if(window.innerWidth > window.innerHeight) {
    window.orientation = "landscape";
    return "landscape";
  } else {
    window.orientation = "portrait";
    return "portrait";
  };
}
setGuessedOrientation();

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
	this.animloop = function(){
		requestAnimFrame(animloop);
			for (var i = 0; i < window.currentScene.actors.length; i++) {
				animateactor(window.currentScene.actors[i]);
			};
	};
	this.animloop();
};
