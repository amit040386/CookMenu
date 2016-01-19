define(['angular',
        'uiRouter',
        'jquery',
        'config',
        'ionic',
        'underscore',
        'translate',
        'translateDynamic',
        'modules/common/common.module',
        'modules/login/login.module',
        'modules/dashboard/dashboard.module',
        'modules/recipe/recipe.module'
        ],

    function (angular, uiRouter, $) {
        'use strict';
        
        // module list
        var commonModuleList = [
            'app.common.module'
        ],
            moduleList = [            
            'app.login.module',
            'app.dashboard.module',
            'app.recipe.module'
        ];

        // adding module dependencies
        var app = angular.module('app', [
            'ionic',
            'pascalprecht.translate',            
            'app.config',
            'ui.router'].concat(commonModuleList).concat(moduleList));
    
        app.moduleList = moduleList;
        app.commonModuleList = commonModuleList;
            
        return app;

    });