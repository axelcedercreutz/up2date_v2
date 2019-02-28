var models 	= require('./../models');
var router 	= require('express').Router();

//get all users
router.get('/',function(req,res){
	models.Users.findAll()
	.then(function(users){
		console.log(users)
		res.json({users:users});
	})
})
//get one teams coaches
router.get('/coaches/:teamId',function(req,res){
	console.log(req.params.teamId)
	var where = {where:{team_id:req.params.teamId,user_role:0}}
	console.log(where)
	models.Users.findAll(where).then(function(users){
		res.json({users:users});
	})
})
// get all players
router.get('/players',function(req,res){
	var where = {where:{user_role:1}}
	models.Users.findAll(where).then(function(users){
		res.json({users:users});
	})
})
// get all players for team
router.get('/players/:teamId',function(req,res){
	var where = {where:{team_id:req.params.teamId, user_role:1}}
	models.Users.findAll(where).then(function(users){
		res.json({users:users});
	})
})
// get one player
router.get('/:userId',function(req,res){
	console.log('Getting user with ID: '+req.params.userId);
	var where = {where:{id:req.params.userId}}
	models.Users.findAll(where).then(function(users){
		res.json({users:users});
	})
})

//delete user
router.delete('/remove/:userId',function(req,res){
	var where = {where:{id:req.params.userId}}

	models.Users.find(where).then(function(user){
		user.destroy();
		res.json({
			deleted:true
		});	
	});
});
//delete players on one team
router.delete('/remove/team/:teamId',function(req,res){
	var where = {where:{team_id:req.params.teamId,user_role:1}}
	models.Users.findAll(where).then(function(users){
		console.log(users)
		for (var i = 0; i < users.length; i++) {
			users[i].destroy();
		}
		res.json({
			deleted:true
		});	
	});
});
//update player profile
router.put('/update/:userId',function(req,res){
	console.log('Getting user with ID: '+req.params.userId)
	var where = {where:{id:req.params.userId}}
	var __user = req.body
	models.Users.find(where).then(function(user){
		user.updateAttributes({
			first_name: __user.first_name,
			last_name: __user.last_name,
			email: __user.email,
			number: __user.number
		})
		.then(function(){
			__user.id = req.params.userId
			res.json({
				regimen: __user
		})
	})
})
})
module.exports = router;