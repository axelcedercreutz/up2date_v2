(function(){

	angular
		.module('up2date')
		.service('playerSrv',PlayerService);

	function PlayerService($state,api,ngToast){
		var self = this;
		self.entries = [];
		self.myDate = new Date();

		//functions
		self.createEntry = createEntry;
		self.getAllEntries = getAllEntries;
		self.getAllEntriesTeam = getAllEntriesTeam;
		self.getEntries = getEntries;
		self.getEntry = getEntry;
		self.deleteEntry = deleteEntry;
		self.editEntry = editEntry;
		self.deletePlayerEntries = deletePlayerEntries;
		self.deletePlayerEntriesTeam = deletePlayerEntriesTeam;
		self.editProfile = editProfile;

		function getAllEntries() {
			return api.request('/entries',{},'GET')
			.then(function(res){
				self.entries = res.data.entries;
				return self.entries;
			})
		}

		function getAllEntriesTeam(teamId) {
			return api.request('/entries/teams/'+teamId,{},'GET')
			.then(function(res){
				self.entries = res.data.entries;
				return self.entries;
			})
		}

		function getEntries(userId) {
			return api.request('/entries/user/'+userId,{},'GET')
			.then(function(res){
				self.entries = res.data.entries;
				return self.entries;
			})
		}

		function getEntry(entryId) {
			return api.request('/entries/'+entryId,{},'GET')
		}

		function createEntry(entry) {
			return api.request('/entries/create',entry,'POST')
			.then(function(res){
				if(res.status === 200){
					self.entries.push(res.data.entries);
				}
			})
		}

		function editEntry (entry,entryId){
			return api.request('/entries/'+entryId,entry,'PUT')
			.then(function(res){
				if(res.status === 200){
					console.log(res.data);
				}
			})
		}

		function deleteEntry(entryId){
			return api.request('/entries/remove/'+entryId,{},'DEL')
			.then(function(res){
				if(res.status === 200){
					//entry was deleted successfully
					$state.reload();
				}
			})
		}
		function deletePlayerEntries(userId) {
			return api.request('/entries/remove/user/'+userId,{},'DEL')
			.then(function(res){
				if(res.status === 200){
					$state.reload();
				}
			})
		}
		function deletePlayerEntriesTeam(teamId) {
			return api.request('/entries/remove/team/'+teamId,{},'DEL')
			.then(function(res){
				if(res.status === 200){
					$state.reload();
				}
			})
		}
		function editProfile(profile,userId) {
			return api.request('/auth/update/'+userId,profile,'PUT')
			.then(function(res){
				if (res.status === 200){
		    	ngToast.create({
						className: 'warning',
  						content: '<div class="ngtoast_profile">You have successfully edited your profile!</div>'
				})
				}
			})
		}
	}
})();