(function(){
	'use strict';

	angular
		.module('up2date',['ui.router','angular-jwt','ngMaterial','ngMessages','duScroll','ngToast','youtube-embed']);

	angular
		.module('up2date')
		.config(function($stateProvider, $httpProvider,$urlRouterProvider){
			
			$urlRouterProvider.otherwise('/frontpage');

			$stateProvider
			.state('home',{
				url:'/',
				templateUrl:'site/home/partials/home.html',
				controller:'HomeCtrl as ctrl',
				redirectTo: 'home.front'
			})
			.state('home.front',{
				url:'frontpage',
				templateUrl:'site/home/partials/home-frontpage.html',
				controller:'HomeCtrl as ctrl'
			})
			.state('home.signup',{
				url:'signup',
				templateUrl:'site/home/partials/home-signup.html',
				controller:'CSignUpCtrl as ctrl'
			})
			.state('home.signup-team',{
				url:'signup-team/:coachId',
				templateUrl:'site/home/partials/home-signup-team.html',
				controller:'CSignUpCtrl as ctrl'
			})
			.state('home.login',{
				url:'login',
				templateUrl:'site/home/partials/home-login.html',
				controller:'AuthCtrl as ctrl'
			})
			.state('home.authorize',{
				url:'authorize',
				templateUrl:'site/home/partials/home-authorize.html',
				controller:'AuthCtrl as ctrl'
			})
			.state('home.signup-player',{
				url:'/signup/:userId',
				templateUrl:'site/home/partials/home-signup-player.html',
				controller:'AuthCtrl as ctrl'
			})
			.state('admin',{
				url:'/admin',
				templateUrl:'site/admin/partials/admin-frontpage.html',
				controller:'AdminCtrl as ctrl',
				resolve: {
					users:function(coachSrv){
						return coachSrv.getUsers();
					}
				}
			})
			.state('coach',{
				url:'/coach/:coachId',
				templateUrl:'site/coach/partials/coach.html',
				controller: 'CoachCtrl as ctrl',
				resolve: {
					user:function($state){
						if(localStorage.authToken == '' || localStorage.authToken == undefined){
							return $state('login')
						}
					},
					teams: function(coachSrv,$stateParams){
						return coachSrv.getTeam($stateParams.coachId)
						.then(function(res){
							console.log(res.data.teams)
							if(res.data.teams.length === 0){
								console.log('getting there')
								coachSrv.getPlayer($stateParams.coachId)
								.then(function(res){
									var team_id = res.data.users[0].team_id;
									console.log(team_id)
									return coachSrv.getTeamById(team_id)
								})
							}
						})
					},
					oneTeam: function(coachSrv,$stateParams){
						coachSrv.getPlayer($stateParams.coachId)
						.then(function(res){
							var team_id = res.data.users[0].team_id
							return coachSrv.getTeamById(team_id)
						})
					},
					regimens:function(){
						return undefined;
					},
					players:function(){
						return undefined;
					},
					allentries:function(){
						return undefined;
					}
				}
			})
			.state('first',{
				url:'/first/:coachId',
				templateUrl:'site/coach/partials/first.html',
				controller:'CoachCtrl as ctrl',
				resolve: {
					user:function($state){
						if(localStorage.authToken == '' || localStorage.authToken == undefined){
							return $state('login')
						}
					},
					teams: function(coachSrv,$stateParams){
						return coachSrv.getTeam($stateParams.coachId)
						.then(function(res){
							 console.log(res.data.teams.length)
							if(res.data.teams.length !== 0) {
								return res.data.teams
							}
							else if(res.data.teams.length === 0){
								console.log('getting there')
								return coachSrv.getPlayer($stateParams.coachId)
								.then(function(res){
									var team_id = res.data.users[0].team_id;
									return coachSrv.getTeamById(team_id)
									.then(function(res){
										var array = [];
										array.push(res.data.teams)
										return array
									})
								})
							}
						})
					},
					players:function(){
						return undefined;
					},
					allentries:function(){
						return undefined;
					},
					regimens:function(){
						return undefined;
					}
				}
			})
			.state('coach.frontpage',{
				url:'/frontpage/:teamId',
				templateUrl:'site/coach/partials/coach-front.html',
				controller:'CoachCtrl as ctrl',
				resolve: {
					regimens:function(coachSrv,$stateParams){
						return coachSrv.getRegimensTeam($stateParams.teamId);
					},
					players:function(coachSrv,$stateParams){
						return coachSrv.getPlayersTeam($stateParams.teamId);
					},
					allentries:function(playerSrv,$stateParams){
						return playerSrv.getAllEntriesTeam($stateParams.teamId);
					}
				}
			})
			.state('coach.regimens',{
				url:'/schedules/:teamId',
				controller:'CoachCtrl as ctrl',
				templateUrl:'site/coach/partials/coach-regimens.html',
				resolve: {
					regimens:function(coachSrv,$stateParams){
						return coachSrv.getRegimensTeam($stateParams.teamId);
					}
				}
			})
			.state('coach.add_regimen',{
				url:'/add_schedule/:teamId',
				controller:'RegimenCtrl as ctrl',
				templateUrl:'site/coach/partials/coach-add-regimen.html',
				resolve:{
					regimen:function(){
						return
					}
				}
			})
			.state('coach.edit_regimen',{
				url:'/edit_schedule/:regimenId/team/:teamId',
				templateUrl:'site/coach/partials/coach-edit-regimen.html',
				controller:'RegimenCtrl as ctrl',
				resolve:{
					regimen:function(coachSrv,$stateParams){
						return coachSrv.getRegimen($stateParams.regimenId);
					}		
				}

			})
			.state('coach.media',{
				url:'/media/:teamId',
				controller:'MediaCtrl as ctrl',
				templateUrl:'site/coach/partials/coach-media.html',
				resolve: {
					media:function(mediaSrv,$stateParams){
						return mediaSrv.getMediaTeam($stateParams.teamId)
					}
				}
			})
			.state('coach.add_media',{
				url:'/add_media/:teamId',
				controller:'MediaCtrl as ctrl',
				templateUrl:'site/coach/partials/coach-add-media.html',
				resolve: {
					media:function(){
						return 
					}
				}
			})
			.state('coach.one_video',{
				url:'/media/:videoId/team/:teamId',
				templateUrl:'site/coach/partials/coach-one-video.html',
				controller:'OneVideoCtrl as ctrl',
				resolve:{
					video:function(mediaSrv,$stateParams){
						return mediaSrv.getVideo($stateParams.videoId)
					}
				}
			})
			.state('coach.team', {
				url:'/team/:teamId',
				controller:'TeamCtrl as ctrl',
				templateUrl:'site/coach/partials/coach-team.html',
				resolve:{
					players:function(coachSrv,$stateParams){
						return coachSrv.getPlayersTeam($stateParams.teamId);
					},
					allentries:function(playerSrv,$stateParams){
						return playerSrv.getAllEntriesTeam($stateParams.teamId);
					},
					user:function(coachSrv,$stateParams){
						console.log($stateParams.teamId)
						return coachSrv.getCoachesTeam($stateParams.teamId);
					}
				}
			})
			.state('coach.journal',{
				url:'/journal/:teamId',
				templateUrl:'site/coach/partials/coach-journal.html',
				controller:'CoachJournalCtrl as ctrl',
				resolve:{
					allentries:function(playerSrv,$stateParams){
						return playerSrv.getAllEntriesTeam($stateParams.teamId);
					},
					players:function(coachSrv,$stateParams){
						return coachSrv.getPlayersTeam($stateParams.teamId);
					}
				}
			})
			.state('coach.one',{
				url:'/journal/:userId/team/:teamId',
				templateUrl:'site/coach/partials/coach-journal-one-player.html',
				controller:'CoachOneCtrl as ctrl',
				resolve:{
					entries:function(playerSrv,$stateParams){
						return playerSrv.getEntries($stateParams.userId);
					},
					player:function(coachSrv,$stateParams){
						return coachSrv.getPlayer($stateParams.userId);
					}
				}
			})
			.state('coach.profile',{
				url:'/profile/:teamId',
				templateUrl:'site/coach/partials/coach-profile.html',
				controller:'CoachCtrl as ctrl',
				resolve:{
					user:function(coachSrv,$stateParams){
						return coachSrv.getPlayer($stateParams.coachId);
					}
				}
			})
			.state('player', {
				url:'/player/:userId',
				templateUrl:'site/player/partials/player.html',
				controller:'PlayerCtrl as ctrl',
				resolve:{
					user:function($state){
						if(localStorage.authToken == '' || localStorage.authToken == undefined){
							return $state('login')
						}
					},
					player:function(coachSrv,$stateParams){
						return coachSrv.getPlayer($stateParams.userId)
					},
					regimens:function(){
						return undefined;
					},
					entries:function(playerSrv,$stateParams){
						return playerSrv.getEntries($stateParams.userId);
					}
				}
			})
			.state('player.frontpage', {
				url:'/frontpage/:teamId',
				templateUrl: 'site/player/partials/player-front.html',
				controller:'PlayerCtrl as ctrl',
				resolve:{
					regimens:function(coachSrv,$stateParams){
						return coachSrv.getRegimensTeam($stateParams.teamId);
					}
				}

			})
			.state('player.regimens',{
				url:'/schedules/:teamId',
				templateUrl:'site/player/partials/player-regimens.html',
				controller:'PlayerCtrl as ctrl',
				resolve:{
					regimens:function(coachSrv,$stateParams){
						return coachSrv.getRegimensTeam($stateParams.teamId);
					}
				}
			})
			.state('player.journal', {
				url:'/journal/:teamId',
				templateUrl:'site/player/partials/player-journal.html',
				controller: 'JournalCtrl as ctrl',
				resolve:{
					entries:function(playerSrv,$stateParams){
						return playerSrv.getEntries($stateParams.userId);
					}
				}
			})
			.state('player.add_entry',{
				url:'/add_entry/:teamId',
				templateUrl:'site/player/partials/player-add-entry.html',
				controller: 'EntryCtrl as ctrl',
				resolve:{
					date:function(playerSrv){
						return playerSrv.myDate;
					},
					entry:function(){
						return
					},
					regimens:function(coachSrv,$stateParams){
						return coachSrv.getRegimensTeam($stateParams.teamId);
					}
				}
			})
			.state('player.edit_entry',{
				url:'/edit_entry/:entryId/team/:teamId',
				templateUrl:'site/player/partials/player-edit-entry.html',
				controller:'EntryCtrl as ctrl',
				resolve:{
					entry:function(playerSrv,$stateParams){
						return playerSrv.getEntry($stateParams.entryId);
					},
					regimens:function(){
						return
					}
				}

			})
			.state('player.choose_date',{
				url:'/choose_date/:teamId',
				templateUrl:'site/player/partials/player-choose-date.html',
				controller:'EntryCtrl as ctrl',
				resolve:{
					entry:function(){
						return
					},
					regimens:function(){
						return
					}
				}
			})
			.state('player.media',{
				url:'/media/:teamId',
				templateUrl:'site/player/partials/player-media.html',
				controller:'MediaCtrl as ctrl',
				resolve: {
					media:function(mediaSrv,$stateParams){
						return mediaSrv.getMediaTeam($stateParams.teamId)
					}
				}
			})
			.state('player.one_video',{
				url:'/media/:videoId/team/:teamId',
				templateUrl:'site/player/partials/player-one-video.html',
				controller:'OneVideoCtrl as ctrl',
				resolve:{
					video:function(mediaSrv,$stateParams){
						return mediaSrv.getVideo($stateParams.videoId)
					}
				}
			})
			.state('player.profile',{
				url:'/profile/:teamId',
				templateUrl:'site/player/partials/player-profile.html',
				controller:'PlayerCtrl as ctrl',
				resolve:{
					user:function(){
						return undefined;
					},
					player:function(coachSrv,$stateParams){
						return coachSrv.getPlayer($stateParams.userId);
					},
					regimens:function(){
						return undefined;
					}
				}
			})

			$httpProvider.interceptors.push(function(jwtHelper){
				return {
					request:function(config){
						if(localStorage.authToken != undefined){
							config.headers.authentication = localStorage.authToken;
						}
						return config;
					},
					response:function(response){
						var auth_token = response.headers('authentication');
						if(auth_token){
							var decrypt_token = jwtHelper.decodeToken(auth_token);
							if(decrypt_token.email){
								localStorage.authToken = auth_token;
							}
							
						}
						return response;
					}
				}
			})
		})
	angular.module('up2date')
			.run(function($rootScope) {
				$rootScope.$on('$stateChangeSuccess', function() {
  					 document.body.scrollTop = document.documentElement.scrollTop = 0;
				});
			});

	angular.module('up2date')
			.run(function($rootScope,$state) {
				$rootScope.$on('$stateChangeStart', function(evt, to, params) {
  					if (to.redirectTo) {
				       evt.preventDefault();
				       $state.go(to.redirectTo, params, {location: 'replace'})
				    }
				});
			});
})();