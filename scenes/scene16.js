var scene16 = function(){
  this.scene = new Scene('scene16', 'Clones');

  var home = scene.createActor('home.png', 10, 10);
  home.navigatesOnTouch('scene0');

  scene.write(20, 90, "EXPERIMENTAL: actor1 drifts, actor 2 clones its movement");

  var actor1 = scene.createActor('actor.png', 50, -100);
  var actor2 = scene.createActor('actor.png');
  actor2.clonesMovement(actor1, -100, -100);
  actor1.drifts(1,1);
  actor1.resets();

  return scene;
};