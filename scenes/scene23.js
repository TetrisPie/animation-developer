/* globals Scene */
/* exported scene0 */

var scene23 = function(){
  var scene = new Scene('scene23', 'All', 1200, 900);
  scene.scrollingPerspective(2, 0.05, 100, 30);

  scene.createActor('home.png', 10, 10).navigatesOnTouch('scene0');

  scene.write(20, 110, "Layers (in development)", "title");
  scene.write(20, 145, "You can scroll this scene sideways and the actors will shift perspective.", "");

  var actor1 = scene.createActor('actors/actor1.png', 250, 230);
  actor1.isInLayer(10);

  var actor2 = scene.createActor('actors/actor2.png', 250, 270);
  actor2.isInLayer(30);

  var actor3 = scene.createActor('actors/actor3.png', 100, 350);
  actor3.isInLayer(50);

  var actor4 = scene.createActor('actors/actor4.png', 400, 350);
  actor4.isInLayer(50);

  var actor5 = scene.createActor('actors/actor5.png', 250, 420);
  actor5.isInLayer(100);

  return scene;
};