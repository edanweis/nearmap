import welcome from 'shared/welcome'
import 'jquery'
welcome('content/index.js')

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.msg == "inject")
    	injectSaveBtn()
      // sendResponse({farewell: "goodbye"});
  });

function checkResolution(selector){
	var selected = selector.val();
	var save_button = $('div.save-image > div.right > a.save-button');

	$('div.map-resolution > div.unit-view > select.units > option').each(function(index, element){
		if (element.value == selected) {
			$('div.map-resolution > div.unit-view > select.units').val(selected)
			save_button.show()
			console.log("match!")
			return false
		} else {
			console.log("no match")
			save_button.hide()
		}	
	})
}

function injectSaveBtn(){
	var resolution_list = '<div><select class="injected"><option value="0.07464553543474244">0.075 (Highest)</option><option value="0.14929107086948487">0.149</option><option value="0.29858214173896974">0.299</option><option value="0.5971642834779395">0.597</option><option value="1.194328566955879">1.194</option><option value="2.388657133911758">2.389</option><option value="4.777314267823516">4.777</option><option value="9.554628535647032">9.555 (Lowest)</option></select></div>';
	var cloud_button = '<a href="#" class="button warning save-cloud" style="background-color: #FF4552">Send to Cloud</a>';
	// check if elements have not already been modified - triggered from a previous GET request
	if ($('div.save-image > div.right > a.save-cloud').length <= 0){
		$('div.map-resolution > div.unit-view').hide();
		$('div.save-image > div.right').append(cloud_button);
		$('div.map-resolution').append(resolution_list);
		$('select.injected').change(function(eventData){
			checkResolution($(this))
		});
		checkResolution($('select.injected'))
	} else{
		checkResolution($('select.injected'))
	}
}

// window.addEventListener ("load", myMain, false);

// function myMain (evt) {
	
// 	 var jsInitChecktimer = setInterval (checkForJS_Finish, 111);
// 	 var camera_button = document.querySelectorAll("[data-tool='savePhotomaps']")[0]
	
//     function checkForJS_Finish () {
//         if (    typeof camera_button != "undefined") {
//             clearInterval (jsInitChecktimer);
//             camera_button.addEventListener ('click', function(){console.log('clicked!')})
//         }
//     }
// }

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