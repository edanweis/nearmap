import welcome from 'shared/welcome'
import 'jquery'
welcome('content/index.js')


window.onkeyup = function(event) {
  var key = event.keyCode || event.which;
  var keychar = String.fromCharCode(key);  
}

 