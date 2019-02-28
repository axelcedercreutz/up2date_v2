(function(){
  'use strict';

  angular
    .module('up2date')
    .controller('JournalCtrl',JournalCtrl);

  function JournalCtrl(playerSrv,coachSrv,$state,entries){
    var journalVm = this;
    
    if(entries.length > 0){
      journalVm.is_entries= true;
    }
    
    journalVm.entries = entries;
    //values for pages next
    journalVm.currentPage = 0;
    journalVm.entriesPerPage = 20;
    //functions
    journalVm.deleteEntry = deleteEntry;
    journalVm.goEditEntry = goEditEntry;
    journalVm.roundUp = roundUp;

    function deleteEntry(entry) {
            var id = entry.id
            playerSrv.deleteEntry(id)
    }
    function goEditEntry(entry) {
        $state.go('player.edit_entry',{entryId: entry.id,teamId:entry.team_id})
    }
    //round to upper number
      function roundUp(num){
        return Math.ceil(num)
    }
  }
})();