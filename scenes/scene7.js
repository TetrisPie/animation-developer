var scene7 = function(){
  this.scene = new Scene('scene7', 'Drifting');

  var home = scene.createActor('home.png', 10, 10);
  home.navigatesOnTouch('scene0');
  
  scene.write(20, 90, "actor1 drifts, actor 2 clones its movement");
  var actor1 = scene.createActor('actor.png', -140, 130);
  var actor2 = scene.createActor('actor.png', -400, 130);
  actor1.drifts(2, 0);
  actor1.resets();
  actor2.clonesMovement(actor1, -100, -100);
  actor2.resets();

  var actor3 = scene.createActor('actor.png', 20, 300);
  actor3.driftsOnTouch(1, -0.5);
  actor3.resets();
  scene.write(20, 230, "actor3 drifts on touch with a horizontal speed of 1 and a vertical speed of -0.5,<br />both actor resets when leaving screen.");

  var actor4 = scene.createActor('actor.png', 20, 470);
  var actor5 = scene.createActor('actor.png', 300, 470);
  actor4.letsDrift(actor5, 1, -0.5);
  actor5.resets();
  scene.write(20, 430, "actor4 lets actor5 drift.");

  return scene;
};
