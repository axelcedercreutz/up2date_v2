(function(){
	angular
		.module('up2date')
		.controller('AdminCtrl',AdminCtrl);

	function AdminCtrl($state,users,coachSrv,mediaSrv,playerSrv){
		var adminVm = this;
 		//check if logged in
		if(localStorage.authToken == undefined || localStorage.authToken == null){
			$state.go('login');
		}

		adminVm.users = users.data.users;
		//determend if there's users or not
		if(adminVm.users.length > 0){
				adminVm.is_users = true;
		}
		console.log(adminVm.users)
		//functions
		adminVm.logOut = logOut;
		adminVm.deleteUser = deleteUser;

		function logOut() {
			localStorage.removeItem('authToken');
			$state.go('home.front');
		}
		function deleteUser(user) {
			if(parseInt(user.user_role) === 0) {
				var id = user.id;
				console.log(id);
				mediaSrv.deletePlayerMedia(id);
				coachSrv.deleteRegimensCoach(id);
				coachSrv.deletePlayer(id);


			}
			else if(parseInt(user.user_role) === 1){
				var id = user.id;
				console.log(id);
				mediaSrv.deletePlayerMedia(id);
				playerSrv.deletePlayerEntries(id);
				coachSrv.deletePlayer(id);
			}
		}
	}
})();