/* global Scene */
/* exported scene25 */

var scene26 = function () {
  var scene = new Scene('scene26', 'Video');

  var home = scene.createActor('home.png', 10, 10);
  home.navigatesOnTouch('scene0');

  var planet = scene.createActor('planeten/erde.png',150,190,500,500);
  planet.rotates(-0.05);

  var man = scene.createActor('walkcycle/01walk.png', 350, 100, 80, 150);
  man.addPhase('walkcycle/02walk.png');
  man.addPhase('walkcycle/03walk.png');
  man.addPhase('walkcycle/04walk.png');
  man.addPhase('walkcycle/05walk.png');
  man.addPhase('walkcycle/06walk.png');
  man.addPhase('walkcycle/07walk.png');
  man.addPhase('walkcycle/08walk.png');
  man.addPhase('walkcycle/09walk.png');
  man.addPhase('walkcycle/10walk.png');
  man.addPhase('walkcycle/11walk.png');
  man.addPhase('walkcycle/12walk.png');
  man.phaseCycle = 1400;

  man.bouncesOnTouch(200, 1, 3, 0.6);

  return scene;
};