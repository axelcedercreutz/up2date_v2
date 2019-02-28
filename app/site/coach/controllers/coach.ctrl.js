(function(){
	'use strict';

	angular
		.module('up2date')
		.controller('CoachCtrl',CoachCtrl);

	function CoachCtrl(coachSrv,playerSrv,mediaSrv,$state,regimens,teams,players,user,allentries,$stateParams,$location,$document){
		var coachVm = this;
		//check if logged in
		if(localStorage.authToken == undefined || localStorage.authToken == null){
			$state.go('login');
		}
		//arrays
		var images = ['http://static1.squarespace.com/static/54f023ede4b0e005530fa359/5591e4c8e4b05fd28f99fa4e/5591e517e4b0f66c09cdcf56/1435624728612/gray_marvelous_summer_day_at_yankee_stadium_pre_hd-wallpaper-1474586.jpg?format=2500w','https://drscdn.500px.org/photo/58110558/q%3D80_m%3D1500/2f08c0758c6ee659198b55551c29e0ba'];
		var playersId = [];
		coachVm.arrayFirst = [];
		coachVm.name = "";
		//variables
		var nextimage = 0;
		var today = new Date();
		var day = today.getUTCDate();
		var text = angular.element(document.getElementById('text'));
		//functions that run on load
		backgroundSlide();
		coachVm.onLoad = onLoad();
		//public functions
		coachVm.goToText = goToText;
		coachVm.front = front;
		coachVm.openNav = openNav;
		coachVm.closeNav = closeNav;
		coachVm.toRegimens = toRegimens;
		coachVm.addRegimen = addRegimen;
		coachVm.allMedia = allMedia;
		coachVm.addMedia = addMedia;
		coachVm.journal = journal;
		coachVm.team = team;
		coachVm.backToTeams = backToTeams;
		coachVm.logout = logout;
		coachVm.goToEdit = goToEdit;
		coachVm.deleteRegimen = deleteRegimen;
		coachVm.dayArray = coachSrv.dayArray;
		coachVm.goToTeam = goToTeam;
		coachVm.goCreateTeam = goCreateTeam;
		coachVm.deleteTeam = deleteTeam;
		coachVm.getPlayerFirst = getPlayerFirst;
		coachVm.getPlayerLast = getPlayerLast;
		coachVm.toOnePlayer = toOnePlayer;
		coachVm.toProfile = toProfile;
		coachVm.editProfile = editProfile;
		//getting the teamId from the url
		var locationArray = $location.path().split('/');
		var teamId = parseInt(locationArray[locationArray.length-1]);
		//everything that's being resolved
		coachVm.players = players;
		coachVm.regimens = regimens;
		coachVm.entries = allentries;
		coachVm.teams = teams;
		//show the right content on coach.teams
		if(teams !== undefined){
			if(coachVm.teams.length > 0){
					coachVm.is_teams = true;
			}
		}
		//show the right content if there's content to show
		if (regimens !== undefined){
			for (var i = 0; i < regimens.length; i++) {
				if(typeof regimens[i].days == 'string') {
					regimens[i].days = JSON.parse(regimens[i].days)
				}
			}
			if(regimens.length > 0){
				coachVm.is_regimens = true;
			}
			for (var i = 0; i < coachVm.regimens.length; i++) {				
				for (var j = 0; j < coachVm.regimens[i].days.length; j++) {
					var month = ("0" + (today.getUTCMonth() + 1)).slice(-2);
					var date = today.getUTCFullYear()+'-'+month +'-'+(today.getUTCDate());
					if(today.getUTCDate().length != 0) {
						date = month+'/'+(today.getUTCDate()) +'/'+today.getUTCFullYear();
					}
					console.log(coachVm.regimens[i].days[j].date)
					console.log(date)
					if (coachVm.regimens[i].days[j].date.substring(0,10) === date) {
						coachVm.arrayFirst.push(coachVm.regimens[i]);
					}
				}
			}
			coachSrv.getTeam($stateParams.coachId)
			.then(function(res){
				for (var i = 0; i < res.data.teams.length; i++) {
					if(res.data.teams[i].id === teamId){
						coachVm.name = res.data.teams[i].name
					}
				}
			})
		}
		//show the players if there are players
		if (players !== undefined) {
			coachVm.sortOptions = [
		    	{label: 'All players', reverse: true},
			]
				for (var i = 0; i < coachVm.players.length; i++) {
					playersId.push(coachVm.players[i].id);
		    		var pair = {label:coachVm.players[i].first_name +' '+coachVm.players[i].last_name, sortField:coachVm.players[i].id, reverse:true}
		    		coachVm.sortOptions.push(pair)
		    	}
			coachVm.sortSelect = coachVm.sortOptions[0];
		}		
		//get coach profile on coach.profile
		if (user !== undefined) {
			coachVm.user = user.data.users[0]
		}

		//slideshow
		function backgroundSlide() {
			if(nextimage>=images.length){
				nextimage = 0;
			}
			angular.element(document.getElementById("slideShowCoach")).css({
				'background-image':'url("'+images[nextimage++]+'")',
				'transition': 'all 1s ease-in-out',
				'color':'#f1f1f1'
			});
       		setTimeout(backgroundSlide,4000);
		};
		//arrow works
		function goToText() {
     		$document.scrollToElementAnimated(text);
    	}
    	//loading regimens
		function onLoad() {
			coachSrv.getRegimensTeam($stateParams.teamId)
			.then(function(res){
				for (var i = 0; i < res.length; i++) {
					if(typeof res[i].days == 'string') {
						res[i].days = JSON.parse(res[i].days)
						console.log(res[i].days)
					}
				}
				coachVm.regimens = res;
			})
		}
		//sidenav open
		function openNav() {
		    document.getElementById("mySidenav").style.width = "100%";
		}
		//sidenav close
		function closeNav() {
		    document.getElementById("mySidenav").style.width = "0";
		}
		// To Edit Regimen
		function goToEdit(regimen) {
			$state.go('coach.edit_regimen',{regimenId:regimen.id, teamId:$stateParams.teamId});
		}
		//to delete regimen
		function deleteRegimen(regimen) {
			var id = regimen.id
			coachSrv.deleteRegimen(id)
		}
		//to team frontpage from teams-page
		function goToTeam(team) {
			$state.go('coach.frontpage',{coachId:$stateParams.coachId,teamId:team})
		}
		//to frontpage from any page in coach.
		function front() {
			$state.go('coach.frontpage',{teamId:teamId});
		}
		//to all regimens
		function toRegimens() {
			$state.go('coach.regimens',{teamId:teamId});
		}
		//add regimen
		function addRegimen() {
			$state.go('coach.add_regimen',{teamId:teamId});
		}
		//media
		function allMedia() {
			$state.go('coach.media',{teamId:teamId});
		}
		//add media
		function addMedia() {	
			$state.go('coach.add_media',{teamId:teamId});
		}
		//to journal
		function journal() {
			$state.go('coach.journal',{teamId:teamId});
		}
		//to team
		function team() {
			$state.go('coach.team',{teamId:teamId});
		}
		//to all teams
		function backToTeams(){
			$state.go('first',{coachId:$stateParams.coachId})
		}
		//to coach profile
	   	function toProfile(){
	   		$state.go('coach.profile',{userId:$stateParams.userId,teamId:teamId})
	  	}
		//logout
		function logout() {
			localStorage.removeItem('authToken');
			$state.go('home.front');
		}
		//to create new team
		function goCreateTeam() {
			$state.go('home.signup-team',{coachId:$stateParams.coachId});
		}
		//delete team
		function deleteTeam(teamId) {
			mediaSrv.deleteMediaTeam(teamId);
			coachSrv.deleteRegimensTeam(teamId);
			playerSrv.deletePlayerEntriesTeam(teamId);
			coachSrv.deletePlayersTeam(teamId);
			coachSrv.deleteTeam(teamId);
		}
		//get first name
		function getPlayerFirst(user_id){
	    	return coachVm.players.filter(function(player){return player.id === user_id})[0].first_name
	   	}
	   	//get lastname
	   	function getPlayerLast(user_id){
	    	return coachVm.players.filter(function(player){return player.id === user_id})[0].last_name
	   	}
	   	//go to one players entries
	   	function toOnePlayer(user_id){
	   		$state.go('coach.one',{userId: user_id,teamId: $stateParams.teamId})
	   	}
	   	//edit profile
	  	function editProfile() {
	  		if(coachVm.user.newpassword === "") {
	  			var editProfile = {
					first_name: coachVm.user.first_name,
					last_name: coachVm.user.last_name,
					email: coachVm.user.email
				}
			}
			else{
				var editProfile = {
					first_name: coachVm.user.first_name,
					last_name: coachVm.user.last_name,
					email: coachVm.user.email,
					password: coachVm.user.newpassword
				}
			}
			var coachId = $stateParams.coachId;
			playerSrv.editProfile(editProfile,coachId);
			coachVm.user.newpassword = "";
			$state.reload();
		}
	}
})();