var scene10 = function(){
  this.scene = new Scene('scene10', 'MovesTo');

  var home = scene.createActor('home.png', 40, 40);
  home.navigatesOnTouch('scene0');
  
  var box2 = scene.createActor('box.png', 500, 140, 200, 200);
  box2.movesToAndBackOnTouch(50, 200, 1, 1);
 
  var arrow1 = scene.createActor('arrow-left.png', 30, 450);
  arrow1.navigatesOnTouch('scene9', 'arrow-right-active.png');

  var arrow2 = scene.createActor('arrow-right.png', 610, 430, 160, 139);
  arrow2.navigatesOnTouch('scene11', 'arrow-right-active.png');

  scene.write(10, 10, "box.movesToAndBackOnTouch(500, 500, 1, 1);");

  return scene;
};