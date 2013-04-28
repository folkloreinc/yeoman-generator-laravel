require.config({
    paths: {
        'jquery': 'components/jquery/jquery.min',
        'underscore': 'components/underscore/underscore-min',
        'backbone': 'components/backbone/backbone-min',
        'text': 'components/requirejs-text/text',

        // Application Folders
        // -------------------
        'app': 'app/app',
        'router': 'app/router',
        'collections': 'app/collections',
        'models': 'app/models',
        'views': 'app/views',
        'templates': '/templates'
    },
    shim: {
        'underscore': {
            'exports': '_'
        },
        'backbone': {
            'deps': ['underscore', 'jquery'],
            'exports': 'Backbone'
        }
    }
});

require(['jquery','underscore','app'], function ($,_,App) {

    'use strict';

    App.initialize();

});