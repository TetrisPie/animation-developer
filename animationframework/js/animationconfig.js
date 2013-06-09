function setAnimationConfigData(myanimation) {
  window.animationConfigData = {
    maximumAnimationAge: minutesToMilliseconds(10),
    waitForServer: 5000,
    waitingText: "loading data from server",
    incoming_transfer_head: "Transfer identity to this computer",
    incoming_transfer_loading_text: "loading transfer data from server"
  }
}
var developermode = false;