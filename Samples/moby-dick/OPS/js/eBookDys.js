/*  eBookDys.js — a set of helpers for dyslexic readers
		LICENCE: Creative Commons Zero (this is public domain)

	 	APPROACH
 		“First build it, then improve it (maybe) then let hardcore Javascripters make it more elegant.” — Jiminy Panoz

 		TODO
 		- disable button when active
 		- check (xml:)lang and apply button’s aria-label accordingly
 		- pop-up menu (less disrupting)
 		- reading rule
 		- letter/word spacing (might screw pagination up)
 		- remove images (might screw pagination up)

 																																		*/

r(function() {

	// Checking localStorage support
	function storageTest(){
    var test = 'test';
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch(e) {
    	return false;
    }
	};
		
	// VARS
	
	// For applying background to html tag
  // We'll be using getElementsByTagName because it’s faster than querySelector and we’ve got a tight perf budget
	var root = document.getElementsByTagName('html')[0];
	
  // For injecting menu styles
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
	var rsDefault = window.getComputedStyle(root, null).getPropertyValue('background-color');
	
	// Since background-color will be retrieved as an rgba value, we must convert it to hex
	function convertRGBA(rgb){
    if (rgb.search("rgb") == -1) {
      return rsDefault = rgb;
    }
    else if (rgb == 'rgba(0, 0, 0, 0)') {  // Quick and dirty
      return rsDefault = '#fff';
    }
    else {
      rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
      function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
      }
      return rsDefault = "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]); 
     }
	};
	
	convertRGBA(rsDefault);
	
	// For classes and ids + array so that we can add buttons dynamically
	var colors = ['rsDefault', 'yellow', 'mint', 'blue', 'pink'];
	
	menu.id = 'menu';
	
	// Generating bgColor buttons based on colors array
	for (var i = 0; i < colors.length; i++) {
		// We’ll use index in array for each color
	  var color = colors[i];
	  
	  // Creating a button
		var button = document.createElement('button');
		
		// Setting attributes (role, class, id and label)
		button.setAttribute('role', 'button');	// Cos’ it’s not the default
		button.classList.add(color);	// In case we want to add another class at some point
		button.id = color;
		if (color == 'rsDefault') {
			button.setAttribute('aria-label', 'Reset background');
		} else {
			button.setAttribute('aria-label', 'Apply a ' + color + ' background');
		};
		
		// Injecting button in menu
		menu.appendChild(button);
		
		// Adding eventListeners for button
		button.addEventListener('touchend', toggleBackground, true);
		button.addEventListener('click', toggleBackground, true);
	}
	
	// Injecting Menu in doc fragment then pushing doc fragment as first child in body
	push.appendChild(menu);
	body.insertBefore(push, body.firstChild);
	
	// Injecting Menu styles
		// Setting type attribute because XHTML
		style.setAttribute('type', 'text/css');
				
		// Adding CSS for menu
		// Improve using CSSstylesheet API
		style.textContent = 'body {padding: 2%;} button {display: inline-block; width: 3em; height: 3em; border-radius: 50%; line-height: 1; margin: 0 1%; border: 0.125em solid currentColor; cursor: pointer;} #menu {display: block; margin:  1.75em auto; text-align: center !important;} button.rsDefault {background-color:'+rsDefault+'} button.yellow, html[data-ebookdys_bg="yellow"], html[data-ebookdys_bg="yellow"] body {background-color:'+yellow+'} button.mint, html[data-ebookdys_bg="mint"], html[data-ebookdys_bg="mint"] body {background-color:'+mint+'} button.blue, html[data-ebookdys_bg="blue"], html[data-ebookdys_bg="blue"] body {background-color:'+blue+'} button.pink, html[data-ebookdys_bg="pink"], html[data-ebookdys_bg="pink"] body {background-color:'+pink+'} h1 {page-break-before: avoid;} .rule {width: 100%; height: 0.125rem; background-color: rgba(0, 0, 0, 0.35); line-height: 0; font-size: 0; position: absolute; left: 0; right: 0;}';
		
		// Injecting styles in head
	  head.appendChild(style);
	  
	// Adding background to body if previously set by user
	if (storageTest() === true) {
		var previousBg = localStorage.getItem('eBookDys_bg');
		if (previousBg != null) {
			root.dataset.ebookdys_bg = previousBg;
		};
	};
	  
	// Event Listeners
		function toggleBackground(e) {
			var bodyColor = this.getAttribute('id'); // cos id is unique
			root.dataset.ebookdys_bg = bodyColor;		 // cos we must deal with RS’ custom attributes, ids and classes…
			if (storageTest() === true) {
				localStorage.setItem('eBookDys_bg', bodyColor); // Set item for laterretrieving
			};
			e.preventDefault(); // The two because eBook RS
			e.stopPropagation(); // The two because eBook RS
		};
	
});
function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}	