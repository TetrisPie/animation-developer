var scene17 = function(){
  this.scene = new Scene('scene17', 'setText');

  scene.write(20, 90, "You can use actors as as counter or add text to them.");

  var home = scene.createActor('home.png', 10, 10);
  home.navigatesOnTouch('scene0');

  var actor1 = scene.createActor('actor.png', 100, 160, 240, 88);
  var actor2 = scene.createActor('actor.png', 400, 160, 240, 88);
  var actor3 = scene.createActor('actors/actor3.png', 100, 330, 240, 88);
  var actor4 = scene.createActor('actor.png', 400, 330, 240, 88);

  actor2.letsCount(actor2, 1);
  actor2.setText("Counter now at %count%.")

  actor1.letsCount(actor2, 5);
  actor1.setText("add 5 to actor2", "textid")
  actor1.swings(45, 0.5, 0, 0, -45);

  actor2.rotates(0.15);

  actor3.setText("subtr. 3 from actor2 3, dissolve", "textid");
  actor3.letsCount(actor2, -3);

  actor3.dissolvesOnTouch();
  actor3.rotates(0.10);

  actor4.setText("multiplies by 2");
  actor4.letsMultiply(actor2, 2);
  actor4.appears(1000, 1000);


  return scene;
};