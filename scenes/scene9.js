var scene9 = function(){
  this.scene = new Scene('scene9', 'MovesTo');

  var home = scene.createActor('home.png', 40, 40);
  home.navigatesOnTouch('scene0');
  
  var box1 = scene.createActor('box.png', 50, 100, 200, 200);
  box1.movesTo(500, 250, 3, 3);

  var box2 = scene.createActor('box.png', 500, 100, 200, 200);
  box2.movesToOnTouch(50, 200, 3, 3);
 
  var arrow1 = scene.createActor('arrow-left.png', 30, 450);
  arrow1.navigatesOnTouch('scene8', 'arrow-right-active.png');

  var arrow2 = scene.createActor('arrow-right.png', 610, 430, 160, 139);
  arrow2.navigatesOnTouch('scene10', 'arrow-right-active.png');

  scene.write(10, 10, "box.movesTo(500, 500, 1, 1);");

  return scene;
};