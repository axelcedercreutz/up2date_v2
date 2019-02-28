(function(){
  'use strict';

  angular
    .module('up2date')
    .controller('CoachOneCtrl',CoachOneCtrl);

  function CoachOneCtrl(playerSrv,coachSrv,$state,entries,player,$stateParams){
    var coachoneVm = this;
    
    if(entries.length > 0){
      coachoneVm.is_entries= true;
    }
    coachoneVm.entries = entries;
    coachoneVm.player = player;

    coachoneVm.first_name = coachoneVm.player.data.users[0].first_name;
    coachoneVm.last_name = coachoneVm.player.data.users[0].last_name;

    //functions
    coachoneVm.getBack = getBack;
    coachoneVm.getBackTeam = getBackTeam;
    coachoneVm.addComment = addComment;

    function getBack() {
      $state.go('coach.journal',{teamId: $stateParams.teamId});
    }
    function getBackTeam() {
      $state.go('coach.team',{teamId: $stateParams.teamId});
    }
    function addComment(entry) {
      console.log('clicked'); 
    }

  }
})();