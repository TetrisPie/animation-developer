function getOrCreateIdentity(){
  var currentUserUuid = readCookie("currentUserUuid");

  if (currentUserUuid === null) {
    // NO USER SAVED ON THIS MACHINE/BROWSER
    console.log("no user saved on this machine");

    currentUserUuid = uuid();

    console.log("created identity " + currentUserUuid);
    createCookie("currentUserUuid", currentUserUuid, 10000);

    // Cookie don't work when called as local file:
    if(developermode && readCookie("currentUserUuid") === null)
      console.log("\nERROR Couldn't set cookie! Are you running framework as local file?\n");

  } else {
    // FOUND A USER-UUID VIA COOKIE ON THIS MACHINE
    console.log("Found identity " + currentUserUuid + " on system.");
  }

  currentUser = {"uuid":currentUserUuid}; // "real" data comes from server will overwrite this in a sec
  getOrCreateCurrentUserFromServer(currentUserUuid);
}

// The following cookie-code is inspired by http://www.quirksmode.org/js/cookies.html
function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name,"",-1);
}

// <-- code inspired by http://www.quirksmode.org/js/cookies.html -->