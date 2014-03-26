// Model
var Site = Site || {};

Site.Model = function( view ) {
	'use strict';
	var self = {};

	var $ = jQuery;

	// Data
	// ====
	self._job = null;

	self.fetchJob = function( contentUrl ) {
		$.ajax({
			url:         contentUrl,
			dataType:    'json',
			beforeSend: view.displayLoading,
			success:    function( job, status, xhr ) {
				console.log( 'Success!', job );

				self._job = job;
				self._updateView();
			},
			error:      function( xhr, status, error ) {
				console.log( 'Fijate, Guero: ', error );
			}
		});
	};

	self._updateView = function() {
		view.displayJob( self._job );
	};

	return self;
};


// View 
var Site = Site || {};

Site.View = function( contentSelector ) {
	'use strict';
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

	self.displayJob = function( job ) {
		if( template ) {
			$( contentSelector ).html( template( job ) );
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
	'use strict';
	var self = {};

	// Imports
	// =======
	var $  = jQuery;

	// Data
	// ====
	var KEY = {
		VIEW: 'view-job'
	};

	// Public
	// ======
	self.bindUiControls = function() {
		self._bindViewControls();
	};

	self.viewJob = function( jobId ) {
		var $viewControls = $( '[data-' + KEY.VIEW + ']' );

		$viewControls.each(function() {
			var curJobId = $( this ).data( KEY.VIEW );

			if (curJobId === jobId ) {
				var contentUrl = $( this ).attr( 'href' );
				model.fetchJob( contentUrl );

				if( !$( this ).parent.hasClass( 'active' ) ) {
					$viewControls.parent.removeClass( 'active' );
					$( this ).parent.addClass( 'active' );
				}
			}
		});
	};

	// Helpers
	// =======
	self._bindViewControls = function() {
		$( '[data-' + KEY.VIEW + ']' ).click( function( e ) {
			e.preventDefault();

			var jobId = $( this ).data( KEY.VIEW );
			self.viewJob( jobId );
		});
	};

};







// Initialize
var Site = Site || {};

Site.Jobs = function( args ) {
	'use strict';
	var self = {};

	self.view        = new Site.View( args.containerSelector, args.tmplSelector );
	self.model       = new Site.Model( self.view );
	self.controller  = new Site.Controller( self.model );

	// Compile job template
	self.view.compileTemplate( args.tmplSelector );

	// Bind UI Controls
	self.controller.bindUiControls();

	// View job contents
	self.controller.viewJob( args.initialJob );
};