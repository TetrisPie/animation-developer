/* globals Scene */
/* exported scene0 */

var scene24 = function(){
  var scene = new Scene('scene24', 'All');
  scene.createActor('home.png', 10, 10).navigatesOnTouch('scene0');

  scene.write(20, 110, "Bounces", "title");

  var actor1 = scene.createActor('actor.png', 270, 110);
  actor1.bounces(100, 1, 0, 1.0);
  scene.write(20, 205, "actor1 bounces 100 pixels high one time per second.");

  var actor2 = scene.createActor('actor.png', 270, 400);
  actor2.bouncesOnTouch(200, 1, 3, 0.6);
  scene.write(20, 495, "actor2 bounces three times on touch, slightly loses motivation while doing so.");

  return scene;
};