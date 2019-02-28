(function(){
	'use strict';

	angular
		.module('up2date')
		.controller('EntryCtrl',EntryCtrl);

	function EntryCtrl($scope,playerSrv,coachSrv,$state,entry,regimens,$stateParams){
		var entryVm = this
		entryVm.myDate = playerSrv.myDate;

		if (entry) {
		entryVm.entries = entry.data.entries;
		}

		//buttons
		entryVm.entry_btn = 'Continue';

		//functions
		entryVm.continueEntry = continueEntry;
		entryVm.createEntry = createEntry;
		entryVm.cancelEdit = cancelEdit;
		entryVm.findPossibleData = findPossibleData;
		entryVm.editEntry = editEntry;

		entryVm.findPossibleData();

		function continueEntry () {
			playerSrv.myDate = entryVm.myDate;
			$state.go('player.add_entry',{teamId:$stateParams.teamId});
		}

		function createEntry () {
			var newEntry = {
				date: entryVm.myDate.toLocaleDateString(),
				time: entryVm.practiceLength,
				type: entryVm.practiceType,
				heavy: entryVm.practiceHeavy,
				comment: entryVm.practiceComment,
				user_id: $stateParams.userId,
				team_id: parseInt($stateParams.teamId)
			}
			console.log(newEntry);
			playerSrv.createEntry(newEntry)
			.then(function(){
				$state.go('player.journal',{teamId:$stateParams.teamId});
			})
		}

		function editEntry() {
			var editEntry = {
				time: entryVm.entries.time,
				type: entryVm.entries.type,
				heavy: entryVm.entries.heavy,
				comment: entryVm.entries.comment
			}

			var entryId = $stateParams.entryId;
			playerSrv.editEntry(editEntry,entryId)
			.then(function(){
				$state.go('player.journal',{teamId:$stateParams.teamId});
			})
		}

		function findPossibleData() {
			if (regimens) {
				for (var i = 0; i < regimens.length; i++) {
					var days = JSON.parse(regimens[i].days)
					for (var j = 0; j < days.length; j++) {
						var matchDate = JSON.stringify(entryVm.myDate).substring(1,11);
						if(days[j].date.substring(0,10) === matchDate) {
							entryVm.practiceLength = days[j].time;
					 		entryVm.practiceType = days[j].practice;
					 		console.log(entryVm.practiceType);
					 		return;
						}
						else {
							entryVm.practiceType = "";
							entryVm.practiceLength = "";
						}
					}
				}
			}
		}

		function cancelEdit() {
			$state.go('player.journal',{teamId: $stateParams.teamId});
		}
	}
})();