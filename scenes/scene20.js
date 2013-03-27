/* globals Scene */
/* exported scene20 */

var scene20 = function(){
  var scene = new Scene('scene20', 'All');

  var home = scene.createActor('home.png', 10, 10);
  home.navigatesOnTouch('scene0');

  var actor = scene.createActor('actor.png', 100, 100);
  actor.setText("click me for popup", "", "button");
  actor.hasPopupOnTouch("popup_page.html", 600, 400, 20, 30, 0);

  return scene;
};