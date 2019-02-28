var models 	= require('./../models');
var router 	= require('express').Router();

//get all entries
router.get('/',function(req,res) {
	models.Entries.findAll()
	.then(function(entries){
		res.json({entries:entries})
	});
});

//get all entries for a team
router.get('/teams/:teamId',function(req,res) {
	console.log('Getting entries with Team-ID: '+req.params.teamId);
	var where = {where:{team_id:req.params.teamId}}
	models.Entries.findAll(where)
	.then(function(entries){
		res.json({entries:entries})
	});
});

//get all entries from user
router.get('/user/:userId',function(req,res) {
	console.log('Getting entries with ID: '+req.params.userId);
	var where = {where:{user_id:req.params.userId}}
	models.Entries.findAll(where)
	.then(function(entries){
		res.json({entries:entries})
	});
});

//get one entry
router.get('/:entryId',function(req,res) {
	console.log('Getting entry with ID: '+req.params.entryId);
	var where = {where:{id:req.params.entryId}}
	models.Entries.find(where)
	.then(function(entries){
		res.json({entries:entries})
	});
});

//create entry
router.post('/create',function(req,res){
	console.log('Creation Endpoint');
	var __entry = req.body;
	models.Entries.create(__entry)
	.then(function(__entry){
		res.json({
			entries: __entry
		});
	});
});

//edit entry
router.put('/:entryId',function(req,res){
	var where = {where:{id:req.params.entryId}};
	var __entry = req.body
	models.Entries.find(where).then(function(entry){
		entry.updateAttributes({
			time: __entry.time,
			type: __entry.type,
			heavy: __entry.heavy,
			comment: __entry.comment
		})
		.then(function(){
			__entry.id = req.params.entryId;
			res.json({
				entry: __entry
			});
		})
	});
});

//delete entry
router.delete('/remove/:entryId',function(req,res){
	var where = {where:{id:req.params.entryId}}
	models.Entries.find(where).then(function(entry){
		entry.destroy();
		res.json({
			deleted:true
		});	
	});
});

//delete one players all entries
router.delete('/remove/user/:userId',function(req,res){
	var where = {where:{user_id:req.params.userId}}
	console.log(where)
	 models.Entries.findAll(where).then(function(entries){
	 	console.log(entries)
	 	for (var i = 0; i < entries.length; i++) {
	 		entries[i].destroy();
	 	}
		res.json({
			deleted:true
		});	
	});
});

//delete all entries for one team
router.delete('/remove/team/:teamId',function(req,res){
	var where = {where:{team_id:req.params.teamId}}
	console.log(where)
	 models.Entries.findAll(where).then(function(entries){
	 	console.log(entries)
	 	for (var i = 0; i < entries.length; i++) {
	 		entries[i].destroy();
	 	}
		res.json({
			deleted:true
		});	
	});
});

module.exports = router;