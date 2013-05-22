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

function setCurrentUser(data){
  // called via jsonp coming from the animation.io-server
  // after getOrCreateCurrentUserFromServer-request
  window.currentUser = JSON.parse(data);
  console.log(window.currentUser);
}

function setUserProperty(uuid, key, value){
  var url = server_url() + '/setvalue';
  url += '/' + encodeURIComponent(uuid);
  url += '/' + encodeURIComponent(key);
  url += '/' + encodeURIComponent(value);
  make_script_tag(url);
}