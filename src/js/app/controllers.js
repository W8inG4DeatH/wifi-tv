(function(){
  
    var app = angular.module('myControllers', ['myDirectives', 'myServices', 'ngMaterial']);
  
    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider
            .when('/tv-mobilna', {
                controller: 'tvMobilnaController',
                templateUrl: 'views/tv-mobilna.html',
                label: 'TV-Mobilna'
            })
            .otherwise({
                redirectTo: '/tv-mobilna'
            });            

        $locationProvider
            .html5Mode(true);
            
    }]);
 
    app.controller('myController', ['$rootScope', '$scope', '$http', '$window', '$location', '$anchorScroll', 'mainService', 'getWWWData', function($rootScope, $scope, $http, $window, $location, $anchorScroll, mainService, getWWWData) {

        $scope.actualYear = new Date().getFullYear();
        $scope.activeOffer = 0;

        $scope.showWebsiteData = { 
            a1 : {mode: "FadeIn", selector: ".anim-1", stepTime: 500, delayTime: 0},
            a2 : {mode: "FadeIn", selector: ".anim-2", stepTime: 500, delayTime: 0},
            a3 : {mode: "FadeIn", selector: ".anim-3", stepTime: 500, delayTime: 0},
            a4 : {mode: "FadeIn", selector: ".anim-4", stepTime: 500, delayTime: 0},
            a5 : {mode: "FadeIn", selector: ".anim-5", stepTime: 500, delayTime: 0},
            a6 : {mode: "FadeIn", selector: ".anim-6", stepTime: 500, delayTime: 0},
            a7 : {mode: "FadeIn", selector: ".anim-7", stepTime: 500, delayTime: 0},
            a8 : {mode: "FadeIn", selector: ".anim-8", stepTime: 500, delayTime: 0},
            a9 : {mode: "FadeIn", selector: ".anim-9", stepTime: 500, delayTime: 0},
            a10 : {mode: "FadeIn", selector: ".anim-A", stepTime: 500, delayTime: 0},
            a11 : {mode: "FadeIn", selector: ".anim-B", stepTime: 500, delayTime: 0},
            a12 : {mode: "FadeIn", selector: ".anim-C", stepTime: 500, delayTime: 0}
        };

        $(window).load(function() {

            /*
            $(window).scroll(function() {

                var windowElement = $(window);
                var windowScrollTop = windowElement.scrollTop();
                var siteOfertaTopOffset = $('#site-oferta').offset().top - windowScrollTop;
                var sitePobierzTopOffset = $('#site-pobierz').offset().top - windowScrollTop;
                var bgImage= $('.bg-image');

                if (sitePobierzTopOffset <= 0) {
                    bgImage.attr('src', 'img/bg_'+3+'.jpg');
                } else if (siteOfertaTopOffset <= 0) {
                    bgImage.attr('src', 'img/bg_'+2+'.jpg');
                } else {
                    bgImage.attr('src', 'img/bg_'+1+'.jpg');
                }
            });
            */

            $('.siteLoader').hide();

            //mainService.ShowWebsite($scope.showWebsiteData);

        });

        $( window ).resize(function() {
            $scope.OnWindowResize();
        });

        $scope.OnWindowResize = function() {
            var width = $( window ).width();
            var height = $( window ).height();
            var bgContainer = $('.bg-container');
            if ( width > (1280/800) * height ) {
                bgContainer.width(width);
                bgContainer.height(800 * width / 1280);
                var topOffset = (height - bgContainer.height()) / 2;
                bgContainer.css({top:topOffset, left:0});
            } else {
                bgContainer.height(height);
                bgContainer.width(1280 * height / 800);
                var leftOffset = (width - bgContainer.width()) / 2;
                bgContainer.css({top:0, left:leftOffset});
            } 
        };

        $scope.SetBG = function(numer) {
            var bgImage= $('.bg-image');
            var path = 'img/bg_'+numer+'.jpg';
            bgImage.attr('src', path);
        };

        $scope.ScrollSite = function(sectorId) {
            $location.hash(sectorId);
            $anchorScroll();
        };

        $scope.OnWindowResize();

    }]); 

    ////////////
    // OFERTA //
    ////////////

    app.controller('tvMobilnaController', ['$scope', 'mainService', function($scope, mainService){
        angular.element(document).ready(function() {

        });
    }]);

})();