function bindEvent(element, eventName, eventHandler, reacting) {
  // l("element: " + element);
  // l("eventName: " + eventName);
  // l("eventHandler: " + eventHandler);
  if (typeof reacting !== "undefined") {
    reacting = null;
  };

  if (element.addEventListener){
    element.addEventListener(eventName, eventHandler, false);
  } else if (element.attachEvent){
    element.attachEvent('on'+eventName, eventHandler);
  }
}

function unbindEvent(el, callee){
  // should work
  this.removeEventListener('click', arguments.callee,false);
}

function getClickPosition(el) {
  var stage = document.getElementById('stage');
  stageX = stage.offsetLeft - stage.scrollLeft + stage.clientLeft;
  stageY = stage.offsetTop - stage.scrollTop + stage.clientTop;
  var clickX = el.clientX - stageX;
  var clickY = el.clientY - stageY;
  l("click, " + clickX + ", " + clickY);
}
bindEvent(window, "click", getClickPosition);