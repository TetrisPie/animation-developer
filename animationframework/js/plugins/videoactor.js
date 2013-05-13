Scene.prototype.createVideoActor = function (fileName, startAtX, startAtY, width, height) {
    var actor = new Actor(startAtX, startAtY, width, height);
    var defaultVideoDirectory = 'videos/';

    actor.setup = function () {
        actor.image = document.createElement('video');
        actor.image.originalPath = fileName;
        actor.filename = fileName.substring(fileName.lastIndexOf('/') + 1)
        //actor.image.setAttribute('poster', relativeOrAbsolutePath(defaultVideoDirectory, actor.image.originalPath) + '.png');

        var srcTag = actor.image.appendChild(document.createElement('source'));
        srcTag.setAttribute('type', 'video/mp4');
        srcTag.setAttribute('src', relativeOrAbsolutePath(defaultVideoDirectory, actor.image.originalPath) + '.mp4');

        srcTag = actor.image.appendChild(document.createElement('source'));
        srcTag.setAttribute('type', 'video/webm');
        srcTag.setAttribute('src', relativeOrAbsolutePath(defaultVideoDirectory, actor.image.originalPath) + '.webm');

        mediaType = 'video';

        actor.image.actor = actor;
        actor.phases.push(relativeOrAbsolutePath(defaultVideoDirectory, fileName));
        actor.defaultdirectory = defaultVideoDirectory;
        actor.position = { x: startAtX, y: startAtY };
        actor.setSize(width, height);
        actor.vector = { x: 0, y: 0 };

        bindEvent(actor.image, 'mousedown', function () { actor.react() });
        moveActor(actor);
    };
    actor.setup();

    actor.addClass = function (newclass) {
        // must be called after setup (but setup happens on object creation)
        actor.image.className += newclass;
    };
    actor.hasId = function (newid) {
        // must be called after setup (but setup happens on object creation)
        actor.image.setAttribute('id', newid);
    };

    actor.scene = this;
    this.actors.push(actor);
    return actor;
};
