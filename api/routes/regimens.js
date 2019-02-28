var models 	= require('./../models');
var router 	= require('express').Router();

//get all regimens
router.get('/',function(req,res) {
	models.Regimens.findAll()
	.then(function(regimens){
		res.json({regimens:regimens})
	});
});
//get all regimens for one team
router.get('/teams/:teamId',function(req,res) {
	var where = {where:{team_id:req.params.teamId}}
	console.log(where)
	models.Regimens.findAll(where)
	.then(function(regimens){
		res.json({regimens:regimens})
	});
});
//get one regimen
router.get('/:regimenId',function(req,res) {
	console.log('Getting Regimen with ID: '+req.params.regimenId);
	var where = {where:{id:req.params.regimenId}}
	models.Regimens.find(where)
	.then(function(regimens){
		res.json({regimens:regimens})
	});
});
//add regimen
router.post('/create',function(req,res){
	console.log('Creation Endpoint');
	var __regimen = req.body;
	console.log(__regimen.coach_id)
	models.Regimens.create(__regimen)
	.then(function(__regimen){
		res.json({
			regimens: __regimen
		});
	});
});
//update regimen
router.put('/:regimenId',function(req,res){
	var where = {where:{id:req.params.regimenId}};
	var __regimen = req.body
	console.log(req.body.days)
	models.Regimens.find(where).then(function(regimen){
		regimen.updateAttributes({
			title: __regimen.title,
			days: __regimen.days
		})
		.then(function(){
			__regimen.id = req.params.regimenId;
			res.json({
				regimen: __regimen
			});
		})
	});
});
//delete regimen 
router.delete('/remove/:regimenId',function(req,res){
	var where = {where:{id:req.params.regimenId}}
	models.Regimens.find(where)
	.then(function(regimen){
		regimen.destroy();
		res.json({
			deleted:true
		});	
	});
});
//delete regimens for one team 
router.delete('/remove/team/:teamId',function(req,res){
	var where = {where:{team_id:req.params.teamId}}
	models.Regimens.findAll(where)
	.then(function(regimens){
		console.log(regimens);
		for (var i = 0; i < regimens.length; i++) {
			regimens[i].destroy();
		}
		res.json({
			deleted:true
		});	
	});
});
router.delete('/remove/coach/:coachId',function(req,res){
	var where = {where:{coach_id:req.params.coachId}}
	models.Regimens.findAll(where)
	.then(function(regimens){
		console.log(regimens);
		for (var i = 0; i < regimens.length; i++) {
			regimens[i].destroy();
		}
		res.json({
			deleted:true
		});	
	});
});

module.exports = router;