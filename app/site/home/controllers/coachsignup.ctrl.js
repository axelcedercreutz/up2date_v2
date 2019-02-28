(function(){
	'use strict';

	angular
		.module('up2date')
		.controller('CSignUpCtrl',CSignUpCtrl);

	function CSignUpCtrl($state,homeSrv,$stateParams){
		var csignupVm = this;

		//buttons

		csignupVm.back_btn = 'Back';
		csignupVm.register_btn = 'Sign Up!';
		csignupVm.createTeam_btn = 'Create Team!';
		homeSrv.register_btn = csignupVm.register_btn;

		//functions
		csignupVm.goHome = goHome;
		csignupVm.signUp = signUp;
		csignupVm.signUpTeam = signUpTeam;

		function signUp() {

			var newCoach = {
				first_name: csignupVm.first_name,
				last_name: csignupVm.last_name,
				email: csignupVm.email,
				password: csignupVm.password,
				user_role: 0
			}
			console.log(newCoach);
			homeSrv.createCoach(newCoach);
		}
		function signUpTeam() {

			var newTeam = {
				name: csignupVm.name,
				coach_id: $stateParams.coachId,
			}
			console.log(newTeam);
			homeSrv.createTeam(newTeam);
		}
		function goHome(){
			$state.go('home.front');
		}

	}
})();