function getOrCreateIdentity(){
  var myCookie = readCookie("currentUser");

  if (myCookie === null) {
    var currentUser = createIdentity();
    console.log("created identity " + currentUser);
    createCookie("currentUser", currentUser, 10000);
    return currentUser;
  }

  if (myCookie !== null){
    console.log("found identity on system!");
    console.log(myCookie);
  }
}


function createIdentity(){
  return uuid();
}


// code inspired by http://www.quirksmode.org/js/cookies.html -->

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