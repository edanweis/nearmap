export default function(script) {
  const style = 'background: #222; color: #bada55; font-size:1.5em'
  console.log(`%c >>Hello World from '${script}' script<<`, style)
  console.log("%c >>You can use npm packages, import/export, ES6, ES7, JSX, or anything you know from modern javascript development<<", style)


  chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });

chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(response.farewell);
});


}
