function setAnimationConfigData(myanimation) {
  window.animationConfigData = {
    maximumAnimationAge: minutesToMilliseconds(10),
    waitForServer: 5000,
    waitingText: "loading data from server"
  }
}
var developermode = false;