Scene.prototype.createActor = function (filename, startAtX, startAtY, width, height) {
    var actor = new Actor(startAtX, startAtY, width, height);
    var defaultImageDirectory = 'images/';

    actor.setup = function () {
        actor.image = document.createElement('img');
        actor.image.originalPath = filename;
        actor.filename = filename.substring(filename.lastIndexOf('/') + 1)
        actor.image.setAttribute('src', relativeOrAbsolutePath(defaultImageDirectory, actor.image.originalPath));
        actor.image.setAttribute('class', 'actor');
        this.image.setAttribute('draggable', 'false');
        actor.image.actor = actor;
        actor.phases.push(relativeOrAbsolutePath(defaultImageDirectory, filename));
        actor.defaultdirectory = defaultImageDirectory;
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
    mediaType = 'image';
    actor.scene = this;
    this.actors.push(actor);
    return actor;
};

Actor.prototype.addPhase = function (phaseImagePath) {
        var tmpImage = document.createElement('img');
        tmpImage.setAttribute('src', relativeOrAbsolutePath(this.defaultdirectory, phaseImagePath));
        tmpImage.setAttribute('draggable', 'false');
        this.phases.push(relativeOrAbsolutePath(this.defaultdirectory, phaseImagePath));
    };