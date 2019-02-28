(function(){
	'use strict';

	angular
		.module('up2date')
		.controller('TeamCtrl',TeamCtrl);

	function TeamCtrl(coachSrv,playerSrv,mediaSrv,user,$state,allentries,$stateParams){
		var teamVm = this;
		
		//arrays
		teamVm.players = coachSrv.players;
		teamVm.coaches = coachSrv.coaches;
		teamVm.users = user.data.users;

		teamVm.addPlayer = addPlayer;
		teamVm.addCoach = addCoach;
		teamVm.deletePlayer = deletePlayer;
		teamVm.toOnePlayer = toOnePlayer;

		if(teamVm.players.length > 0){
			teamVm.is_players = true;
		}
		teamVm.entries = allentries;

		function addPlayer() {
			
			var newPlayer = { 
				email: teamVm.email,
				user_role: 1,
				team_id: parseInt($stateParams.teamId)
			}
			coachSrv.addPlayer(newPlayer);
		}
		function addCoach() {
			var newCoach = { 
				email: teamVm.email_coach,
				user_role: 0,
				team_id: parseInt($stateParams.teamId),
			}
			coachSrv.addPlayer(newCoach);
		}
		function deletePlayer(player) {
			var id = player.id
			console.log(id)
			mediaSrv.deletePlayerMedia(id);
			playerSrv.deletePlayerEntries(id);
			coachSrv.deletePlayer(id);
		}
		function toOnePlayer(id) {
			$state.go('coach.one',{userId: id,teamId: $stateParams.teamId})
		}
	}
})();