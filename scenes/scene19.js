/* globals Scene */

var scene19 = function(){
  var scene = new Scene('scene19', 'setText');

  var home = scene.createActor('home.png', 10, 10);
  home.navigatesOnTouch('scene0');

  scene.write(100, 100, "Link opens in …");

  var actor1 = scene.createActor('actor.png', 100, 225);
  actor1.linksToNewWindow("http://mehreinfach.de");
  actor1.setText("… new window", "", "button");

  var actor2 = scene.createActor('actor.png', 450, 225);
  actor2.linksToSameWindow("http://mehreinfach.de");
  actor2.setText("… same window", "", "button");

  return scene;
};