function bindEvent(el, eventName, eventHandler, reacting) {
  // l("el: " + el);
  // l("eventName: " + eventName);
  // l("eventHandler: " + eventHandler);
  if (typeof reacting !== "undefined") {
    reacting = null;
  };
  
  if (el.addEventListener){
    el.addEventListener(eventName, eventHandler, false);
  } else if (el.attachEvent){
    el.attachEvent('on'+eventName, eventHandler);
  }
}

function unbindEvent(el, callee){
  // should work 
  this.removeEventListener('click',arguments.callee,false);
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