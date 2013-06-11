/* global Scene */
/* exported scene25 */

var scene26 = function () {
  var scene = new Scene('scene26', 'Video', 2000, 1000);

  var home = scene.createActor('home.png', 10, 10);
  // home.navigatesOnTouch('scene0');

  var mytext = "<a href=\"mailto:you@example.com?subject=transfer%20identity&body=" + encodeURIComponent(identitylink()) + "\">mail your identity to another computer</a>";
  scene.write(10, 100, mytext, "");

  // scene.write(10, 100, "…working on a globally synchronized actor", "");

  // var actor1 = scene.createActor('actor.png', 250, 530);
  // actor1.circles(30, 0.7, 0);
  // actor1.drifts(+0.5, -1);
  // // actor1.resets();
  // actor1.resets();
  // actor1.isPublic();

  return scene;
};