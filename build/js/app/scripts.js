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
 
    app.controller('myController', ['$rootScope', '$scope', '$http', '$timeout', '$window', '$location', '$anchorScroll', 'mainService', 'getWWWData', function($rootScope, $scope, $http, $timeout, $window, $location, $anchorScroll, mainService, getWWWData) {

        $scope.actualYear = new Date().getFullYear();
        $scope.quadButtons = [];
        $scope.numberOfActiveQuadButtons = 3;
        $scope.activeQuadButton = 0;
        $scope.numberOfActiveQuadButtonsB = 4;
        $scope.activeQuadButtonB = 0;
        $scope.quadButtonsAutoStep = 5000;
        $scope.quadButtonsManual = [];
        $scope.detailsFullViews = [];

        $scope.showWebsiteData = { 
            a1 : {mode: "FadeIn", selector: ".anim-1", stepTime: 500, delayTime: 0},
            a2 : {mode: "FadeIn", selector: ".anim-2", stepTime: 500, delayTime: 0},
            a3 : {mode: "FadeIn", selector: ".anim-3", stepTime: 500, delayTime: 0},
            a4 : {mode: "FadeIn", selector: ".anim-4", stepTime: 500, delayTime: 0},
            a5 : {mode: "FadeIn", selector: ".anim-5", stepTime: 500, delayTime: 0},
            a6 : {mode: "FadeIn", selector: ".anim-6", stepTime: 500, delayTime: 0},
            a7 : {mode: "FadeIn", selector: ".anim-7", stepTime: 500, delayTime: 0}
        };

        $(window).load(function() {

            $(window).scroll(function() {

                var windowElement = $(window);
                var windowScrollTop = windowElement.scrollTop();
                var siteOfertaTopOffset = $('#site-oferta').offset().top - windowScrollTop;
                var siteFeaturesTopOffset = $('#site-features').offset().top - windowScrollTop;
                var bgImage = $('.bg-image');
                var bgImageContainer = $('.bg-container');

                if (siteFeaturesTopOffset <= 0) {
                    //bgImage.attr('src', 'img/bg_'+3+'.jpg');
                    bgImageContainer.removeClass('bg-container-1').addClass('bg-container-2');
                } else if (siteOfertaTopOffset <= 0) {
                    //bgImage.attr('src', 'img/bg_'+2+'.jpg');
                    bgImageContainer.removeClass('bg-container-1').addClass('bg-container-2');
                } else {
                    //bgImage.attr('src', 'img/bg_'+1+'.jpg');
                    bgImageContainer.removeClass('bg-container-2').addClass('bg-container-1');
                }
            });

            $scope.featureElementHeight = $(".feature-element-container").height();
            $scope.featureBElementHeight = $(".feature-element-B-container").height() * 1.5;

            $scope.OnWindowResize();
            $scope.IntervalInit();

            $('.siteLoader').hide();

            mainService.ShowWebsite($scope.showWebsiteData);

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

            // features
            $('.feature-element-container').css({"height": $scope.featureElementHeight});
            $('.feature-element-B-container').css({"height": $scope.featureBElementHeight});            
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
            var sectorTopOffset = $(sectorSelector).offset().top - windowScrollTop;            
            $('html, body').animate({
                scrollTop: sectorTopOffset
            }, 1000);
        };

    }]); 

    ////////////
    // OFERTA //
    ////////////

    app.controller('tvMobilnaController', ['$scope', 'mainService', function($scope, mainService){
        angular.element(document).ready(function() {

        });

    }]);

})();;
(function(){

    var app = angular.module('myDirectives', ['myFilters']);

})();;
(function(){
 
    var app = angular.module('myFilters', []);

    app.filter('capitalize', function() {
        return function(input, scope) {
            if (input !== null)
            input = input.toLowerCase();
            return input.substring(0,1).toUpperCase()+input.substring(1);
        };
    });

    app.filter('maskEmail', function(){
        return function (input, length) {

            input = input||'';
            length = length||3;

            var parts = input.split('@');
            var masked = parts[0].substr(0, length);
            var maskLength = parts[0].length - length;

            for (var i = 0; i<maskLength; i++) {
                masked += '*';
            }

            parts[0] = masked;

            return parts.join('@');
        };
    });


})();;
(function(){

    var app = angular.module('myServices', []);

    app.factory('getWWWData', ['$http', '$log', function($http, $log){
        var cache = {};
        var urls = {
            'www_data': 'json/www_data.json'
        };

        return function (type, callback){
            if(angular.isUndefined(cache[type])){
                callback = callback||function(){};

                var url = urls[type];

                $http.get(urls[type])
                    .success(function (data, status, headers, config) {
                        cache[type] = data;
                        callback(data);
                    })
                    .error(function (data, status, headers, config) {

                        $log.error('Wystąpił błąd podczas żądania "'+url+'"!');

                    });
            } else {
                callback(data);
            }

        };
    }]);

    app.service('mainService', function () {
        var mainService = {};

        mainService.dataLoaded = false;
        ////////////////////////////////////////////////////////////////////////////////////////////
        
        mainService.EmptyWord = function(myTag) {
            $(myTag).empty();
        };
        mainService.AnimateWord = function(myTag,myWord,myDelay,myStep,fade) {
            var myChars = myWord.split("");
            var i = 0;
            var myTimer;
            var myTimeout = setTimeout(function() {
                myTimer = setInterval(timerTick, myStep);
            }, myDelay);
            function timerTick() {
                var mySpan = document.createElement("span");
                var myText = document.createTextNode(myChars[i]);
                mySpan.appendChild(myText);
                $(myTag).append(mySpan);
                if (fade) {
                    mySpan.classList.add('animation-1');                    
                } 
                i++;
                if (i >= myChars.length) {
                    clearInterval(myTimer);
                }
            }
        };
        mainService.SetNoOpacity = function(myTag) {
            $(myTag).css('opacity','0');
        };
        mainService.FadeIn = function(myTag,myDelay,myStep) {
            var FadeInShow = setTimeout(function() {
                $(myTag).animate({opacity: '1'}, myStep);
            }, myDelay);
        };

        mainService.ShowWebsite = function(showWebsiteData) {
            var totalTime = 0;
            for (var key in showWebsiteData) {
                switch (showWebsiteData[key].mode) {
                    case "AnimateWord":
                        mainService.EmptyWord(showWebsiteData[key].selector);
                        mainService.AnimateWord(showWebsiteData[key].selector,showWebsiteData[key].word,(totalTime+showWebsiteData[key].delayTime),showWebsiteData[key].stepTime);
                        totalTime += showWebsiteData[key].delayTime + (showWebsiteData[key].word.length * showWebsiteData[key].stepTime);
                        break;
                    default:      // "FadeIn"
                        mainService.SetNoOpacity(showWebsiteData[key].selector);
                        mainService.FadeIn(showWebsiteData[key].selector,(totalTime+showWebsiteData[key].delayTime),showWebsiteData[key].stepTime);
                        totalTime += showWebsiteData[key].delayTime + showWebsiteData[key].stepTime;
                }
            }
        };

        ////////////////////////////////////////////////////////////////////////////////////////////

        mainService.GetRandomInt = function(min, max) {
            var myInt = max+1;
            while (myInt > max) {
                myInt = parseInt(Math.random()*(max-min+1) + min);
            }
            return myInt;
        };

        mainService.ShuffleTable = function(myTable) {
            for(var j, x, i = myTable.length; i; j = Math.floor(Math.random() * i), x = myTable[--i], myTable[i] = myTable[j], myTable[j] = x);
            return myTable;
        };

        return mainService;
    });


})();