var scene13 = function(){
  this.scene = new Scene('scene13', 'Drifting');

  var home = scene.createActor('home.png', 10, 10);
  home.navigatesOnTouch('scene0');
  
  var actor1 = scene.createActor('actor.png', 270, 250);
  actor1.swings(45, 0.5, 0, 0);
  scene.write(20, 100, "actor1 swings with a frequency of 0.5 hertz 45 degrees around the top left corner.");

  return scene;
};
