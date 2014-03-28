/* jshint devel:true */
/* global Handlebars */

// Model
var Site = Site || {};

Site.Model = function( view ) {
	var self = {};

	var $ = jQuery;

	// Data
	// ====
	self._jobs = null;

	self.fetchJobs = function( contentUrl ) {
		$.ajax({
			url:         contentUrl,
			dataType:    'json',
			beforeSend: view.displayLoading,
			success:    function( jobs, status, xhr ) {
				console.log( 'Success!', jobs );
				console.log( 'Status: ', status );
				console.log( 'xhr stuff: ', xhr );

				self._jobs = jobs;
				self._updateView();
			},
			error:      function( xhr, status, error ) {
				console.log( 'Fijate, Guero: ', error );
			}
		});
	};

	self._updateView = function() {
		view.displayJobs( self._jobs );
	};

	return self;
};