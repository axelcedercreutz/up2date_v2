(function(){

	angular
		.module('up2date')
		.service('mediaSrv',MediaService);

	function MediaService($state,api,ngToast,$stateParams){
		var self = this;
		
		self.media = [];

		//functions
		self.getMedia = getMedia;
		self.getMediaTeam = getMediaTeam;
		self.getVideo = getVideo;
		self.addVideo = addVideo;
		self.deleteVideo = deleteVideo;
		self.deletePlayerMedia = deletePlayerMedia;
		self.deleteMediaTeam = deleteMediaTeam;


		function getMedia() {
			return api.request('/media',{},'GET')
				.then(function(res){
					self.media = res.data.media;
					return self.media;
				})
		}

		function getMediaTeam(teamId) {
			return api.request('/media/teams/'+teamId,{},'GET')
			.then(function(res){
				console.log(res.data.media)
				self.media = res.data.media;
				return self.media;
			})
		}

		function getVideo(videoId) {
			console.log(videoId)
			return api.request('/media/'+videoId,{},'GET')
		}

		function addVideo (video) {
			console.log(video)
			return api.request('/media/create',video,'POST')
			.then(function(res){
				if(res.status === 200){
					ngToast.create({
						className: 'warning',
  						content: '<div class="pop-up-window">You have successfully added a video!</div>'
					})
					$state.reload();
				}
			})
		}

		function deleteVideo(videoId){
			return api.request('/media/remove/'+videoId,{},'DEL')
			.then(function(res){
				if(res.status === 200){
					if($state.current.name === 'coach.media'){
						$state.reload();
					}
					else {
						console.log($stateParams)
						$state.go('coach.media',{teamId:$stateParams.teamId, coachId:$stateParams.coachId});
					}
				}
			})
		}
		function deletePlayerMedia(userId) {
			return api.request('/media/remove/user/'+userId,{},'DEL')
			.then(function(res){
				if(res.status === 200){
					$state.reload();
				}
			})
		}
		function deleteMediaTeam(teamId){
			console.log(teamId)
			return api.request('/media/remove/team/'+teamId,{},'DEL')
			.then(function(res){
				if(res.status === 200){
					$state.reload();
				}
			})
		}
	}
})();