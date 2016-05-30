import welcome from 'shared/welcome'
welcome('background/index.js');
var geodesy = require('geodesy')

function getTiles(bounds){
  var bbox = bounds.split(","),
      NW = new geodesy.LatLonEllipsoidal(parseFloat(bbox[1]), parseFloat(bbox[0])),
      NE = new geodesy.LatLonEllipsoidal(parseFloat(bbox[3]), parseFloat(bbox[0])),
      SE = new geodesy.LatLonEllipsoidal(parseFloat(bbox[3]), parseFloat(bbox[2])),
      SW = new geodesy.LatLonEllipsoidal(parseFloat(bbox[1]), parseFloat(bbox[2]));

  var x_dist = SE.distanceTo(NE),
      y_dist = SE.distanceTo(SW);

  var res1 = 13.396648496, // 0.07464553543474244
      res2 = 6.698324248 // 0.14929107086948487

  var cx = 1.264877433,
      cy = 1.26984127

  // var res = [Math.round(x_dist * res2 * cx), Math.round(y_dist * res2 * cy)]
  var res = [x_dist * cx, y_dist * cy]
  var dim = [x_dist, y_dist]

  console.log("width: " + Math.round(x_dist * res2 * cx) +"  height: " + Math.round(y_dist * res2 * cy))
  
  var geodata = {
    "res": res,
    "dim": dim,
    "bbox": bbox
  }

  return geodata
}

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "cloudsend");
  port.onMessage.addListener(function(msg) {
    if (msg.type == "request"){
      console.log("received request from: " + msg.content )
    }
    if (msg.type = "data"){
      console.log("received urls from content script: "+ msg.content)
    }
  });
});


var WEB_REQUEST = chrome.webRequest;

WEB_REQUEST.onBeforeRequest.addListener(
    function(details) {
        if(details.method == "POST"){
            
          } else if(details.method == 'GET'){
            if (details.url.indexOf('imageprofile') > -1){
              
              // send message to our tab to inject the save button.
              chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                  msg: "inject",
                  geodata: getTiles(getParameterByName('bbox', details.url))
                }, function(response) {
                  // console.log(response.farewell);
                });
              });
            }
          }
    },
    {urls: ["*://*.nearmap.com/*"]},
    ["blocking", "requestBody"]
);


window.onkeyup = function(event) {
  var key = event.keyCode || event.which;
  var keychar = String.fromCharCode(key);  
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch(request.msg) {
            case "getGeodata":
                sendResponse("here's your data from background page");
                return true
                break;
            default:
                console.error("Unrecognised message: ", request);
        }
    }
);

// Setting popup icon

// When we defined browser_action
if(chrome.browserAction) {
  chrome.browserAction.setIcon({
    path: require("icons/webpack-38.png")
  })

// When we defined page_action
} else if(chrome.pageAction) {

  const showPageAction = function(tabId) {
    chrome.pageAction.show(tabId);

    chrome.pageAction.setIcon({
      path: require("icons/webpack-38.png"),
      tabId: tabId
    })
  }

  // Show page action on each page update
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    showPageAction(tabId)
  });
}
