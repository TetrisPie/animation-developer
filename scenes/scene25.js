/* global Scene */
/* exported scene25 */

var scene25 = function () {
    var scene = new Scene('scene25', 'Video');

    var home = scene.createActor('home.png', 10, 10);
    home.navigatesOnTouch('scene0');

    var actor1 = scene.createVideoActor('Chrome_ImF', 200, 100, 240, 88);
    actor1.image.setAttribute("controls", "controls");
    actor1.resets(500);
    scene.write(20, 205, "videoactor1 contains without playing it.");

    var actor2 = scene.createVideoActor('Chrome_ImF', 100, 200, 240, 88);
    actor2.image.setAttribute("controls", "controls");
    actor2.movesToOnTouch(500, 270, 2, 2);
    scene.write(20, 365, "videoactor2 moves when touched diagonally to new position without playing.");

    return scene;
};