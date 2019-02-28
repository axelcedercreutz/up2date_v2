var models 	= require('./../models');
var router 	= require('express').Router();

//get all media
router.get('/',function(req,res) {
	models.Media.findAll()
	.then(function(media){
		res.json({media:media})
	});
});
//get all media for one team
router.get('/teams/:teamId',function(req,res) {
	var where = {where:{team_id:req.params.teamId}}
	console.log(where)
	models.Media.findAll(where)
	.then(function(media){
		res.json({media:media})
	});
});
//get one video
router.get('/:videoId',function(req,res) {
	console.log('Getting video with ID: '+req.params.videoId);
	var where = {where:{id:req.params.videoId}}
	models.Media.find(where)
	.then(function(media){
		res.json({media:media})
	});
});
//add video
router.post('/create',function(req,res){
	console.log('Creation Endpoint');
	var __video = req.body;
	console.log(__video)
	models.Media.create(__video)
	.then(function(__video){
		res.json({
			media: __video
		});
	});
});
//delete video 
router.delete('/remove/:videoId',function(req,res){
	var where = {where:{id:req.params.videoId}}
	models.Media.find(where)
	.then(function(video){
		video.destroy();
		res.json({
			deleted:true
		});	
	});
});
//delete one players all media
router.delete('/remove/user/:userId',function(req,res){
	var where = {where:{user_id:req.params.userId}}
	console.log(where)
	 models.Media.findAll(where).then(function(media){
	 	console.log(media)
	 	for (var i = 0; i < media.length; i++) {
	 		media[i].destroy();
	 	}
		res.json({
			deleted:true
		});	
	});
});
//delete media for one team 
router.delete('/remove/team/:teamId',function(req,res){
	var where = {where:{team_id:req.params.teamId}}
	models.Media.findAll(where)
	.then(function(media){
		console.log(media);
		for (var i = 0; i < media.length; i++) {
			media[i].destroy();
		}
		res.json({
			deleted:true
		});	
	});
});
module.exports = router;