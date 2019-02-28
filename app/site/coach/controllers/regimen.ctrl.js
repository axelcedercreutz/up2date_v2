(function(){
	'use strict';

	angular
		.module('up2date')
		.controller('RegimenCtrl',RegimenCtrl);

	function RegimenCtrl(coachSrv,$state,$stateParams,regimen){

		var regimenVm = this;
		//arrays
		regimenVm.days = [{date:""},{date:""},{date:""},{date:""},{date:""},{date:""},{date:""}];
		console.log(regimenVm.days)
		regimenVm.dayArray = coachSrv.dayArray;
		//public functions
		regimenVm.changeDate = changeDate;
		regimenVm.onlyMonday = onlyMonday;
		regimenVm.addRegimen = addRegimen;
		regimenVm.editRegimen = editRegimen;
		regimenVm.cancelEditRegimen = cancelEditRegimen;

		if($stateParams.regimenId != undefined) {
				regimen.data.regimens.days = JSON.parse(regimen.data.regimens.days);
				regimenVm.days = regimen.data.regimens.days;
				regimenVm.title = regimen.data.regimens.title;
		}
		function changeDate() {
			for (var i = 1; i < regimenVm.days.length; i++) {
				regimenVm.days[i].date = new Date(regimenVm.days[i-1].date);
				regimenVm.days[i].date.setDate(regimenVm.days[i].date.getDate()+1);
			}
		}
		
		function onlyMonday(date) {
    		var day = date.getDay();
   			return day === 1;
 		} 

		function addRegimen () {
			for(var i = 0; i < regimenVm.days.length; i++) {
				regimenVm.days[i].date = regimenVm.days[i].date.toLocaleDateString()
			}
			var newRegimen = {
				title: regimenVm.title,
				days: JSON.stringify(regimenVm.days),
				team_id: parseInt($stateParams.teamId),
				coach_id: parseInt($stateParams.coachId)
			}
			coachSrv.addRegimen(newRegimen)
			.then(function(){
				$state.go('coach.regimens',{teamId:$stateParams.teamId});
			})
		}

		function editRegimen(){
			var editRegimen = {
				title: regimenVm.title,
				days: JSON.stringify(regimenVm.days)
			}
			
			var regimenId = $stateParams.regimenId;
			coachSrv.editRegimen(editRegimen,regimenId)
			.then(function(){
				$state.go('coach.regimens',{teamId:$stateParams.teamId});
			})

		}
		function cancelEditRegimen() {
			$state.go('coach.regimens',{teamId:$stateParams.teamId});
		}
	}
})();