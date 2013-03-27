var scene6 = function(){
  this.scene = new Scene('scene6', 'Pulsates');

  var home = scene.createActor('home.png', 10, 10);
  home.navigatesOnTouch('scene0');

  var actor1 = scene.createActor('actor.png', 20, 110);
  actor1.pulsates(1, 1);
  scene.write(20, 205, "actor1 pulsates with a frequency of 1 Hertz.");

  var actor2 = scene.createActor('actor.png', 20, 260);
  actor2.pulsates(1, 1, 1);
  scene.write(20, 355, "actor2 pulsates once on load.");

  var actor3 = scene.createActor('actor.png', 350, 260);
  actor3.pulsatesOnTouch(1, 1, 2, 0);
  scene.write(350, 355, "actor3 pulsates twice on touch.");

  var actor4 = scene.createActor('actor.png', 20, 410);
  var actor5 = scene.createActor('actor.png', 350, 410);
  actor4.letsPulsate(actor5, 1, 1, 2);
  scene.write(20, 505, "actor4 lets actor5 pulsate thrice on touch.");

  return scene;
};
