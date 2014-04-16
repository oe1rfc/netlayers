goog.require('ol3');
goog.provide('nl.model.Node');

/**
 * @constructor
 * @extends {ol.Feature}
 */
nl.model.Node = function(opt_values) {
	
	opt_values = opt_values || {'lon': 0, 'lat':0}
	
	this.tooltip = true;
	
	goog.base(this, opt_values);
	
	this.setGeometry(new ol.geom.Point(ol.proj.transform([this.get('lon'), this.get('lat')], 'EPSG:4326', 'EPSG:3857'), this.get('opt_layout')) );
	this.setId(this.get('id'));
};
goog.inherits(nl.model.Node, ol.Feature);



nl.model.Node.prototype.getName = function() {
	return this.get('name');
};

nl.model.Node.prototype.setName = function(val) {
	return this.set('name', val);
};

nl.model.Node.prototype.getType = function() {
	return this.get('type');
};

nl.model.Node.prototype.setType = function(val) {
	return this.set('type', val);
};

