require.config({
    shim: {
        'underscore': {exports: '_'}
    },
    paths: {
        'jquery': 'components/jquery/jquery.min',
        'underscore': 'components/underscore/underscore-min'
    }
});

require(['jquery','underscore'], function ($,_) {

    'use strict';


});