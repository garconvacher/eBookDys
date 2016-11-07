/*  eBookDys.js — a set of helpers for dyslexic readers
		LICENCE: Creative Commons Zero (this is public domain)

	 	APPROACH
 		“First build it, then improve it (maybe) then let hardcore Javascripters make it more elegant.” — Jiminy Panoz

 		TODO
 		- check (xml:)lang and apply button’s aria-label accordingly
 		- pop-up menu (less disrupting)
 		- reading rule
 		- letter/word spacing (might screw pagination up)
 		- remove images (might screw pagination up)
 		- Stylesheet -> stylesheet API to add/remove at will (e.g. ::selection for TTS)

 																																		*/

r(function() {

	var storage = (function() {
		// Checking if localStorage is supported
		var _hasLocalStorage = (function() {
			var test = 'test';
			try {
				localStorage.setItem(test, test);
				localStorage.removeItem(test);
				return true;
			} catch(e) {
				return false;
			}
  	})();

		// Functions for cookies (read and write)
		var _readCookie = function(name) {
    	var nameEQ = name + "=";
    	var ca = document.cookie.split(';');
    	for (var i = 0; i < ca.length; i++) {
      	var c = ca[i];
      	while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      	if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    	}
    	return null;
  	};

  	var _writeCookie = function(name, value, days) {
    	var expiration = (function() {
      	if (days) {
        	var date = new Date();
        	date.setTime(date.getTime() + (days*24*60*60*1000));
        	return "; expires=" + date.toGMTString();
      	} else {
        	return "";
      	}
    	})();
    	document.cookie = name + "=" + value + expiration + "; path=/";
  	};

  	return {
    	// storage.set() -> if localStorage setItem else write cookie
    	set: function(name, value, days) {
      	_hasLocalStorage ? localStorage.setItem(name, value) : _writeCookie(name, value, days);
    	},

    	// storage.get() -> read from localStorage or from cookie
    	get: function(name) {
      	return _hasLocalStorage ? localStorage.getItem(name) : _readCookie(name);
    	},

    	// storage.remove() -> removeItem or set cookie yesterday
    	remove: function(name) {
      	_hasLocalStorage ? localStorage.removeItem(name) : this.set(name, "", -1);
    	}
  	};
	})();
		
	// VARS
	
	// For injecting eBookDys.css automatically
	var loadCSS = false; // Change to true if you want to activate auto-injection
	var eBookDysCSS = 'css/eBookDys.css'; // path to the css
  
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
		button.setAttribute('type', 'button');	// Cos’ it’s not the default
		button.classList.add("ebookdys-color", color);
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
	
	// Injecting css if var -> true
	// We must inject that before following <style>
  if (loadCSS === true) {
    var link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = eBookDysCSS;
    link.type = "text/css";
  	head.appendChild(link);
  }
	
	// Injecting Menu styles
		// Setting type attribute because XHTML
		style.setAttribute('type', 'text/css');
				
		// Adding CSS for menu
		// Improve using CSSstylesheet API
		style.textContent = 'body {padding: 2%;} button {display: inline-block; width: 3em; height: 3em; border-radius: 50%; line-height: 1; margin: 0 1%; border: 0.125em solid currentColor; cursor: pointer;} #menu {display: block; margin:  1.75em auto; text-align: center !important;} button.rsDefault {background-color:'+rsDefault+'} button.yellow, html[data-ebookdys_bg="yellow"], html[data-ebookdys_bg="yellow"] body {background-color:'+yellow+'} button.mint, html[data-ebookdys_bg="mint"], html[data-ebookdys_bg="mint"] body {background-color:'+mint+'} button.blue, html[data-ebookdys_bg="blue"], html[data-ebookdys_bg="blue"] body {background-color:'+blue+'} button.pink, html[data-ebookdys_bg="pink"], html[data-ebookdys_bg="pink"] body {background-color:'+pink+'} h1 {page-break-before: avoid;} .rule {width: 100%; height: 0.125rem; background-color: rgba(0, 0, 0, 0.35); line-height: 0; font-size: 0; position: absolute; left: 0; right: 0;} label {display: block; margin-top: 24px;}';
		
		// Injecting styles in head
	  head.appendChild(style);
	  
	// Adding background to body if previously set by user
	var previousBg = storage.get('eBookDys_bg');
	if (previousBg) {
		root.dataset.ebookdys_bg = previousBg;
		// Adding disabled attribute to corresponding button
		var disable = document.getElementById(previousBg); // get by id -> more perf
		disable.disabled = true;
	};
	  
	// Event Listeners
	function toggleBackground(e) {
		var enable = document.querySelector('.ebookdys-color[disabled]'); // We scope since other buttons will be added
		var bodyColor = this.getAttribute('id'); // cos id is unique
		root.dataset.ebookdys_bg = bodyColor;		 // cos we must deal with RS’ custom attributes, ids and classes…
		storage.set('eBookDys_bg', bodyColor); // Set item for later retrieving
		if (enable) { // if a button is disabled
			enable.removeAttribute('disabled'); // remove attribute = reenable
		}
		this.disabled = true; // then disable clicked button
		e.preventDefault(); // The two because eBook RS
		e.stopPropagation(); // The two because eBook RS
	};
	
	// ----------------------------------------------------------------------
	// Speak
	
	/* 
		Super crude implementation
	- Should check if block element (or else content of inline el)
	- Probably should provide users with settings (voice, pitch, rate…)
	- Maybe provide granularity -> paragraph, sentence, parts of sentence, etc.
	*/
	
  if ('speechSynthesis' in window) {
		var label = document.createElement('label');
		var isPaused = true;
	
		label.innerHTML = '<input type="checkbox" name="tts" value="Text to Speech"/> Text To Speech';
		menu.appendChild(label);
	
		label.addEventListener('change', function(e) {
			var input = label.getElementsByTagName("input")[0];
	  	if (input.checked) {
				document.addEventListener('dblclick', speechHandler, false);
			} else {
				document.removeEventListener('dblclick', speechHandler, false);
			}
		});
	
		function speechHandler(e) {
			e.preventDefault();
			e.stopPropagation();
			if (isPaused) {
				var elt = e.target;
				var toSpeak = elt.innerText;
				elt.style.fontWeight = "bold";
				var utterance = new SpeechSynthesisUtterance(toSpeak);
				utterance.pitch = 1;
				speechSynthesis.speak(utterance);
				isPaused = false;
				utterance.onend = function() {
					elt.style.fontWeight = "";
					isPaused = true;
				}
			}
		};
	
	}
});
function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}	