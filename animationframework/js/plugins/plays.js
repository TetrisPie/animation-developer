function Playing(actor, audioFilename, playingImagePath, looped, onload, betweenLoops){
  var playing = new Plugin(0, 0);

  playing.actor = actor;
  playing.actor.playingImagePath = 'images/' + playingImagePath;
  playing.actor.waitingImagePath = playing.actor.image.src;

  playing.actor.pulsatesWhilePlaying = false;

  playing.actor.playLooped = looped;
  playing.actor.playOnLoad = onload;
  playing.actor.playOnLoadExecuted = false; 

  playing.reset = function(){
    playing.actor.playOnLoadExecuted = false; 
    playing.actor.audioplaying = false;
  };
  playing.reset();
  
  playing.applybehavior = function(){
    if (this.actor.playOnLoad && !this.actor.playOnLoadExecuted) {
      this.actor.playOnLoadExecuted = true;
      this.actor.toggleAudio();
    };
  };

  playing.actor.showPlayingImage = function(){
    this.image.src = this.playingImagePath;
    if (this.pulsatesWhilePlaying) {
      l("pulsates")
      this.pulsates(3,0.1,0, 0, true);      
    };
  };

  playing.actor.showWaitingImage = function(){
    this.image.src = this.waitingImagePath;
    if (this.pulsatesWhilePlaying) {
      this.behaviors = [];      
    };
  };

  playing.actor.audio = document.createElement('audio');
  var source = document.createElement('source');

  if (playing.actor.audio.canPlayType('audio/mpeg;')) {
      source.type = 'audio/mpeg';
      source.src = 'audio/' + audioFilename + '.mp3';
  } else {
      source.type = 'audio/ogg';
      source.src = 'audio/' + audioFilename + '.ogg';
  }

  playing.actor.audio.appendChild(source);
  playing.actor.audio.actor = playing.actor;

  if (typeof betweenLoops === "undefined") {
    betweenLoops = 0;
  };
  playing.actor.audio.betweenLoops = betweenLoops;

  // playing.actor.audio.load();

  if (playing.actor.playLooped) {
    bindEvent(playing.actor.audio, 'ended', function(){
      playing.actor.showWaitingImage(this.actor);
      playing.actor.showWaitingImage(this.actor);
      setTimeout(function(){ if (playing.actor.audioplaying){playing.actor.toggleAudio('play')} }, playing.actor.audio.betweenLoops);
    });
  } else {
    bindEvent(playing.actor.audio, 'ended', function(){
      playing.actor.showWaitingImage(this.actor);
      playing.actor.audioplaying = false;    
    });    
  };

  playing.actor.toggleAudio = function(force_play_or_pause){
    if (force_play_or_pause === "play") {
      this.playAudio();
    } else if (force_play_or_pause == "pause") {
      this.pauseAudio();
    } else if (!this.audioplaying) {
      this.playAudio();
    } else {
      this.pauseAudio();
    };
  };

  playing.actor.playAudio = function(){
    // l("playing");
    if (this.audio.currentTime) {
      this.audio.currentTime = 0;     
    };
    this.audio.play();
    this.showPlayingImage();
    this.audioplaying = true;
  };

  playing.actor.pauseAudio = function(){
    // l("pause");
    this.audio.pause();
    this.audioplaying = false;
    this.showWaitingImage();
  };

  playing.actor.reacts('this.toggleAudio();');

  return playing;
}

Actor.prototype.playsOnLoad = function(audioFilename, playingImagePath) {
  var myactor = this;
  var behavior = new Playing(myactor, audioFilename, playingImagePath, false, true);
  setTimeout(function(){myactor.addBehavior(behavior)}, 500);
};

Actor.prototype.plays = function(audioFilename, playingImagePath) {
  var myactor = this;
  setTimeout(function(){myactor.addBehavior(new Playing(myactor, audioFilename, playingImagePath, false, false))}, 500);
};

Actor.prototype.playsLoop = function(audioFilename, playingImagePath, betweenLoops) {
  var myactor = this;
  var behavior = new Playing(myactor, audioFilename, playingImagePath, true, false, betweenLoops);
  setTimeout(function(){myactor.addBehavior(behavior)}, 500);
};

Actor.prototype.playsLoopOnLoad = function(audioFilename, playingImagePath, betweenLoops) {
  var myactor = this;
  var behavior = new Playing(myactor, audioFilename, playingImagePath, true, true, betweenLoops);
  setTimeout(function(){myactor.addBehavior(behavior)}, 500);
};

Actor.prototype.playsAndPulsates = function(audioFilename, playingImagePath) {
  // setTimeout(function(){})
  var myactor = this;
  // setTimeout(function(){alert(bla.image.src)}, 250);
  var behavior = new Playing(myactor, audioFilename, playingImagePath);
  myactor.pulsatesWhilePlaying = true;
  setTimeout(function(){myactor.addBehavior(behavior)}, 500);
  // this.addBehavior(new Playing(this, audioFilename, playingImagePath));
};
