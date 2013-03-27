function Linking(actor, url, triggeredByAction, reactionTargetIndex){
	linking = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex); 

	linking.actor = actor;
	linking.url = url

	if( /iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		bindEvent(linking.targetObject.image, 'touchstart', function(){this.gotourl();});
	} else {
		bindEvent(linking.targetObject.image, 'mousedown', function(){this.gotourl();});
	}

	linking.actor.image.gotourl = function(){
		this.removeEventListener('mousedown',arguments.callee, false);
		
		location.href=url;
	}


	linking.actor.image.style.cursor = 'pointer';

	linking.applybehavior =  function(){
		// nothing here
	};

	return linking;
}

Actor.prototype.links = function(url) {
	this.addBehavior(new Linking(this, url));
};
