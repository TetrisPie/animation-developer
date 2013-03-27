/* exported scene21 */

var scene21 = function(){
  var scene = new Scene('scene21', 'All');

  var home = scene.createActor('home.png', 10, 10);
  home.navigatesOnTouch('scene0');

  var actor1 = scene.createActor('actor.png', 100, 100);
  actor1.setText('actor1.addClass("blueborder");', '', 'scene21actortext');
  actor1.addClass("blueborder");

  var actor2 = scene.createActor('actor.png', 100, 200);
  actor2.setText('actor2.addClass("redborder");', '', 'scene21actortext');
  actor2.addClass("redborder");

  var actor3 = scene.createActor('actor.png', 100, 300);
  actor3.setText('actor3.hasId("blackborder");', '', 'scene21actortext');
  actor3.hasId("blackborder");

  var text = "We set the actor's DOM-class resp. ID, then style them via custom.css."
  scene.write(400, 100, text, "scene21text");

  return scene;
};