goog.require('ol3');
goog.provide('nl.controls.layerswitcher');

/**
 * @constructor
 * @extends {ol.control.Control}
 * @param {Object=} opt_options Control options.
 */
nl.controls.layerswitcher = function(opt_options) {

	var options = opt_options || {};
	
	var e_head = document.createElement('a');
	e_head.innerHTML = options.name || options.layers.get('name') || ("Layers");
	
	var e_list = document.createElement('ul');
	
	var element = document.createElement('div');
	element.className = 'nl-menu nl-layerswitcher ol-unselectable';
	element.appendChild(e_head);
	element.appendChild(e_list);
	
	
	if(options.layers instanceof ol.layer.Group)
		options.layers = options.layers.getLayers();
	else if (typeof(options.layers) === 'string') {
		// TODO get layers from id, after map was initialized.
	}
	
	// iterate over layers
	options.layers.forEach(function(sublayer, j) {
		
		// generate menu item
		var el_a = document.createElement('a');
		el_a.innerHTML= sublayer.get('name') || ("Layer "+j);
		var el = document.createElement('li');
		el.appendChild(el_a);
		
		if(sublayer.getVisible())
			el.className = 'active';
		
		e_list.appendChild(el);
		
		// add event listener to menu item
		el.addEventListener('click', function(e) {
			e.preventDefault();
			if(options.multiple == true) {
				sublayer.setVisible(!sublayer.getVisible());
			} else if(!sublayer.getVisible()) {
				options.layers.forEach(function(layer, j) {
					if(layer.getVisible()) {
						layer.setVisible(false);
					}
				});
				sublayer.setVisible(true);
			}
		}, false);
		
		// add event listener to update menu on layer change
		// TODO: only listen for visibility changes.
		sublayer.addEventListener('change:visible', function(){
			el.className = (sublayer.getVisible() ? 'active' : '');
		}, false);
		
	});
	
	ol.control.Control.call(this, {
		element: element,
		target: options.target
	});

};
ol.inherits(nl.controls.layerswitcher, ol.control.Control);

