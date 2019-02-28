(function(){

	angular
		.module('up2date')
		.service('homeSrv',HomeService);

	function HomeService($state,api){
		var self = this;
		self.createCoach = createCoach;
		self.createTeam = createTeam;
		self.register_btn = "";

		function createCoach (coach) {
			return api.request('/auth/register',coach,'POST')
			.then(function(res){
				if(res.status == 200){
					$state.go('home.signup-team',{coachId: res.data.user.id});
				}
			},function(res){
				//error callback
				console.log(res);
			})
		}
		function createTeam (team) {
			return api.request('/teams/create',team,'POST')
			.then(function(res){
				if(res.status == 200){
					console.log(res.data.teams)
					var userId = res.data.teams.coach_id
					var user = {
						team_id: JSON.stringify(res.data.teams.id)
					}
					console.log(user)
					return api.request('/auth/update/'+userId,user,'PUT')
					.then(function(res){
						if(res.status === 200){
							console.log(res.data);
							$state.go('home.login');
						}
					},function(res){
						//error callback
						console.log(res);
					})
				}
			},function(res){
				//error callback
				console.log(res);
			})
		}
	}
})();