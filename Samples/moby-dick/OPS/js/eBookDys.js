/*  eBookDys.js — a set of helpers for dyslexic readers
		LICENCE: Creative Commons Zero (this is public domain)

	 	APPROACH
 		“First build it, then improve it (maybe) then let hardcore Javascripters make it more elegant.” — Jiminy Panoz

 		TODO
 		- check (xml:)lang and apply button’s aria-label accordingly
 		- pop-up menu (less disrupting)
 		- letter/word spacing (might screw pagination up)
 		- remove images (might screw pagination up)

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
	
	var isNotTouch = true; 
	
	if ('touchend' in window) {
		return isNotTouch = false;
	}
	
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
	
	// Wrapping contents into scoped eBookDys div
	var wrapper = document.createElement('div');
	wrapper.id = 'eBookDys-wrapper';
	while (body.firstChild) {
		wrapper.appendChild(body.firstChild);
	}
	body.appendChild(wrapper);
	
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
	
	menu.id = 'eBookDys-menu';
	
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
	
	// Event Listener
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
	
	// Injecting css if var -> true
	// We must inject that before following <style>
  if (loadCSS) {
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
		style.textContent = 'body {padding: 2%;} #eBookDys-wrapper.tts-active * {cursor: default;} button {display: inline-block; width: 3em; height: 3em; border-radius: 50%; line-height: 1; margin: 0 1%; border: 0.125em solid currentColor; cursor: pointer;} #eBookDys-menu {display: block; margin:  1.75em auto; text-align: center !important;} button.rsDefault {background-color:'+rsDefault+'} button.yellow, html[data-ebookdys_bg="yellow"], html[data-ebookdys_bg="yellow"] body {background-color:'+yellow+'} button.mint, html[data-ebookdys_bg="mint"], html[data-ebookdys_bg="mint"] body {background-color:'+mint+'} button.blue, html[data-ebookdys_bg="blue"], html[data-ebookdys_bg="blue"] body {background-color:'+blue+'} button.pink, html[data-ebookdys_bg="pink"], html[data-ebookdys_bg="pink"] body {background-color:'+pink+'} h1 {page-break-before: avoid;} #reading-rule {width: 100%; border-top: 0.1875em solid currentColor; opacity: 0.35; position: fixed; left: 0; right: 0; z-index: 0; margin: 0;} #eBookDys-tts-checker {display: block; margin-top: 20px;}';
	
	// ----------------------------------------------------------------------
	// Speak
	
	/* 
		Super crude implementation
	- Should check if block element (or else content of inline el)
	- Probably should provide users with settings (voice, pitch, rate…)
	- Maybe provide granularity -> paragraph, sentence, parts of sentence, etc.
	*/
	
  if ('speechSynthesis' in window) {
		window.utterances = []; // We need this because crappy implementations
		var ttsLabel = document.createElement('label');
		var isPaused = true;
	
		ttsLabel.id = 'eBookDys-tts-checker';
		ttsLabel.innerHTML = '<input type="checkbox" name="tts" value="Text to Speech"/> Click to Read';
		
		style.textContent += ' .eBookDys_noSelect {-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;};';
		menu.appendChild(ttsLabel);
	
		ttsLabel.addEventListener('change', function(e) {
			var input = ttsLabel.getElementsByTagName("input")[0];
	  	if (input.checked) {
				wrapper.addEventListener('click', speechHandler, false);
				wrapper.classList.add('tts-active');
				storage.set('eBookDys_tts', 'true');
			} else {
				wrapper.removeEventListener('click', speechHandler, false);
				wrapper.classList.remove('tts-active');
				storage.set('eBookDys_tts', 'false');
			}
		});
		function speechHandler(e) {
			e.preventDefault();
			e.stopPropagation();
			if (e.target && isPaused) {
			  if (e.target.matches("b, i, small, abbr, cite, code, dfn, em, strong, time, var, a, span")) {
					var elt = e.target.parentElement;
				} else {
					var elt = e.target;
				}
				elt.classList.add('eBookDys_noSelect');
				var toSpeak = elt.textContent;
				elt.style.backgroundColor = "yellow";
				var utterance = new SpeechSynthesisUtterance(toSpeak);
				utterances.push(utterance);	// Or else browser won’t necessarily fire onend…
				utterance.pitch = 1;
				speechSynthesis.speak(utterance);
				isPaused = false;
				utterance.onend = function() {
					elt.classList.remove('eBookDys_noSelect');
					elt.style.backgroundColor = "";
					isPaused = true;
				}
			}
		};
		
		var previousTTS = storage.get('eBookDys_tts');
		if (previousTTS && previousTTS == "true") {
			var input = ttsLabel.getElementsByTagName("input")[0];
			input.setAttribute("checked", "checked");
			var pushRule = new Event('change');
			ttsLabel.dispatchEvent(pushRule);
		};
	}
	
	// Reading rule
	
	if (isNotTouch) {
		var ruleLabel = document.createElement('label');
		ruleLabel.id = 'eBookDys-rule-checker';
		ruleLabel.innerHTML = '<input type="checkbox" name="rule" value="Show Reading Rule"/> Reading Rule';
		menu.appendChild(ruleLabel);
		
		ruleLabel.addEventListener('change', function(e) {
			var input = ruleLabel.getElementsByTagName("input")[0];
	  	if (input.checked) {
				var rule = document.createElement('div');
				rule.id = 'reading-rule';
				document.body.appendChild(rule);
				document.addEventListener('mousemove', ruleHandler, false);
				storage.set('eBookDys_rule', 'true');
			} else {
				document.removeEventListener('mousemove', ruleHandler, false);
				var rule = document.getElementById("reading-rule");
				rule.parentElement.removeChild(rule);
				storage.set('eBookDys_rule', 'false');
			}
		});
		function ruleHandler(e) {
				var rule = document.getElementById("reading-rule");
				// fixed pos + body.scrollTop = pagination hell | 
				// 6 = 6px offset so that you can click/select/etc.
				rule.style.top = e.pageY - document.body.scrollTop - 6 + "px";
		};
		
		var previousRule = storage.get('eBookDys_rule');
		if (previousRule && previousRule == "true") {
			var input = ruleLabel.getElementsByTagName("input")[0];
			input.setAttribute("checked", "checked");
			var pushRule = new Event('change');
			ruleLabel.dispatchEvent(pushRule);
		};
	}

	// Injecting styles in head
	head.appendChild(style);
	  
	// Injecting Menu in doc fragment then pushing doc fragment as first child in body
	push.appendChild(menu);
	body.insertBefore(push, body.firstChild);
	
	// Adding background to body if previously set by user
	var previousBg = storage.get('eBookDys_bg');
	if (previousBg) {
		root.dataset.ebookdys_bg = previousBg;
		// Adding disabled attribute to corresponding button
		var disable = document.getElementById(previousBg); // get by id -> more perf
		disable.disabled = true;
	};
	
});
function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}	