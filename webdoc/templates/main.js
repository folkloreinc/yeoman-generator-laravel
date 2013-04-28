require.config({
    paths: {
        'jquery': 'components/jquery/jquery.min',
        'underscore': 'components/underscore/underscore-min',
        'backbone': 'components/backbone/backbone-min',
        'text': 'components/requirejs-text/text',

        // Application Folders
        // -------------------
        'collections': 'app/collections',
        'models': 'app/models',
        'views': 'app/views',
        'templates': '/templates'
    },
    shim: {
        'underscore': {
        	'exports': '_'
        },
        'backbone_core': {
            'deps': ['underscore', 'jquery'],
            'exports': 'Backbone'
        }
    }
});

require(['jquery','underscore','backbone'], function ($,_,Backbone) {

    'use strict';


});