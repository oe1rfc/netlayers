goog.require('ol3');
goog.provide('nl.controls.popup');

/**
 * @constructor
 * @extends {ol.control.Control}
 * @param {Object=} opt_options Control options.
 */
nl.controls.popup = function(opt_options) {

	var options = opt_options || {};
	this._feature = null;
	
	this.element = document.createElement('div');
	this.element.className = 'nl nl-popup ol-unselectable';
	this.element.style.display = 'none';
	
	this.element.innerHTML + '<a href="#" id="popup-closer" class="nl-popup-closer"></a><div id="popup-content"></div>';
	this.content = document.createElement('div');
	this.content.className = 'nl-content';
	
	this.element.appendChild(this.content);
	
	ol.control.Control.call(this, {
		element: this.element,
		target: options.target
	});

};
ol.inherits(nl.controls.popup, ol.control.Control);


nl.controls.popup.prototype.setMap = function(map) {
	nl.controls.popup.superClass_.setMap.call(this, map);
	
	
	
	this._tooltip = new ol.Overlay({
		element: this.element,
		positioning: 'top-center',
		stopEvent: false
	});
	map.addOverlay(this._tooltip);
	
	var _this = this;
	map.on('click', function(evt) {
		var feature = map.forEachFeatureAtPixel(evt.pixel,
			function(feature, layer) {
				return feature;
			});
		if(feature)
			_this.showPopup(feature);
		else if(_this._feature)
			_this.hidePopup();
	});
};

nl.controls.popup.prototype.showPopup = function(feature) {
	if(this._feature == feature)
		return
	this._feature = feature;
	
	this.content.innerHTML = feature.get('name');
	this.element.style.display = 'block';
	this._tooltip.setPosition(feature.getGeometry().getCoordinates());
};

nl.controls.popup.prototype.hidePopup = function() {
	this._feature = null;
	this.element.style.display = 'none';
};
