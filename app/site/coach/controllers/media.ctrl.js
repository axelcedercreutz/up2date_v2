(function(){
	'use strict';

	angular
		.module('up2date')
		.controller('MediaCtrl',MediaCtrl);

	function MediaCtrl($state,mediaSrv,$stateParams,media){
		var mediaVm = this;
	 	mediaVm.media = media;

		//functions
		mediaVm.addVideo = addVideo;
		mediaVm.deleteVideo = deleteVideo;
		mediaVm.goToVideo = goToVideo;

		if(media !== undefined){
			if(mediaVm.media.length > 0){
					mediaVm.is_media = true;
			}
		}

		function addVideo() {
			var newVideo = {
				youtube_id: mediaVm.youtube_id,
				title: mediaVm.title,
				team_id: parseInt($stateParams.teamId),
				user_id: (parseInt($stateParams.userId)|| parseInt($stateParams.coachId))
			}
			mediaSrv.addVideo(newVideo)
		}

		function deleteVideo(video) {
			var id = video.id
			console.log(id)
			mediaSrv.deleteVideo(id);
		}
		function goToVideo(video) {
			var id = video.id;
			if($stateParams.coachId !== undefined) {
			$state.go('coach.one_video',{videoId:id, coachId:$stateParams.coachId, teamId: $stateParams.teamId})
			}
			else if ($stateParams.userId !== undefined) {
			$state.go('player.one_video',{videoId:id, userId:$stateParams.userId, teamId: $stateParams.teamId})
			}
		}
	}
})();