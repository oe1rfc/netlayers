goog.require('ol3');
goog.provide('nl.controls.tooltip');

/**
 * @constructor
 * @extends {ol.control.Control}
 * @param {Object=} opt_options Control options.
 */
nl.controls.tooltip = function(opt_options) {

	var options = opt_options || {};
	this._feature = null;
	
	this.element = document.createElement('div');
	this.element.className = 'nl-control nl-tooltip ol-unselectable';
	this.element.style.display = 'none';
	
	
	ol.control.Control.call(this, {
		element: this.element,
		target: 'map' // options.target
	});

};
ol.inherits(nl.controls.tooltip, ol.control.Control);


nl.controls.tooltip.prototype.setMap = function(map) {
	nl.controls.tooltip.superClass_.setMap.call(this, map);
	
	
	
	this._tooltip = new ol.Overlay({
		element: this.element,
		positioning: 'top-left',
		stopEvent: false
	});
	map.addOverlay(this._tooltip);
	
	var _this = this;
	map.getViewport().addEventListener('mousemove', function(evt) {
		var pixel = map.getEventPixel(evt);
		var feature = map.forEachFeatureAtPixel(pixel,
			function(feature, layer) {
				return feature;
			});
		if(feature)
			_this.showTooltip(feature);
		else if(_this._feature)
			_this.hideTooltip();
	});
};

nl.controls.tooltip.prototype.showTooltip = function(feature) {
	if(!feature.tooltip || this._feature == feature)
		return
	this._feature = feature;
	
	this.element.innerHTML = feature.get('name');
	this.element.style.display = '';
	this._tooltip.setPosition(feature.getGeometry().getCoordinates());
};

nl.controls.tooltip.prototype.hideTooltip = function() {
	this._feature = null;
	this.element.style.display = 'none';
};
