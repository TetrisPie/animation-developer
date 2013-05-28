Actor.prototype.syncWithServer = function(syncKey) {
  this.syncKey = syncKey;
  return this;
};

Actor.prototype.syncs = function(){
  return this.syncKey !== 'undefined';
}
