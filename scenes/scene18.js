var scene18 = function(){
  this.scene = new Scene('scene18', 'setText');

  var home = scene.createActor('home.png', 10, 10);
  home.navigatesOnTouch('scene0');

  var actor1 = scene.createActor('actor.png', 0, 225);
  actor1.circles(50, 2);
  actor1.circles(30, 0.5);
  actor1.shakes(10, 10, 0.6)
  actor1.drifts(2,0);
  actor1.resets(100);

  return this.scene;
};