(function(){

	angular
		.module('up2date')
		.service('coachSrv',CoachService);

	function CoachService($state,api){
		var self = this;

		//public variables
		self.searchTerm = '';
		self.players = [];
		self.player = [];
		self.days = [];
		self.regimens = [];
		self.dayArray = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
		
		//public functions
		self.getTeams = getTeams;
		self.getTeam = getTeam;
		self.getTeamById = getTeamById;
		self.getUsers = getUsers;
		self.getCoachesTeam = getCoachesTeam;
		self.deleteTeam = deleteTeam;
		self.addPlayer = addPlayer;
		self.getPlayersTeam = getPlayersTeam;
		self.getPlayers = getPlayers;
		self.getPlayer = getPlayer;
		self.deletePlayer = deletePlayer;
		self.deletePlayersTeam = deletePlayersTeam;
		self.addRegimen = addRegimen;
		self.getRegimensTeam = getRegimensTeam;
		self.getRegimens = getRegimens;
		self.getRegimen = getRegimen;
		self.editRegimen = editRegimen;
		self.deleteRegimen = deleteRegimen;
		self.deleteRegimensTeam = deleteRegimensTeam;
		self.deleteRegimensCoach = deleteRegimensCoach;

		function getTeams() {
			return api.request('/teams/',{},'GET')
		}
		function getUsers() {
			return api.request('/users/',{},'GET')
		}
		function getCoachesTeam(teamId) {
			return api.request('/users/coaches/'+teamId,{},'GET')
		}
		function getTeam(coachId) {
			return api.request('/teams/'+coachId,{},'GET')
		}
		function getTeamById(teamId) {
			return api.request('/teams/team/'+teamId,{},'GET')
		}
		function deleteTeam(teamId) {
			return api.request('/teams/remove/'+teamId,{},'DEL')
			.then(function(res){
				if(res.status === 200){
					$state.reload();
				}
			})
		}
		function getPlayers() {
		return api.request('/users/players',{},'GET')
			.then(function(res){
				self.players = res.data.users;
				return self.players;
			})
		}
		function getPlayersTeam(teamId) {
			return api.request('/users/players/'+teamId,{},'GET')
			.then(function(res){
				self.players = res.data.users;
				return self.players;
			})
		}
		function getPlayer(userId) {
			return api.request('/users/'+userId,{},'GET')
		}

		function getRegimens() {
		return api.request('/regimens',{},'GET')
			.then(function(res){
				self.regimens = res.data.regimens;
				return self.regimens;
			})
		}

		function getRegimensTeam(teamId) {
			return api.request('/regimens/teams/'+teamId,{},'GET')
			.then(function(res){
				self.regimens = res.data.regimens;
				return self.regimens;
			})
		}

		function getRegimen(regimenId) {
			return api.request('/regimens/'+regimenId,{},'GET')
		}

		function addPlayer(player) {
			console.log(player)
			return api.request('/auth/register',player,'POST')
			.then(function(res){
				if(res.status === 200){
					console.log(res.data)
					self.players.push(res.data.users);
					$state.reload();
				}
			})
		}
		function deletePlayer(userId){
			return api.request('/users/remove/'+userId,{},'DEL')
			.then(function(res){
				if(res.status === 200){
					$state.reload();
				}
			})
		}
		function deletePlayersTeam(teamId){
			return api.request('/users/remove/team/'+teamId,{},'DEL')
			.then(function(res){
				if(res.status === 200){
					$state.reload();
				}
			})
		}
		function addRegimen (regimen) {
			console.log(regimen)
			return api.request('/regimens/create',regimen,'POST')
			.then(function(res){
				if(res.status === 200){
					res.data.regimens.days = JSON.parse(res.data.regimens.days)
					console.log(res.data.regimens)
					self.regimens.push(res.data.regimens);
				}
			})
		}

		function editRegimen (regimen,regimenId){
			return api.request('/regimens/'+regimenId,regimen,'PUT')
			.then(function(res){
				if(res.status === 200){
					console.log(res.data);
				}
			})
		}

		function deleteRegimen(regimenId){
			return api.request('/regimens/remove/'+regimenId,{},'DEL')
			.then(function(res){
				if(res.status === 200){
					$state.reload();
				}
			})
		}
		function deleteRegimensTeam(teamId){
			console.log(teamId)
			return api.request('/regimens/remove/team/'+teamId,{},'DEL')
			.then(function(res){
				if(res.status === 200){
					$state.reload();
				}
			})
		}
		function deleteRegimensCoach(coachId){
			console.log(coachId)
			return api.request('/regimens/remove/coach/'+coachId,{},'DEL')
		}
	}
})();