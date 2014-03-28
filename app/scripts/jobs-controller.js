/* jshint devel:true */

// Controller 
var Site = Site || {};

Site.Controller = function( model ) {
	var self = {};

	// Imports
	// =======
	var $  = jQuery;

	// Data
	// ====
	var KEY = {
		DATA_URL: '/data/jobs.json'
	};

	// Public
	// ======
	self.viewJobs = function() {
		model.fetchJobs( KEY.DATA_URL );
	};

	return self;
};