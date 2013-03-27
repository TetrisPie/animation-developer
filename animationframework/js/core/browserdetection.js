function compatibleBrowser(url){
  // detect browser
  var agent = navigator.userAgent;
  var blacklist = new Array();
  blacklist.push("MSIE 6")
  blacklist.push("MSIE 7")
  blacklist.push("MSIE 8")
  
  var isCompatible = true;

  for (var i = blacklist.length - 1; i >= 0; i--) {
    if (agent.toLowerCase().indexOf(blacklist[i].toLowerCase()) > 0) {
      isCompatible = false;
      break;
    };
  };
  return isCompatible;
}