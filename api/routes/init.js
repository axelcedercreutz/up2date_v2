var models = require('../models');
var express = require('express');
var bcrypt	= require('bcrypt');
var router = express.Router();

router.get('/',function(req,res){
	//check if coach user exists
	var where = {where:{email:'coach@steelers.fi'}};
	models.Users.findAll(where).then(function(users){
		if('0' in users){
			res.send('Coach Account Already Exists');
		}
		else{
			//admin user obj
			var coach_obj = {
				email:'coach@steelers.fi',
				password:'steelers',
				user_role: 2,
				team_id: 0
			}
			//add to database model and respond with object
			bcrypt.genSalt(10, function(err, salt) {
	    		bcrypt.hash(coach_obj.password, salt, function(err, hash) {
	        		// Store hash in your password DB.
	        		if(!err){
	        			coach_obj.password = hash;
		        		models.Users.create(coach_obj)
			        	.then(function(user){
			        		//remove password from response
				        	coach_obj.password ='';
				        	res.json({user:coach_obj,msg:'<h1>Coach Account Created</h1><p>Log In:coach@steelers.fi<br>Password:steelers</p>'});
			       		})
	        		}
	    		});
			});
			res.send('<h1>Coach Account Created</h1><p>Email: coach@steelers.fi<br>Password: steelers</p>');
		}
		
	});

});

module.exports = router;