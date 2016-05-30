import welcome from 'shared/welcome'
import 'jquery'
welcome('content/index.js')

// global vars
var geodata = "empty"
var resolution_list = '<div style="display:inline; float: right;"><select class="injected"><option value="0.07464553543474244">0.075 (Highest)</option><option value="0.14929107086948487">0.149</option><option value="0.29858214173896974">0.299</option><option value="0.5971642834779395">0.597</option><option value="1.194328566955879">1.194</option><option value="2.388657133911758">2.389</option><option value="4.777314267823516">4.777</option><option value="9.554628535647032">9.555 (Lowest)</option></select></div>';
var cloud_button = $('<a href="#" class="button warning save-cloud" style="background-color: #FF4552; text-decoration: none">Send to Cloud</a>');

var width = $('label.imageWidth').text();
var height = $('label.imageHeight').text();

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch(request.msg) {
            case "inject":
            	injectSaveBtn()
            	sendResponse("cool");
            	break;
            default:
                console.error("Unrecognised message: ", request);
        }
    }
);


var port = chrome.runtime.connect({name: "cloudsend"});

port.onMessage.addListener(function(msg) {
  // if (msg.question == "Who's there?")
  //   port.postMessage({answer: "Madame"});
  // else if (msg.question == "Madame who?")
    
});


function updateNearmap(matching_selector){
	var selected = matching_selector.val();
	var save_button = $('div.save-image > div.right > a.save-button');
	var nearmap_selector = $('div.map-resolution > div.unit-view > select.units');
	if ( $('label.imageWidth').text() != "NA" ){
		$('a.save-cloud').show();
	} else{
		$('a.save-cloud').hide();
	}
	$('div.map-resolution > div.unit-view > select.units > option').each(function(index, element){
		if (element.value == selected) {
			save_button.show()
			return false
		} else {
			save_button.hide()
		}	
	})
	if($('div.messaging').text() == "For higher resolution please define a smaller area"){
		$('div.messaging').hide();
	} else{
		$('div.messaging').show();
	}
}

function injectSaveBtn(){
	// check if elements have not already been modified - triggered from a previous GET request
	if ($('div.save-image > div.right > a.save-cloud').length <= 0){
		cloud_button.on('click', function(){
			sendToCloud(geodata)	
		})
		$('div.map-resolution > div.unit-view').hide();
		$('div.map-resolution').append(resolution_list);
		$('div.save-image > div.right').append(cloud_button);
		$('select.injected').change(function(eventData){
			updateNearmap($(this))
		});

		setTimeout(function(){
			updateNearmap($('select.injected'))

		 }, 100);
	} else{
		setTimeout(function(){
			updateNearmap($('select.injected'))
			
		}, 100);
	}
}


function sendToCloud(geodata){
	// console.log(geodata)
	// chrome.runtime.sendMessage({
	// 	geodata: geodata
	// }, function(response) {
	//   console.log(response.farewell);
	// });
	port.postMessage({data: "some urls"});
}

// $(".panel-content").bind("DOMSubtreeModified", function() {
// 	console.log('somehing changed')
// })

window.onkeyup = function(event) {
  var key = event.keyCode || event.which;
  var keychar = String.fromCharCode(key);  
// res = document.getElementsByClassName('units')[1].getElementsByTagName('option')[0].value 
}

// chrome.runtime.sendMessage({cookie: "hello"}, function(response) {
//   console.log(response.farewell);
// });