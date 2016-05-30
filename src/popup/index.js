import welcome from 'shared/welcome'
import "shared/page.css"

welcome('popup/index.js')

function getCookies(domain, name, callback) {
    chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
        if(callback) {
            callback(cookie.value);
        }
    });
}

getCookies("http://maps.au.nearmap.com", "nearmap_web3_app", function(id) {
    document.getElementById('cookie').textContent = id;
});

var port = chrome.runtime.connect({name: "cloudsend"});
port.postMessage({type: "from_popup"});
port.onMessage.addListener(function(msg) {
    if (msg.type = "data"){
   		document.getElementById('data').textContent = msg.content;   
    }
});