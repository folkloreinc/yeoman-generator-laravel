define([
    'jquery',
    'underscore',
    'backbone',
    'views/stage',
    'router'
], function($, _, Backbone, StageView, Router){


    var App = {

        'router' : null,
        'stage' : null,

        'initialize' : function(stage) {

            //Get stage elements
            var $stage = typeof(stage) != 'undefined' ? $(stage):$('body');

            //Create stage
            App.stage = new StageView({
                el: $stage
            });

            // Render main view
            App.stage.render();

            //Delegate resize to stage
            $(window).resize(_.throttle(function() {
                App.stage.trigger('stage:resize');
            },300));

            //Init router
            App.router = new Router();
            Backbone.history.start({pushState: true});

        }
    };

    return App;


});