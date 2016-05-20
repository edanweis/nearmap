import welcome from 'shared/welcome'

welcome('background/index.js')


function getCookies(domain, name, callback) {
    chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
        if(callback) {
            callback(cookie.value);
        }
    });
}


  chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });




// getCookies("http://maps.au.nearmap.com", "nearmap_web3_app", function(id) {
//     alert(id);
// });

// alert(chrome.cookies.getAllCookieStores());

// chrome.tabs.executeScript(tab.id, {file: 'inject_this.js'}, function() {
//   console.log('Successfully injected script into the page');
// });


// chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
//   console.log(response.farewell);
//   alert('sending message')
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
