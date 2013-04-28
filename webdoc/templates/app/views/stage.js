define([
    'jquery',
    'underscore',
    'backbone',
    'collections/scenes',
    'views/scene'
], function($, _, Backbone, ScenesCollection, SceneView){

    // VIEW: BURGUNDY
    // Main view for the whole app
    // -----------------------------

    var StageView = Backbone.View.extend({

        currentScene: null,

        initialize: function() {

            //Collection
            this.collection = new ScenesCollection();

        },

        render: function() {


            return this;
        },

        switchChapter: function(chapterId) {

            //If this is already current Chapter
            if(this.currentScene === sceneId) {
                return;
            }

            //If there is a current chapter, remove it
            if(this.currentScene) {
                this.currentScene.remove();
            }

            // Get scene model
            var sceneModel = this.collection.get(sceneId);

            // Build scene Main View
            var $scene = $('<div class="scene"></div>');
            this.currentScene = new SceneView({
                el: $scene,
                parent: this,
                model: sceneModel
            });

            //Delegate scene events
            this.listenTo(this.currentScene,'preload:start',function() {
                this.trigger('scene:preload:start',this.currentScene);
            });
            this.listenTo(this.currentScene,'preload:progress',function(percent) {
                this.trigger('scene:preload:progress',this.currentScene,percent);
            });
            this.listenTo(this.currentScene,'preload:end',function() {
                this.trigger('scene:preload:end',this.currentScene);
            });
            this.listenTo(this.currentScene,'play',function() {
                this.trigger('scene:play',this.currentScene);
            });
            this.listenTo(this.currentScene,'stop',function() {
                this.trigger('scene:stop',this.currentScene);
            });
            this.listenTo(this.currentScene,'end',function() {
                this.trigger('scene:end',this.currentScene);
            });

            //Render event when scene is loaded
            if(!this.preloaded) {
                this.currentScene.preload(_.bind(this.renderCurrentScene,this));
            } else {
                this.renderCurrentScene();
            } 

            //Trigger chapter
            this.trigger('scene:switch', this.currentScene);

        },

        renderCurrentChapter: function() {
            this.$el.append(this.currentScene.$el);
            this.currentScene.render();
            this.trigger('scene:render', this.currentScene);
        }


    });

    return StageView;

});