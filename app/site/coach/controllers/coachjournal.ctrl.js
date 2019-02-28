(function(){
	angular
		.module('up2date')
		.controller('CoachJournalCtrl',CoachJournalCtrl);

	function CoachJournalCtrl($state,api,$stateParams,playerSrv,coachSrv,allentries,players){
		var cjournalVm = this;
		//get right content to show
		if(allentries.length > 0){
	      cjournalVm.is_entries= true;
	    }
	    //all resolved things
	    cjournalVm.players = players;
	    cjournalVm.entries = allentries;
	    //selector
	    cjournalVm.sortOptions = [
	    	{label: 'Date', sortField:'date', reverse: true},
		    {label: 'Player', sortField: 'user_id', reverse: true}
		]
		//default value for selector
		cjournalVm.sortSelect = cjournalVm.sortOptions[0];
		//values for pages next
		cjournalVm.currentPage = 0;
	  	cjournalVm.entriesPerPage = 20;
	    //functions
	    cjournalVm.getPlayerFirst = getPlayerFirst;
	   	cjournalVm.getPlayerLast = getPlayerLast;
	   	cjournalVm.toOnePlayer = toOnePlayer;
	   	cjournalVm.roundUp = roundUp;
	   	//get firstname
	   function getPlayerFirst(user_id){
	    	return cjournalVm.players.filter(function(player){return player.id === user_id})[0].first_name
	   }
	   //get lastname
	   function getPlayerLast(user_id){
	    	return cjournalVm.players.filter(function(player){return player.id === user_id})[0].last_name
	   }
	   //to one player's entries
	   function toOnePlayer(user_id){
	   		$state.go('coach.one',{userId: user_id,teamId: $stateParams.teamId})
	   }
	   //round to upper number
	   	function roundUp(num){
	  		return Math.ceil(num)
	  	}
	}
})();