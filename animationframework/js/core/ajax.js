function make_script_tag(url){
  var script = document.createElement("script");
  script.src = url;
  script.type = "text/javascript";
  document.body.appendChild(script);
}

function server_url(){
  return developermode ? 'http://localhost:8080' : 'http://animation.io';
}

function getOrCreateCurrentUserFromServer(currentUserUuid){
  var url = server_url() + '/getorcreate/' + encodeURIComponent(currentUserUuid)
  url += '?cachebuster=' + new Date().getTime().toString();
  make_script_tag(url);
}

function waitForCurrentuserDataFromServerFor(length, callback){
  dowhen(callback, "(typeof window.currentUserLoaded !== 'undefined' && window.currentUserLoaded == true)", 500, 10000);
}

function setCurrentUser(data){
  // called via jsonp coming from the animation.io-server
  // after getOrCreateCurrentUserFromServer-request
  window.currentUser = JSON.parse(data);
  window.currentUserLoaded = true;
  console.log(window.currentUser);
}

function keyOr(keyname, defaultvalue){
  // If there a value is set for 'currentUser[keyname]' (e.g. it came saved from server)
  // then return that, otherwise return the 'defaultvalue'.
  return typeof currentUser[keyname] !== 'undefined' ? currentUser[keyname] : defaultvalue;
}

function setAndSaveCurrentUserProperty(key, value){
  // Set a user-property both in the local object and on the server.
  if (typeof currentUser === 'undefined') {console.log("ERROR no currentUser to save to!"); return;}

  // 1. set value as local currentUser-property and flag it unsaved
  currentUser[key] = value;

  // 2. try saving all unsaved | TODO: count saving failure in
  var url = server_url() + '/setvalue';
  url += '/' + encodeURIComponent(currentUser.uuid);
  url += '/' + encodeURIComponent(key);
  url += '/' + encodeURIComponent(value);
  make_script_tag(url);
}