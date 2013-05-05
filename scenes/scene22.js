/* globals Scene */
/* exported scene0 */

var scene22 = function(){
  var scene = new Scene('scene22', 'All');
  // scene.handheldPerspective();
  scene.createActor('home.png', 10, 10).navigatesOnTouch('scene0');

  scene.write(20, 110, "Layers (in development)", "title");
  scene.write(20, 145, "Change the perspective by using the buttons below.", "");

  var actor1 = scene.createActor('actors/actor1.png', 250, 230);
  actor1.isInLayer(1, 1.5, 1.5);

  var actor2 = scene.createActor('actors/actor2.png', 100, 300);
  actor2.isInLayer(2);

  var actor3 = scene.createActor('actors/actor3.png', 400, 300);
  actor3.isInLayer(2);

  var actor4 = scene.createActor('actors/actor4.png', 250, 370);
  actor4.isInLayer(3);

  scene.createActor('actor.png', 20, 500).setText('shift perspective left', '', 'button').shiftsPerspectiveOnTouch(5);
  scene.createActor('actor.png', 540, 500).setText('shift perspective right', '', 'button').shiftsPerspectiveOnTouch(-5);

  return scene;
};