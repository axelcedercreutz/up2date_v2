(function(){
	'use strict';

	angular
		.module('up2date')
		.controller('PlayerCtrl',PlayerCtrl);

	function PlayerCtrl(coachSrv,playerSrv,$state,regimens,user,$stateParams,$element,player,entries,$document){
		var playerVm = this;

		//check if logged in
		if(localStorage.authToken == undefined || localStorage.authToken == null){
			$state.go('home.front');
		}

		//variables
		var nextimage = 0;
		var today = new Date();
		var textplayer = angular.element(document.getElementById('textplayer'));

		//arrays
		var images = ['http://static1.squarespace.com/static/54f023ede4b0e005530fa359/5591e4c8e4b05fd28f99fa4e/5591e517e4b0f66c09cdcf56/1435624728612/gray_marvelous_summer_day_at_yankee_stadium_pre_hd-wallpaper-1474586.jpg?format=2500w','https://tau0.files.wordpress.com/2014/04/seattle_stadium_and_mountains.jpg','https://drscdn.500px.org/photo/58110558/q%3D80_m%3D1500/2f08c0758c6ee659198b55551c29e0ba'];
		playerVm.arrayFirst = [];

		//functions that run on pageload
		backgroundSlide();

		//buttons
		playerVm.hide_btn = "Hide";

		playerVm.dayArray = coachSrv.dayArray;
		playerVm.goToText = goToText;
		playerVm.openNav = openNav;
		playerVm.closeNav = closeNav;
		playerVm.logout = logout;
		playerVm.toRegimens = toRegimens;
		playerVm.front = front;
		playerVm.toJournal = toJournal;
		playerVm.newEntry = newEntry;
		playerVm.toggleHide = toggleHide;
		playerVm.allMedia = allMedia;
		playerVm.addMedia = addMedia;
		playerVm.toProfile = toProfile;
		playerVm.goEditEntry = goEditEntry;
		playerVm.editProfile = editProfile;

		playerVm.entries = entries;
		playerVm.regimens = regimens;
		playerVm.player = player.data.users[0]
		playerVm.team_id = player.data.users[0].team_id;

		if(regimens){
			for (var i = 0; i < regimens.length; i++) {
				if(typeof regimens[i].days == 'string') {
					regimens[i].days = JSON.parse(regimens[i].days)
				}
			}
			if(regimens.length > 0){
				playerVm.is_regimens = true;
			}
			for (var i = 0; i < playerVm.regimens.length; i++) {
				for (var j = 0; j < playerVm.regimens[i].days.length; j++) {
					var month = ("0" + (today.getMonth() + 1)).slice(-2);
					var date = month +'/'+ today.getDate() +'/'+today.getFullYear();
					if (playerVm.regimens[i].days[j].date.substring(0,10) === date) {
						playerVm.arrayFirst.push(playerVm.regimens[i]);
					}
				}
			}
		}

		function backgroundSlide() {
			if(nextimage>=images.length){
				nextimage = 0;
			}
			angular.element(document.getElementById("slideShowPlayer")).css({
				'background-image':'url("'+images[nextimage++]+'")',
				'transition': 'all 2s ease-in-out',
				'color':'#f1f1f1'
			});
       		setTimeout(backgroundSlide,4000);
		};

		function goToText() {
     		$document.scrollToElementAnimated(textplayer);
    	}

    	function openNav() {
		    document.getElementById("mySidenav").style.width = "100%";
		}

		function closeNav() {
		    document.getElementById("mySidenav").style.width = "0";
		}

		function logout() {
			$state.go('home.front');
		}
		function toRegimens() {
			$state.go('player.regimens',{teamId: player.data.users[0].team_id})
		}
		function front() {
			$state.go('player.frontpage',{teamId: player.data.users[0].team_id});
		}
		function toJournal() {
			$state.go('player.journal',{teamId: player.data.users[0].team_id});
		}
		function newEntry() {
			$state.go('player.choose_date',{teamId: player.data.users[0].team_id});
		}
		function toggleHide(id) {	
			var elements = document.getElementsByClassName(id);
			if (elements[0].style.display != 'none'){
				for (var i = 0; i<elements.length;i++){
					elements[i].style.display = 'none';
				}
				document.getElementById(id).textContent="Show";
			} else {
				for (var i = 0; i<elements.length;i++){
					elements[i].style.display = "";
				}
				document.getElementById(id).textContent="Hide";
			}
				
		}
		function allMedia() {
			$state.go('player.media',{teamId:player.data.users[0].team_id});
		}
		function addMedia() {

			$state.go('player.add_media',{teamId:player.data.users[0].team_id});
		}
		function toProfile() {
			$state.go('player.profile',{teamId:player.data.users[0].team_id});
		}
		function goEditEntry(entry) {
        	$state.go('player.edit_entry',{entryId: entry.id,teamId:entry.team_id})
   		}	
		function editProfile() {
			if (playerVm.player.newpassword === "") {
				var editProfile = {
					first_name: playerVm.player.first_name,
					last_name: playerVm.player.last_name,
					email: playerVm.player.email
				}
			}
			else {
				var editProfile = {
					first_name: playerVm.player.first_name,
					last_name: playerVm.player.last_name,
					email: playerVm.player.email,
					number: playerVm.player.number,
					password: playerVm.player.newpassword
				}
			}
			var userId = $stateParams.userId;
			playerSrv.editProfile(editProfile,userId);
			playerVm.player.newpassword = "";
			$state.reload();
		}
	}
})();