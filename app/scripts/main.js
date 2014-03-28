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


// View 
var Site = Site || {};

Site.View = function( contentSelector ) {
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
		VIEW: 'view-jobs',
		JOBS_URL: '/data/jobs.json'
	};

	// Public
	// ======
	self.viewJobs = function() {
		model.fetchJobs( KEY.JOBS_URL );
	};


};



// Main
var Site = Site || {};

Site.Jobs = function( args ) {
	var self = {};

	self.view        = new Site.View( args.containerSelector, args.tmplSelector );
	self.model       = new Site.Model( self.view );
	self.controller  = new Site.Controller( self.model );

	// Compile jobs template
	self.view.compileTemplate( args.tmplSelector );

	// Bind UI Controls
	//self.controller.bindUiControls();

	// View jobs contents
	self.controller.viewJobs();
};

