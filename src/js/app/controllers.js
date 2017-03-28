(function(){
  
    var app = angular.module('myControllers', ['myDirectives', 'myServices', 'ngMaterial']);
  
    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider
            .when('/tv-mobilna', {
                controller: 'tvMobilnaController',
                templateUrl: 'views/tv-mobilna.html',
                label: 'TV-Mobilna'
            })
            .when('/fortel', {
                controller: 'fortelController',
                templateUrl: 'views/fortel.html',
                label: 'Fortel'
            })
            .when('/kontakt-sukces', {
                controller: 'kontaktController',
                templateUrl: 'views/kontakt-sukces.html',
                label: 'Kontakt'
            })
            .when('/kontakt-niepowodzenie', {
                controller: 'kontaktController',
                templateUrl: 'views/kontakt-niepowodzenie.html',
                label: 'Kontakt'
            })
            .otherwise({
                redirectTo: '/tv-mobilna'
            });            

        $locationProvider
            .html5Mode(true);
            
    }]);
 
    app.controller('myController', ['$rootScope', '$scope', '$http', '$timeout', '$window', '$location', '$anchorScroll', 'mainService', 'getWWWData', function($rootScope, $scope, $http, $timeout, $window, $location, $anchorScroll, mainService, getWWWData) {

        $scope.actualYear = new Date().getFullYear();
        $scope.quadButtons = [];
        $scope.numberOfActiveQuadButtons = 3;
        $scope.activeQuadButton = 0;
        $scope.numberOfActiveQuadButtonsB = 4;
        $scope.activeQuadButtonB = 0;
        $scope.numberOfActiveQuadButtonsF1 = 6;
        $scope.activeQuadButtonF1 = 0;
        $scope.numberOfActiveQuadButtonsF2 = 3;
        $scope.activeQuadButtonF2 = 0;
        $scope.numberOfActiveQuadButtonsF3 = 6;
        $scope.activeQuadButtonF3 = 0;
        $scope.quadButtonsAutoStep = 5000;
        $scope.quadButtonsManual = [];
        $scope.detailsFullViews = [];

        $scope.showForm = false;
        $scope.form = {
            imienazwisko: '',
            firma: '',
            telefon: '',
            wiadomosc: 'Proszę o rejestrację w celu wypróbowania systemu DEMO.'
        };

        $scope.showWebsiteData = { 
            a1 : {mode: "FadeIn", selector: ".anim-1", stepTime: 500, delayTime: 0},
            a2 : {mode: "FadeIn", selector: ".anim-2", stepTime: 500, delayTime: 0},
            a3 : {mode: "FadeIn", selector: ".anim-3", stepTime: 500, delayTime: 0},
            a4 : {mode: "FadeIn", selector: ".anim-4", stepTime: 500, delayTime: 0},
            a5 : {mode: "FadeIn", selector: ".anim-5", stepTime: 500, delayTime: 0},
            a6 : {mode: "FadeIn", selector: ".anim-6", stepTime: 500, delayTime: 0},
            a7 : {mode: "FadeIn", selector: ".anim-7", stepTime: 500, delayTime: 0},
            a8 : {mode: "FadeIn", selector: ".anim-8", stepTime: 500, delayTime: 0}
        };

        $scope.activeSelector = '#site-header';

        $(window).load(function() {

            
            $(window).scroll(function() {

                if ($location.path() === '/tv-mobilna')
                {
                    $timeout.cancel($scope.timeScroll);

                    $scope.timeScroll = $timeout(function() {

                        var windowElement = $(window);
                        var windowScrollTop = windowElement.scrollTop();
                        var bgImage = $('.bg-image');
                        var bgImageContainer = $('.bg-container');

                        var siteOferta = $('#site-oferta').offset().top - windowScrollTop;
                        var siteFeatures = $('#site-features').offset().top - windowScrollTop;
                        var siteFeatures2 = $('#site-features2').offset().top - windowScrollTop;
                        var siteDetails = $('#site-details').offset().top - windowScrollTop;
                        var siteTrial = $('#site-trial').offset().top - windowScrollTop;
                        var siteContact = $('#site-contact').offset().top - windowScrollTop;
     
                        if (siteContact <= 0) {
                            // console.log('siteContact');
                            // bgImage.attr('src', 'img/bg_'+3+'.jpg');
                            bgImageContainer.removeClass('bg-container-1').addClass('bg-container-2');
                            $scope.activeSelector = '#site-contact';
                        } else if (siteTrial <= 0) {
                            // console.log('siteTrial');
                            // bgImage.attr('src', 'img/bg_'+2+'.jpg');
                            bgImageContainer.removeClass('bg-container-1').addClass('bg-container-2');
                            $scope.activeSelector = '#site-trial';
                        } else if (siteDetails <= 0) {
                            // console.log('siteDetails');
                            // bgImage.attr('src', 'img/bg_'+2+'.jpg');
                            bgImageContainer.removeClass('bg-container-1').addClass('bg-container-2');
                            $scope.activeSelector = '#site-details';
                        } else if (siteFeatures2 <= 0) {
                            // console.log('siteFeatures2');
                            // bgImage.attr('src', 'img/bg_'+2+'.jpg');
                            bgImageContainer.removeClass('bg-container-1').addClass('bg-container-2');
                            $scope.activeSelector = '#site-features2';
                        } else if (siteFeatures <= 0) {
                            // console.log('siteFeatures');
                            // bgImage.attr('src', 'img/bg_'+2+'.jpg');
                            bgImageContainer.removeClass('bg-container-1').addClass('bg-container-2');
                            $scope.activeSelector = '#site-features';
                        } else if (siteOferta <= 0) {
                            // console.log('siteOferta');
                            // bgImage.attr('src', 'img/bg_'+2+'.jpg');
                            bgImageContainer.removeClass('bg-container-1').addClass('bg-container-2');
                            $scope.activeSelector = '#site-oferta';
                        } else {
                            // console.log('siteHeader');
                            // bgImage.attr('src', 'img/bg_'+1+'.jpg');
                            bgImageContainer.removeClass('bg-container-2').addClass('bg-container-1');
                            $scope.activeSelector = '#site-header';
                        }                    

                    }, 300);
                }

            });

            $scope.OnWindowResize();
            $scope.IntervalInit();

            $('.siteLoader').hide();

            mainService.ShowWebsite($scope.showWebsiteData);

        });

        $scope.GoToSubpage = function(activeSelector)
        {
            $scope.activeSelector = activeSelector;
            if ($location.path() === '/tv-mobilna')
            {
                if (activeSelector === '#site-fortel')
                {
                    $location.path('/fortel');
                }
                else
                {
                    $scope.ScrollSite(activeSelector);                
                }                
            }
            else
            {
                if (activeSelector === '#site-fortel')
                {
                    //
                }
                else
                {
                    $location.path('/tv-mobilna');
                    $timeout(function() {
                        $scope.ScrollSite(activeSelector);
                    }, 1000);
                }
            }
        };

        $( window ).resize(function() {
            $scope.OnWindowResize();
        });

        $scope.OnWindowResize = function() {
            /*
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
            // features
            $scope.featureElementHeight = $(".feature-element-container").height();
            $scope.featureBElementHeight = $(".feature-element-B-container").height() * 1.5;
            $('.feature-element-container').css({"height": $scope.featureElementHeight, "min-height": $scope.featureElementHeight, "max-height": $scope.featureElementHeight});
            $('.feature-element-B-container').css({"height": $scope.featureBElementHeight, "min-height": $scope.featureBElementHeight, "max-height": $scope.featureBElementHeight});            
            */
        };

        $scope.IntervalInit = function() {
            setInterval(function() {
                if (!$scope.quadButtonsManual[0])
                {
                    $scope.activeQuadButton ++;
                    if ($scope.activeQuadButton >= $scope.numberOfActiveQuadButtons)
                    {
                        $scope.activeQuadButton = 0;
                    }
                }
                if (!$scope.quadButtonsManual[1])
                {
                    $scope.activeQuadButtonB ++;
                    if ($scope.activeQuadButtonB >= $scope.numberOfActiveQuadButtonsB)
                    {
                        $scope.activeQuadButtonB = 0;
                    }
                }
                if (!$scope.quadButtonsManual[2])
                {
                    $scope.activeQuadButtonF1 ++;
                    if ($scope.activeQuadButtonF1 >= $scope.numberOfActiveQuadButtonsF1)
                    {
                        $scope.activeQuadButtonF1 = 0;
                    }
                }
                if (!$scope.quadButtonsManual[3])
                {
                    $scope.activeQuadButtonF2 ++;
                    if ($scope.activeQuadButtonF2 >= $scope.numberOfActiveQuadButtonsF2)
                    {
                        $scope.activeQuadButtonF2 = 0;
                    }
                }
                if (!$scope.quadButtonsManual[4])
                {
                    $scope.activeQuadButtonF3 ++;
                    if ($scope.activeQuadButtonF3 >= $scope.numberOfActiveQuadButtonsF3)
                    {
                        $scope.activeQuadButtonF3 = 0;
                    }
                }
                $scope.$apply();
            }, $scope.quadButtonsAutoStep);
        };

        $scope.SetBG = function(numer) {
            var bgImage= $('.bg-image');
            var path = 'img/bg_'+numer+'.jpg';
            bgImage.attr('src', path);
        };

        $scope.ScrollSite = function(sectorSelector) {
            var windowElement = $(window);
            var windowScrollTop = windowElement.scrollTop();            
            var sectorTopOffset = $(sectorSelector).offset().top;
            $('html, body').animate({
                scrollTop: sectorTopOffset
            }, 1000);
        };

        $scope.SlideUpAndDownByClass = function(elementClass) {
            $(elementClass).slideUp($scope.slideTime).slideDown($scope.slideTime);
        };

        $scope.childsSlided = [];
        $scope.SlideUpAndDownChildByClass = function(e,elementChildClass) {
            if ($scope.childsSlided[elementChildClass] !== true)
            {
                $(e.currentTarget).find(elementChildClass).slideUp($scope.slideTime).slideDown($scope.slideTime);
                $scope.childsSlided = [];
                $scope.childsSlided[elementChildClass] = true;                
            }
        };

        $scope.SlideUpChildByClass = function(e,elementChildClass) {
            $(e.currentTarget).find(elementChildClass).slideUp($scope.slideTime);
        };
        $scope.SlideDownChildByClass = function(e,elementChildClass) {
            $(e.currentTarget).find(elementChildClass).slideDown($scope.slideTime);
        };

    }]); 

    app.controller('tvMobilnaController', ['$scope', 'mainService', function($scope, mainService){
        angular.element(document).ready(function() {

        });

    }]);

    app.controller('fortelController', ['$scope', 'mainService', function($scope, mainService){
        angular.element(document).ready(function() {

        });

    }]);

    app.controller('kontaktController', ['$scope', 'mainService', function($scope, mainService){
        angular.element(document).ready(function() {

        });

    }]);

})();