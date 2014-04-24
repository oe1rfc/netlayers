goog.require('ol3');
goog.provide('nl.Map');
goog.provide('nl.map.defaultLayers');

nl.map = {}

/**
 * @class
 * extends ol3.Map
 *
 * @constructor
 * @extends {ol.Map}
 * @param {olx.MapOptions} options Map options.
 */
nl.Map = function(options) {
	options.target = goog.isDef(options.target) ? options.target : 'map';
	options.ol3Logo = goog.isDef(options.ol3Logo) ? options.ol3Logo : false;
	
	goog.base(this, options);
}
goog.inherits(nl.Map, ol.Map);


/**
 * Returns a collection of default layers.
 * 
 * @return {ol.Collection} layers
 * @todo add better default sources
 */
nl.map.defaultLayers = function() {
	return [ new ol.layer.Tile({
				source: new ol.source.OSM()
			})];
}
