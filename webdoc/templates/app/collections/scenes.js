define([
    'underscore',
    'backbone',
    'models/scene'
], function(_, Backbone, SceneModel){

    var ScenesCollection = Backbone.Collection.extend({
        model: SceneModel,
    });

    return ScenesCollection;

});