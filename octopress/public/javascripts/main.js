(function(){
	if(!document.querySelector) return;

	//	polyfills
	this.Element && function(ElementPrototype) {
		ElementPrototype.matchesSelector = ElementPrototype.matchesSelector || 
		ElementPrototype.mozMatchesSelector ||
		ElementPrototype.msMatchesSelector ||
		ElementPrototype.oMatchesSelector ||
		ElementPrototype.webkitMatchesSelector ||
		function (selector) {
			var node = this, nodes = (node.parentNode || node.document).querySelectorAll(selector), i = -1;

			while (nodes[++i] && nodes[i] != node);

			return !!nodes[i];
		}
	}(Element.prototype);

	function closest(haystack, needleSelector) {
	  needleSelector = needleSelector.toUpperCase();
	  do {
	    if (haystack.nodeName === needleSelector) {
	      return haystack;
	    }
	  } while (haystack = haystack.parentNode);

	  // not found
	  return null;
	}

	function centerImages() {
		var images = document.querySelectorAll('img');

		var p;
		Array.prototype.forEach.call(images, function(image){
			p = closest(image, 'p');
			if(!p) return;

			p.classList.add('has-image');
		});
	}


	(function init(){
		centerImages();
	}());


	


}());