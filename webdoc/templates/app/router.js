define([
    'jquery',
    'underscore',
    'backbone',
    'router'
], function($, _, Backbone, Router){

	var Router = Backbone.Router.extend({
	    
	    // Define Routes        
	    routes: {
	        // Default
	        '*actions': 'index'
	    },

	    'index' : function(page) {
	    	
	    }

	});

	return Router;

});