define([
    'jquery',
    'underscore',
    'backbone',
    'models/scene'
], function($, _, Backbone, SceneModel){

    var SceneView = Backbone.View.extend({

        preloaded: false,

        events: {
            
        },

        initialize: function() {

            this.parent = this.options.parent;
            this.model = this.options.model;

            this.listenTo(this.parent, 'stage:resize', this.resize);

        },

        render: function() {

            

            //Resize
            this.resize();

            return this;

        },

        preload: function(done) {

            done = done || function(){};

            this.trigger('preload:start');

            this.preloaded = true;
            this.trigger('preload:end');
            done();

            return this;

        },

        resize: function() {

            this.trigger('chapter:resize');
            
            return this;
        },

        play: function() {
            

            this.trigger('play');

            return this;
        },

        stop: function() {

            this.trigger('stop');

            return this;
        },

        pause: function() {


            this.trigger('pause');

            return this;
        }

    });

    return SceneView;

});