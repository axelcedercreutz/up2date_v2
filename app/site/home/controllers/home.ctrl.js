(function(){
	'use strict';

	angular
		.module('up2date')
		.controller('HomeCtrl',HomeCtrl);

	function HomeCtrl($state,homeSrv,$location,$document,$anchorScroll){
		var homeVm = this;

		//arrays
		var images = ['https://www.pogophysio.com.au/wp-content/uploads/runners-1.jpg','http://simplifythegetgoing.com/wp-content/uploads/2015/11/home-background-beach-color.jpg','http://www.outdoorresearch.com/blog/images/articles/14SPen0032lowres.jpg'];

		//variables
		var nextimage = 0;
		var quotes = angular.element(document.getElementById('quotes'))
		var texthome = angular.element(document.getElementById('texthome'));
		
		//functions that run on load
		backgroundSlide();

		//functions
		homeVm.toGetStarted = toGetStarted;
		homeVm.toAboutUs = toAboutUs;
		homeVm.toQuotes = toQuotes;
		homeVm.toTextHome = toTextHome;
		homeVm.front = front;
		homeVm.coach = coach;
		homeVm.player = player;
		homeVm.login = login;
		homeVm.signUpNews = signUpNews;
		homeVm.github = github;
		homeVm.linkedin = linkedin;
		homeVm.facebook = facebook;
		homeVm.website = website;

		function backgroundSlide() {
			if(nextimage>=images.length){
				nextimage = 0;
			}
			angular.element(document.getElementById("slideShow")).css({
				'background-image':'url("'+images[nextimage++]+'")',
				'transition': 'all 1s ease-in-out',
				'color':'#f1f1f1'
			});
			angular.element(document.getElementById("slideShow_icon")).css({
				'color':'#f1f1f1'
			});
			if(nextimage  === 2 || nextimage === 3){
				angular.element(document.getElementById("slideShow")).css({
					'color':'black'
				});
				angular.element(document.getElementById("slideShow_icon")).css({
					'color':'black'
				});
			}
       		setTimeout(backgroundSlide,4000);
		};

		function toGetStarted(id) {
			var id = angular.element(document.getElementById(id));			// })
			$document.scrollTop(id[0].offsetTop,1500);
		}
		function toAboutUs(id) {
			var id = angular.element(document.getElementById(id));			// })
			$document.scrollTop(id[0].offsetTop,1500);
		}
		function toQuotes(id) {
			var id = angular.element(document.getElementById(id));			// })
			$document.scrollTop(id[0].offsetTop,1500);
		}

    	function toTextHome() {
     		$document.scrollToElementAnimated(texthome);
    	}

		function front() {
			$state.go('home.front');
		}

		function coach() {
			$state.go('home.signup');
		}

		function player() {
			$state.go('home.authorize');
		}

		function login() {
			$state.go('home.login');
		}
		function signUpNews() {
			var newsEmail = {
				email: homeVm.newsemail
			}
			console.log(newsEmail)
		}
		function github() {
			window.location = "https://github.com/axelcedercreutz";
		}
		function linkedin() {
			window.location = "https://www.linkedin.com/in/axel-cedercreutz";
		}
		function facebook() {
			window.location = "https://www.facebook.com/axel.cedercreutz"
		}
		function website() {
			window.location = "http://www.axelcedercreutz.com";
		}

	}
})();