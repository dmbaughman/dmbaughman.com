/* jshint devel:true */

// Main
var Site = Site || {};

Site.Jobs = function( args ) {
	var self = {};

	self.view        = new Site.View( args.containerSelector, args.tmplSelector );
	self.model       = new Site.Model( self.view );
	self.controller  = new Site.Controller( self.model );

	// Compile jobs template
	self.view.compileTemplate( args.tmplSelector );

	// View jobs contents
	self.controller.viewJobs();
};