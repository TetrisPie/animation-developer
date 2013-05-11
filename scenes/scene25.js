/* global Scene */
/* exported scene25 */

var scene25 = function () {
    var scene = new Scene('scene25', 'Video');

    var home = scene.createActor('home.png', 10, 10);
    home.navigatesOnTouch('scene0');

    var actor1 = scene.createVideoActor('Chrome_ImF', 200, 100, 240, 88);
    actor1.playvideo(1000, 5000, 5000);
    scene.write(20, 205, "videoactor1 contains without playing it.");

    var actor2 = scene.createVideoActor('Chrome_ImF', 100, 200, 240, 88);
    actor2.movesToOnTouch(500, 270, 2, 2);
    actor2.playvideo(2000, 1000, 2000);
    scene.write(20, 365, "videoactor2 moves when touched diagonally to new position without playing.");
    
    return scene;
};