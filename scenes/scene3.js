var scene3 = function(){
	var scene = new Scene('scene3', 'Rotation');

	var home = scene.createActor('home.png', 10, 10);
	home.navigatesOnTouch('scene0');

	var actor1 = scene.createActor('actor.png', 350, 110);
	actor1.rotates(0.1);
	scene.write(350, 205, "actor1 rotates with a frequency of 0.1 Hertz.");
  	
  var actor2 = scene.createActor('actor.png', 20, 260);
  actor2.rotatesOnTouch(0.2);
  scene.write(20, 355, "actor2 rotates at 0.2 Hertz when touched")

  var actor3 = scene.createActor('actor.png', 20, 410);
  var actor4 = scene.createActor('actor.png', 300, 410);
  actor3.letsRotate(actor4, 0.15, 3)
  scene.write(20, 505, "actor4 rotates with 0.15 Hertz when actor3 is touched, <br />touch again for higher speed twice.")

	return scene;
};
