var scene14 = function(){
  this.scene = new Scene('scene14', 'Touch-Effects');

  var home = scene.createActor('home.png', 10, 10);
  home.navigatesOnTouch('scene0');

  var actor2 = scene.createActor('actors/actor2.png', 110, 110);
  actor2.navigatesOnTouch('scene0');
  var actor1 = scene.createActor('actors/actor1.png', 90, 90);
  actor1.passesTouchThrough();
  scene.write(20, 205, "actor1 lets click/through to actor2 beneath.");

  return scene;
};