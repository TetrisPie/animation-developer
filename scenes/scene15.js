var scene15 = function(){
  this.scene = new Scene('scene14', 'Touch-Effects');

  var home = scene.createActor('home.png', 10, 10);
  home.navigatesOnTouch('scene0');

  var actor1 = scene.createActor('actors/actor1.png', 280, 90);
  actor1.plays('quack', 'actors/actor2.png');
  scene.write(20, 205, "actor1 plays sound and displays image of actor2 while doing so.");

  // var actor3 = scene.createActor('actors/actor3.png', 90, 300);
  // actor3.playsOnLoad('quack', 'actors/actor4.png');
  // actor3.delays(2000);

  // var actor5 = scene.createActor('actors/actor5.png', 90, 400);
  // actor5.playsLoopOnLoad('quack', 'actors/actor6.png', 1500);
  // actor5.delays(2000);

  return scene;
};	