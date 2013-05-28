function config(animation) {
  animation.config = {
    maximumAnimationAge: minutesToMilliseconds(10),
    waitForServer: 5000,
    waitingText: "loading data from server"
  }
}
var developermode = false;