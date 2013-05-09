/* global Scene */
/* exported scene1 */

var scene1 = function(){
  var scene = new Scene('scene1', 'Moving');

  var home = scene.createActor('home.png', 10, 10);
  home.navigatesOnTouch('scene0');

  var actor1 = scene.createActor('actor.png', -210, 110);
  actor1.moves(0.25, 0);
  actor1.resets(500);
  scene.write(20, 205, "actor1 moves from left to right and resets when leaving screen.");

  var actor2 = scene.createActor('actor.png', 20, 270);
  actor2.movesToOnTouch(500, 270, 2, 2);
  scene.write(20, 365, "actor2 moves to new position on touch.");

  var actor3 = scene.createActor('actor.png', 20, 415);
  var actor4 = scene.createActor('actor.png', 300, 415, 75, 75);
  var actor5 = scene.createActor('actor.png', 500, 415, 75, 75);

  actor3.letsMoveTo(actor4, 500, 415, 1.5, 5, 1);
  actor3.letsMoveTo(actor5, 600, 415, 0.75, 2, 0);

  scene.write(20, 510, "actor3 lets actor5 and actor7 move to new position.");

  return scene;
};