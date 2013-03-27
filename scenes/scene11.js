var scene11 = function(){
	var scene = new Scene('scene11', 'AddPhase');

  var home = scene.createActor('home.png', 10, 10);
  home.navigatesOnTouch('scene0');
	
	var actor1 = scene.createActor('actors/actor1.png', 20, 110);
	actor1.addPhase('actors/actor2.png');
	actor1.addPhase('actors/actor3.png');
	actor1.addPhase('actors/actor4.png');
	actor1.phaseCycle = 2000;

	scene.write(20, 205, "actor1.png - actor4.png are cycled through within a cycle length of 2 seconds.");

	return scene;
};
