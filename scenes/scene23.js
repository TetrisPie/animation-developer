/* globals Scene */
/* exported scene0 */

var scene23 = function(){
  var scene = new Scene('scene23', 'All');
  scene.createActor('home.png', 10, 10).navigatesOnTouch('scene0');

  scene.handheldPerspective();

  scene.write(20, 110, "Layers", "title");
  scene.write(20, 145, "On handhelds you can change the perspective by tilting the device.", "");

  var actor1 = scene.createActor('actors/actor1.png', 250, 230);
  actor1.isInLayer(1, 2, 2);

  var actor2 = scene.createActor('actors/actor2.png', 250, 300);
  actor2.isInLayer(2, 3, 3);

  var actor3 = scene.createActor('actors/actor3.png', 250, 370);
  actor3.isInLayer(3, 3.2, 3.2);

  return scene;
};