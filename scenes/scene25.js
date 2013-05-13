/* global Scene */
/* exported scene25 */

var scene25 = function () {
    var scene = new Scene('scene25', 'Video');

    var home = scene.createActor('home.png', 10, 10);
    home.navigatesOnTouch('scene0');

    var actor1 = scene.createVideoActor('Chrome_ImF', 20, 100, 240, 88);
    actor1.playvideo();
    var actor2 = scene.createVideoActor('Chrome_ImF', 285, 100, 240, 88);
    actor2.playvideo(0, 4000, 5000);
    var actor3 = scene.createVideoActor('Chrome_ImF', 540, 100, 240, 88);
    actor3.playvideo(3000);
    scene.write(20, 200, "videoactor1 just play video");
    scene.write(20, 220, "videoactor2 plays just a part in the middle of same video.");
    scene.write(20, 240, "videoactor3 starts delayed to play.");

    var actor4 = scene.createVideoActor('Chrome_ImF', 20, 290, 240, 88);
    actor4.movesToOnTouch(500, 290, 2, 2);
    actor4.playvideoOnTouch();
    scene.write(20, 390, "videoactor4 plays when touched with animation applied.");

    var actor5 = scene.createVideoActor('Chrome_ImF', 285, 440, 240, 88);

    var actor6 = scene.createActor('actor.png', 20, 440);
    actor6.setText("Play");
    actor6.letsPlayvideo(actor5);
    var actor7 = scene.createActor('actor.png', 20, 440);
    actor7.setText("Pause");
    actor7.letsPausevideo(actor5);

    actor6.letsAppear(actor7);
    actor6.dissolvesOnTouch(actor6);
    actor6.letsResetReactions(actor7);
    actor7.letsAppearStartsVisible(actor6);
    actor7.dissolvesOnTouch(actor7);
    actor7.letsResetReactions(actor6);

    scene.write(20, 540, "small videoplayer.");

    return scene;
};