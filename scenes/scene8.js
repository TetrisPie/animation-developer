var scene8 = function(){
  this.scene = new Scene('scene8', 'Playing');

  var home = scene.createActor('home.png', 40, 40);
  home.navigatesOnTouch('scene0');
  
  var box = scene.createActor('box.png', 300, 200, 200, 200);
  box.plays('quack', 'box1.png');

  var arrow1 = scene.createActor('arrow-left.png', 30, 450);
  arrow1.navigatesOnTouch('scene7', 'arrow-left-active.png');

  var arrow2 = scene.createActor('arrow-right.png', 610, 430, 160, 139);
  arrow2.navigatesOnTouch('scene9', 'arrow-right-active.png');

  scene.write(10, 10, "box.plays(quack);");

  return scene;
};
