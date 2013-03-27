/* exported scene2 */

var scene2 = function(){
  var scene = new Scene('scene2', 'Shaking');

  var home = scene.createActor('home.png', 10, 10);
  home.navigatesOnTouch('scene0');

  var actor1 = scene.createActor('actor.png', 200, 100);
  actor1.shakes(50, -10, 1);
  scene.write(20, 205, "actor1 shakes as soon as the scene loads.");

  var actor2 = scene.createActor('actor.png', 20, 250);
  actor2.shakesOnTouch(50, -10, 1, 3);
  scene.write(20, 345, "actor2 shakes on touch. It is touchable 3 times.");

  var actor3 = scene.createActor('actor.png', 20, 410);
  var actor4 = scene.createActor('actor.png', 300, 410);
  actor3.letsShake(actor4, 50, -10, 1, 3);
  scene.write(20, 505, "Touching actor3 lets actor4 shake.");

  return scene;
};
