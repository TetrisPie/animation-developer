/* globals Scene */
/* exported scene0 */

var scene0 = function(){
  var scene = new Scene('scene0', 'All');

  scene.write(20, 20, "Animation Framework</span>", "title");
  scene.write(20, 50, "initiated by <a href='http://mehreinfach.de'>Mehreinfach</a>, download free at <a href='http://animation.io'>animation.io</a>", "small");

  // scene.write(20, 100, "Animation example
  // APPEARS
  var appears = scene.createActor('button.png', 20, 100, 240, 70);
  appears.setText("appears/dissolves","","button");
  appears.navigatesOnTouch('scene4');

  // MOVESTO
  var moves = scene.createActor('button.png', 20, 180, 240, 70);
  moves.setText("moves","","button");
  moves.navigatesOnTouch('scene1');

  // SHAKING
  var shakes = scene.createActor('button.png', 20, 260, 240, 70);
  shakes.setText("shakes","","button");
  shakes.navigatesOnTouch('scene2');

  // PULSATES
  var pulsates = scene.createActor('button.png', 20, 340);
  pulsates.setText("pulsates","","button");
  pulsates.navigatesOnTouch('scene6');

  // ROTATES
  var rotates = scene.createActor('button.png', 20, 420);
  rotates.setText("rotates","","button");
  rotates.navigatesOnTouch('scene3');

  // PHASES
  var addphase = scene.createActor('button.png', 270, 100);
  addphase.setText("phases","","button");
  addphase.navigatesOnTouch('scene11');

  // WAVES
  var waves = scene.createActor('button.png', 270, 260);
  waves.setText("waves","","button");
  waves.navigatesOnTouch('scene5');

  // DRIFTS
  var drifts = scene.createActor('button.png', 270, 340);
  drifts.setText("drifts","","button");
  drifts.navigatesOnTouch('scene7');

  // SWINGS
  var swings = scene.createActor('button.png', 270, 420);
  swings.setText("swings","","button");
  swings.navigatesOnTouch('scene13');

  // PLAYS
  var plays = scene.createActor('button.png', 520, 100);
  plays.setText("plays", "", "button");
  plays.navigatesOnTouch('scene15');

  // CLONES
  var clones = scene.createActor('button.png', 270, 180);
  clones.setText("clones", "", "button");
  clones.navigatesOnTouch('scene16');

  // TEXT & COUNT
  var textcount = scene.createActor('button.png', 520, 180);
  textcount.setText("text, count (dev)", "", "button");
  textcount.navigatesOnTouch('scene17');

  // CIRCLES
  var circles = scene.createActor('button.png', 520, 260);
  circles.setText("circles (dev)", "", "button");
  circles.navigatesOnTouch('scene18');

  // LINKS
  var links = scene.createActor('button.png', 520, 340);
  links.setText("links", "", "button");
  links.navigatesOnTouch('scene19');

  // POPUP
  var popup = scene.createActor('button.png', 520, 420);
  popup.setText("popup", "", "button");
  popup.navigatesOnTouch('scene20');

  // CSS-tricks
  var csstricks = scene.createActor('button.png', 270, 500);
  csstricks.setText("CSS-tricks", "", "button");
  csstricks.navigatesOnTouch('scene21');

  // LAYERS
  var yourscene = scene.createActor('button.png', 20, 500);
  yourscene.setText("Your Scene", "", "button");
  yourscene.navigatesOnTouch('scene22');

  return scene;
};
