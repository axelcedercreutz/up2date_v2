(function(){
	'use strict';

	angular
		.module('up2date')
		.controller('OneVideoCtrl',OneVideoCtrl);

	function OneVideoCtrl(mediaSrv,$state,video,$stateParams){
		var onevideoVm = this;

		onevideoVm.video = video.data.media;
		console.log(onevideoVm.video)

		//functions
		onevideoVm.backToMedia = backToMedia;
		onevideoVm.deleteVideo = deleteVideo;

		function backToMedia(){
			if($stateParams.coachId !== undefined) {
			$state.go('coach.media',{coachId:$stateParams.coachId, teamId: $stateParams.teamId})
			}
			else if ($stateParams.userId !== undefined) {
			$state.go('player.media',{ userId:$stateParams.userId, teamId: $stateParams.teamId})
			}
		}
		function deleteVideo(video) {
			var id = video.id
			console.log(id);
			mediaSrv.deleteVideo(id);
		}
	}
})();