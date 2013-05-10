// IE9 fix
if(!window.console) {
  var console = {
    log : function(){},
    warn : function(){},
    error : function(){},
    time : function(){},
    timeEnd : function(){}
  };
}

function relativeOrAbsolutePath(defaultLocalPathPrefix, filePath){
  if(/^https?:\/\//.exec(filePath.toLowerCase())){
    return filePath;
  } else {
    return defaultLocalPathPrefix + filePath;
  }
}

function randomId(){
  return 'id' + Math.floor(Math.random()*10000) + Date.now();
}

function l(msg){
  if (developermode) {
    console.log(msg);
  }
}

function truth(expression){
  if (typeof expression === 'undefined' || expression === 'undefined') {
    return false;
  } else {
    return Boolean(expression);
  }
}

function distance(x1, y1, x2, y2){
  return Math.abs(Math.sqrt(((x2-x1)*(x2-x1)) + ((y2-y1)*(y2-y1))));
}

function vector(x1, y1, x2, y2){
  var d = distance(x1, y1, x2, y2);
  return {x: (x2 - x1)/d, y: (y2 - y1)/d, distance: d};
}

function now(){
  return new Date().getTime();
}

function timeInMinutes(minutes){
  return minutes * 1000 * 60;
}

function seconds(){
  return parseInt((now()/1000), 10);
}

function floatValueOfOr(n, or){
  return isNumeric(n) ? parseFloat(n) : or;
}

Number.prototype.subtractUntilZero = function(subtract){
  return subtract >= this ? 0 : (this - subtract);
};

Number.prototype.addUntilTarget = function(addAmount, target){
  var ret = this + addAmount;
  return ret > target ? target : ret;
};

function isNumeric(n) {
  return !notNumeric(n);
}

function notNumeric(n) {
  return (typeof n === 'undefined') || isNaN(parseFloat(n)) || !isFinite(n);
}

function round(number, decimals){
  if (decimals < 0) decimals = 0;
  this.q = Math.pow(10, decimals);
  return Math.round(number * this.q)/this.q;
}

function cutOffPx(value){
  var length = value.length;
  return parseFloat(value.toString().substring(0, length-2));
}

function createDiv(id, cssclass){
  var div = document.createElement('div');
  div.setAttribute('id', id);
  div.setAttribute('class', cssclass);
  return div;
}

function t(){
  return now();
}

function browserCompatible(){
  try {
    var tmp = new Audio();
    return true;
  } catch(e) {
    return false;
  }
}

function minutesToTime(minutes){
  return minutes * 60 * 1000;
}

function getIntegerFromEndOfString(myString){
  return parseInt((myString.match(/\d+$/)[0]), 10);
}

function rescale(domobject, newscale){
    domobject.style.transformOrigin = "0 0";
    domobject.style.transform = "scale(" + newscale + ", " + newscale + ")";
    domobject.style.msTransformOrigin = "0 0";
    domobject.style.msTransform = "scale(" + newscale + ", " + newscale + ")";
    domobject.style.webkitTransformOrigin = "0 0";
    domobject.style.webkitTransform = "scale(" + newscale + ", " + newscale + ")";
    domobject.style.OTransformOrigin = "0 0";
    domobject.style.OTransform = "scale(" + newscale + ", " + newscale + ")";
}
