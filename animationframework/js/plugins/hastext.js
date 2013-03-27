function HavingText(actor, content, divid, domclass, triggeredByAction, reactionTargetIndex){
  var havingText = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);

  havingText.targetObject.originalText = String(content);

  havingText.targetObject.hasTextDiv = document.createElement('div');
  havingText.targetObject.hasTextDiv.setAttribute('id',divid);
  havingText.targetObject.hasTextDiv.setAttribute('class','hastext ' + domclass);
  havingText.targetObject.hasTextDivInner = document.createElement('div');
  havingText.targetObject.hasTextDivInner.setAttribute('class','inner');
  havingText.targetObject.hasTextDiv.appendChild(havingText.targetObject.hasTextDivInner);
  havingText.targetObject.hasTextDiv.style.zIndex = "2";
  havingText.targetObject.hasTextDiv.style.width = havingText.targetObject.imagesize.x + 'px';
  havingText.targetObject.hasTextDiv.style.height = havingText.targetObject.imagesize.y + 'px';
  havingText.targetObject.hasTextDiv.style.pointerEvents = 'none';
  havingText.targetObject.scene.div.appendChild(havingText.targetObject.hasTextDiv);

  havingText.targetObject.hasTextDivInner.innerHTML = content;
  
  havingText.applybehavior = function(){  
    havingText.targetObject.hasTextDiv.style.visibility = havingText.targetObject.image.style.visibility;    
    havingText.targetObject.hasTextDiv.style.left = havingText.targetObject.position.x + 'px';
    havingText.targetObject.hasTextDiv.style.top = havingText.targetObject.position.y + 'px'; 
    havingText.targetObject.hasTextDiv.style.opacity = havingText.targetObject.currentOpacity;
    havingText.targetObject.hasTextDiv.style.transform = 'rotate(' +  havingText.targetObject.tilt + 'deg)'; // Firefox
    havingText.targetObject.hasTextDiv.style.webkitTransform = 'rotate(' +  havingText.targetObject.tilt + 'deg)'; // Webkit (Chrome, Safari)
    havingText.targetObject.hasTextDiv.style.msTransform = 'rotate(' +  havingText.targetObject.tilt + 'deg)'; // Internet Explorer

    havingText.targetObject.hasTextDiv.style.transformOrigin = havingText.targetObject.image.style.transformOrigin;
    havingText.targetObject.hasTextDiv.style.webkitTransformOrigin = havingText.targetObject.image.style.webkitTransformOrigin;
    havingText.targetObject.hasTextDiv.style.msTransformOrigin = havingText.targetObject.image.style.msTransformOrigin;

  };

  return havingText;
};

Actor.prototype.setText = function(content, divid, domclass, triggeredByAction, reactionTargetIndex) {
  if (typeof this.hasTextDiv === 'undefined') {
    this.addBehavior(new HavingText(this, content, divid, domclass, triggeredByAction, reactionTargetIndex));    
  } else {
    this.hasTextDivInner.innerHTML = content;
  };
};


