var scene19 = function(){
  this.scene = new Scene('scene19', 'setText');

  var home = scene.createActor('home.png', 10, 10);
  home.navigatesOnTouch('scene0');

  var actor1 = scene.createActor('actor.png', 300, 225);
  actor1.links("http://mehreinfach.de");

  return this.scene;
};