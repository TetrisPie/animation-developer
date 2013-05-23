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

  // waitForIdentityFromServer(5000);
}

function waitForIdentityFromServer(waitingtime){
  var start = now();
  while (start + waitingtime >= now()){

  }
}

function dowhen(theaction, conditionAsString, tryagainin, doanywayafter){
  /*
    Checks every 'tryagainin' milliseconds for 'conditionAsString'.
    If 'conditionAsString' is the case it executes 'theaction'.
    After 'doanywayafter' milliseconds 'theaction' will execute anway.
  */
  var start = now();

  console.log("conditionAsString");
  console.log(eval(conditionAsString));

  if (eval(conditionAsString) || doanywayafter <= 0) {
    console.log("conditionAsString satisfied, do it!");

    // yey, fire and exit!
    theaction();

  } else {

    // condition not satsfied, let's try again later
    console.log("conditionAsString not satisfied, try again for " + doanywayafter + " milliseconds");
    window.setTimeout(function(){dowhen(theaction, conditionAsString, tryagainin, doanywayafter - tryagainin)}, tryagainin);
  };
}

function waitForCurrentuserDataFromServerFor(length, callback){
  console.log("START WAITING")

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
  console.log("currentUser[keyname]: " + currentUser[keyname]);
  return typeof currentUser[keyname] !== 'untitled' ? currentUser[keyname] : defaultvalue;
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