(function(){
	angular
		.module('up2date')
		.controller('AuthCtrl',AuthCtrl);

	function AuthCtrl($state,api,$stateParams){
		var authVm = this;
		authVm.password;
		authVm.email;

		//public functions
		authVm.login = login;
		authVm.checkAuth = checkAuth;
		authVm.signUp = signUp;
		authVm.goHome = goHome;
		//authVm.updateUserList = updateUserList;
		//authVm.updateNewUser = updateNewUser;


		//buttons
		authVm.login_btn = 'Login';
		authVm.back_btn = 'Back';
		authVm.signup_btn = 'Check if you\'re authorized to sign up!';
		authVm.register_btn = 'Sign Up!';
		authVm.check_auth_btn = 'Check if you\'re authorized to sign up!';

	function login(){
			var login = {
				email:authVm.email,
				password:authVm.password
			}
			authVm.login_btn = "Authorizing";
			//make api call
			api.request('/auth/authenticate/',login,'POST')
			.then(function(res){
				console.log(res)
				//success callback
				if(res.status == 200){
					authVm.login_btn = "Success";
					//user exists
					if (res.data.user_role === 0){
						$state.go('first',{coachId:res.data.id});
					}

					else if (res.data.user_role === 1) {
						console.log(res.data.team_id)
						$state.go('player.frontpage',{userId:res.data.id, teamId:res.data.team_id});
					}

					else if(res.data.user_role === 2) {
						console.log(res.data)
						$state.go('admin',{userId:res.data.id});
					}

					else if (res.data.length === 0){
						authVm.login_btn = 'Invalid Password';	
					}
				}
				
			},function(res){
				//error callback
				console.log(res);
				authVm.login_btn = "Invalid Email or Password";
			})
		}

		function goHome(){
			$state.go('home.front');
		}

		function checkAuth(){
			email = authVm.email;
			return api.request('/auth/compare/'+email,'','GET')
			.then(function(res){
				if(res.status === 200){
					authVm.login_btn = "Success";
					var id = res.data.users.id
					$state.go('home.signup-player',{userId:id});
				}
			})
		}
		
		function signUp (){
			if(authVm.password == authVm.repassword && authVm.password != ''){
				var userId = $stateParams.userId;
				var user = {
					first_name: authVm.first_name,
					last_name: authVm.last_name,
					password: authVm.password,
					number: parseInt(authVm.number)
				}
				api.request('/auth/update/'+userId, user, 'PUT')
				.then(function(res){
					console.log(res.data);
					authVm.register_btn = res.data.msg;
					$state.go('home.login');
				})
			}
			else{
				authVm.register_btn = "Passwords Don't Match";
			}
		}
	}
})();