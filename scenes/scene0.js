/* globals Scene */
/* exported scene0 */

var scene0 = function(){
  var scene = new Scene('scene0', 'All');

  scene.write(20, 20, "Animation Framework", "title");
  scene.write(20, 50, "initiated by <a href='http://mehreinfach.de'>Mehreinfach</a>, download free at <a href='http://animation.io'>animation.io</a>", "small");

  // scene.write(20, 100, "Animation example
  // APPEARS
  var appears = scene.createActor('button.png', 20, 100, 240, 60);
  appears.setText("appears/dissolves","","button");
  appears.navigatesOnTouch('scene4');

  // MOVESTO
  var moves = scene.createActor('button.png', 20, 170, 240, 60);
  moves.setText("moves","","button");
  moves.navigatesOnTouch('scene1');

  // SHAKING
  var shakes = scene.createActor('button.png', 20, 240, 240, 60);
  shakes.setText("shakes","","button");
  shakes.navigatesOnTouch('scene2');

  // PULSATES
  var pulsates = scene.createActor('button.png', 20, 310, 240, 60);
  pulsates.setText("pulsates","","button");
  pulsates.navigatesOnTouch('scene6');

  // ROTATES
  var rotates = scene.createActor('button.png', 20, 380, 240, 60);
  rotates.setText("rotates","","button");
  rotates.navigatesOnTouch('scene3');

  // PHASES
  var addphase = scene.createActor('button.png', 270, 100, 240, 60);
  addphase.setText("phases","","button");
  addphase.navigatesOnTouch('scene11');

  // WAVES
  var waves = scene.createActor('button.png', 270, 240, 240, 60);
  waves.setText("waves","","button");
  waves.navigatesOnTouch('scene5');

  // DRIFTS
  var drifts = scene.createActor('button.png', 270, 310, 240, 60);
  drifts.setText("drifts","","button");
  drifts.navigatesOnTouch('scene7');

  // SWINGS
  var swings = scene.createActor('button.png', 270, 380, 240, 60);
  swings.setText("swings","","button");
  swings.navigatesOnTouch('scene13');

  // PLAYS
  var plays = scene.createActor('button.png', 520, 100, 240, 60);
  plays.setText("plays", "", "button");
  plays.navigatesOnTouch('scene15');

  // CLONES
  var clones = scene.createActor('button.png', 270, 170, 240, 60);
  clones.setText("clones", "", "button");
  clones.navigatesOnTouch('scene16');

  // TEXT & COUNT
  var textcount = scene.createActor('button.png', 520, 170, 240, 60);
  textcount.setText("text, count (dev)", "", "button");
  textcount.navigatesOnTouch('scene17');

  // CIRCLES
  var circles = scene.createActor('button.png', 520, 240, 240, 60);
  circles.setText("circles (dev)", "", "button");
  circles.navigatesOnTouch('scene18');

  // LINKS
  var links = scene.createActor('button.png', 520, 310, 240, 60);
  links.setText("links", "", "button");
  links.navigatesOnTouch('scene19');

  // POPUP
  var popup = scene.createActor('button.png', 520, 380, 240, 60);
  popup.setText("popup", "", "button");
  popup.navigatesOnTouch('scene20');

  // LAYERS 1
  var layers1 = scene.createActor('button.png', 20, 450, 240, 60);
  layers1.setText("layers 1 (dev)", "", "button");
  layers1.navigatesOnTouch('scene22');

  // LAYERS 2
  var layers2 = scene.createActor('button.png', 270, 450, 240, 60);
  layers2.setText("layers 2 (dev)", "", "button");
  layers2.navigatesOnTouch('scene23');

  // CSS-tricks
  var csstricks = scene.createActor('button.png', 520, 450, 240, 60);
  csstricks.setText("CSS-tricks", "", "button");
  csstricks.navigatesOnTouch('scene21');

  // BOUNCES
  var csstricks = scene.createActor('button.png', 20, 520, 240, 60);
  var newBadge = scene.createActor('new.png', 220, 510, 50, 50);
  csstricks.setText("bounces", "", "button");
  csstricks.navigatesOnTouch('scene24');

  // VIDEOACTOR
  var videoactor = scene.createActor('button.png', 270, 520, 240, 60);
  var newBadge = scene.createActor('new.png', 470, 510, 50, 50);
  videoactor.setText("video (dev)", "", "button");
  videoactor.navigatesOnTouch('scene25');

  return scene;
};
