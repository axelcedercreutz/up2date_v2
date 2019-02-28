var models 	= require('./../models');
var router 	= require('express').Router();

//arrays
var team = [];

//get all teams
router.get('/',function(req,res) {
	models.Teams.findAll()
	.then(function(teams){
		res.json({teams:teams})
	});
});
//get teams for one coach
router.get('/:coachId',function(req,res) {
	console.log('Getting Teams with ID: '+req.params.coachId);
	var where = {where:{coach_id:req.params.coachId}}
	models.Teams.findAll(where)
	.then(function(teams){
		if(typeof teams !== Array && team.length === 0) {
			team.push(teams)
			res.json({teams:teams})
		} else {
		res.json({teams:teams})
		}
	});
});
//get one team
router.get('/team/:teamId',function(req,res) {
	console.log('Getting Team with ID: '+req.params.teamId);
	var where = {where:{id:req.params.teamId}}
	models.Teams.find(where)
	.then(function(teams){
		console.log(teams)
		res.json({teams:teams})
	});
});
//add team
router.post('/create',function(req,res){
	console.log('Creation Endpoint');
	var __team = req.body;
	console.log(__team)
	models.Teams.create(__team)
	.then(function(__team){
		res.json({
			teams: __team
		});
	});
});
//delete team 
router.delete('/remove/:teamId',function(req,res){
	var where = {where:{id:req.params.teamId}}
	models.Teams.find(where)
	.then(function(team){
		console.log(team)
		team.destroy();
		res.json({
			deleted:true
		});	
	});
});

module.exports = router;