/* jshint devel:true */
/* global Handlebars */

// View 
var Site = Site || {};

Site.View = function( contentSelector, tmplSelector ) {
	var self = {};

	// Imports
	// =======
	var $  = jQuery;
	var hb = Handlebars;

	// Data
	// ====
	//var TEMPLATE_KEY = 'template',
	var template = null;

	// Public 
	// ======
	self.compileTemplate = function( tmplSelector ) {
		var source = $( tmplSelector ).html();
		template   = hb.compile( source );
	};

	self.displayJobs = function( jobs ) {
		if( template ) {
			$( contentSelector ).html( template( jobs ) );
		}
	};

	self.displayLoading = function() {
		$( contentSelector ).html('Loading...');
	};

	return self;

};