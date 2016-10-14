/* TODO
 - local storage
 - reading rule (mouseY)
 - reset button
 - pop-up menu (less disrupting)
 - letter/word spacing (???)
 																	*/

r(function() {
  // For injecting menu styles
  // Using getElementsByTagName because it’s faster than querySelector and we’ve got a tight perf budget
	var head = document.getElementsByTagName('head')[0];
	var style = document.createElement('style');
	
	// For injecting menu
	var body = document.getElementsByTagName('body')[0];
	var push = document.createDocumentFragment();
	var menu = document.createElement('div');
	
	// Managing colors
	var yellow = '#fbf8bb'; 
	var mint = '#effddd';
	var blue = '#cbe1e7';
	var pink = '#ffccbc';
	
	var rs = window.getComputedStyle(document.getElementsByTagName('html')[0], null).getPropertyValue('background-color');
	
	function convertRGBA(rgb){
    if (rgb.search("rgb") == -1) {
      return rs = rgb;
    }
    else if (rgb == 'rgba(0, 0, 0, 0)') {
      return rs = '#fff';
    }
    else {
      rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
      function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
      }
      return rs = "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]); 
     }
	}
	
	convertRGBA(rs);
	
	// For classes and ids
	var colors = ['rs', 'yellow', 'mint', 'blue', 'pink'];
	
	menu.id = 'menu';
	
	// Generating bgColor buttons based on colors array
	for (var i = 0; i < colors.length; i++) {
		// We’ll use index in array for each color
	  var color = colors[i];
	  
	  // Creating a button
		var button = document.createElement('button');
		
		// Setting attributes (role, class and id)
		button.setAttribute('role', 'button');
		button.classList.add(color);
		button.id = color;
		
		// Injecting button in menu
		menu.appendChild(button);
		
		// Adding eventListener for button
		button.addEventListener('touchend', toggleBackground, true);
		button.addEventListener('click', toggleBackground, true);
	}
	
	// Injecting Menu in doc fragment then pushing doc fragment as first child in body
	push.appendChild(menu);
	body.insertBefore(push, document.body.firstChild);
	
	// Injecting Menu styles
		// Setting type attribute because XHTML
		style.setAttribute('type', 'text/css');
				
		// Adding CSS for menu
		style.textContent = 'body {padding: 2%;} button {display: inline-block; width: 3em; height: 3em; border-radius: 50%; line-height: 1; margin: 0 1%; border: 0.125em solid currentColor; cursor: pointer;} #menu {display: block; margin:  1.75em auto; text-align: center !important;} button.rs {background-color:'+rs+'} button.yellow {background-color:'+yellow+'} button.mint {background-color:'+mint+'} button.blue {background-color:'+blue+'} button.pink {background-color:'+pink+'} h1 {page-break-before: avoid;}';
		
		// Injecting styles in head
	  head.appendChild(style);
	  
	  
	  // Event Listeners
		function toggleBackground(e) {
			var bodyColor = this.getAttribute('class');
			body.className = bodyColor;
			e.preventDefault();
			e.stopPropagation();
		};
		
		
		// Reading Rule
		document.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        var dot, eventDoc, doc, body, pageY;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageY == null && event.clientY != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }
			console.log(event.pageY);
    }

});
function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}	