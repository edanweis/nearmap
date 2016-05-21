import welcome from 'shared/welcome'
welcome('background/index.js');
// var GeoPoint = require('geopoint')
import GeoPoint from 'geopoint';



function getTiles(bounds){
  var bbox = bounds.split(","),
  
      NW = new GeoPoint(parseFloat(bbox[1]), parseFloat(bbox[0])),
      NE = new GeoPoint(parseFloat(bbox[3]), parseFloat(bbox[0])),
      SE = new GeoPoint(parseFloat(bbox[3]), parseFloat(bbox[2])),
      SW = new GeoPoint(parseFloat(bbox[1]), parseFloat(bbox[2])); 
  
  var x_dist = NE.distanceTo(NW, true),
      y_dist = NW.distanceTo(SW, true)

  var m2 = x_dist * y_dist;

  return m2
  
}

function getCookies(domain, name, callback) {
    chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
        if(callback) {
            callback(cookie.value);
        }
    });
}

getCookies("http://maps.au.nearmap.com", "nearmap_web3_app", function(id) {
    console.log(id)
});

var WEB_REQUEST = chrome.webRequest;

WEB_REQUEST.onBeforeRequest.addListener(
    function(details) {
        if(details.method == "POST"){
            console.log(details)
          } else if(details.method == 'GET'){
            console.log(getTiles(getParameterByName('bbox', details.url)))

            // console.log(getParameterByName('bbox', details.url))
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


chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
    // console.log(response.farewell);
  });
});

// alert(chrome.cookies.getAllCookieStores());

// chrome.tabs.executeScript(tab.id, {file: 'inject_this.js'}, function() {
//   console.log('Successfully injected script into the page');
// });




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
