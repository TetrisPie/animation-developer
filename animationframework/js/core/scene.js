/* global createDiv, Actor */
/* exported Scene */

function Scene(id, title){
	this.id = id;
	this.title = (typeof title !== 'undefined' ? title : id);
	this.div = createDiv(id, 'scene');

	this.stage = null; // will be set when putting on stage
	this.dimensions = {x: 0, y: 0}; // will be set when putting on stage
	this.isVisible = false;
	this.actors = [];
	this.texts = [];
	this.textDisplaying = true;
	this.alwaysShowsText = false;

	this.displayedAt = Date.now();

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

	this.setDimensions = function(width, height){
		this.dimensions = {x: width, y: height};
		this.div.style.width = this.dimensions.x + 'px';
		this.div.style.height = this.dimensions.y + 'px';
	};

	this.makeVisible = function(){
		this.div.style.visibility = 'visible';
		this.isVisible = true;
	};

	this.makeInvisible = function(){
		this.div.style.visibility = 'hidden';
		this.isInvisible = false;
		this.resetActors(); // while we are at it
		this.removeBehaviorsThatCameFromReacts();
	};
	this.makeInvisible(); // start out invisible

	this.cleanup = function(){
		for (var i = this.actors.length - 1; i >= 0; i--) {
			this.actors[i].cleanupBehaviors();
		}
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

	this.putOnStage = function(myStageDiv){
		myStageDiv.appendChild(this.div);
		myStageDiv.scene = this;
		this.stage = myStageDiv;

		// get dimensions and set css-size according to stage
		this.dimensions = {x: parseInt(myStageDiv.style.width, 10), y: parseInt(myStageDiv.style.height, 19)};
		this.div.style.width = this.dimensions.x + 'px';
		this.div.style.height = this.dimensions.y + 'px';

		for (var i = 0; i < window.stage.scene.actors.length; i++){
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
