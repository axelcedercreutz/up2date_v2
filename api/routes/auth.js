var models 	= require('./../models');
var bcrypt	= require('bcrypt');
var jwt		= require('jsonwebtoken');
var router 	= require('express').Router();
 
// Give SES the details and let it construct the message for you. 



//register a new user
router.post('/register',function(req,res){
	console.log('Registration Endpoint');
	var __user = req.body;
	if (__user.password !== undefined) {
		bcrypt.genSalt(10, function(err, salt) {
		    bcrypt.hash(__user.password, salt, function(err, hash) {
		        // Store hash in your password DB.
		        if(!err){
		        	__user.password = hash;
			        	models.Users.create(__user)
			        	.then(function(user){
			        	//remove password from response
			        	user.password ='';
			        	res.json({user:user,msg:'Account Created'});
			        })

		        }
		    });
		});
	} else {
		models.Users.create(__user)
		.then(function(user){
			//remove password from response
			user.password ='';
			res.json({user:user,msg:'Account Created'});
			console.log('success');
			console.log(user.email);
			client.sendEmail({
			   to: user.email,
			   from: 'up2date.cedercreutz@gmail.com',
			   subject: 'You\'ve been invited to join up2date!',
			   message: 'Your coach has called - it\'s time to sign-up for up2date! Go to the <a href="http://54.187.192.62/">up2date Homepage</a> and sign-up as a player! - train together learn together win together',
			   altText: 'plain text'
			}, function (err, data, res) {
			 console.log(err);
			 console.log(data);
			 console.log(res);
			});
		})
	}
});

//update user

router.put('/update/:userId',function(req,res){
	var where = {where:{id:req.params.userId}}
	var user = req.body;
	if (user.password !== undefined) {
		bcrypt.genSalt(10, function(err, salt) {
		    bcrypt.hash(user.password, salt, function(err, hash) {
		        // Store hash in your password DB.
		        if(!err){
		        	user.password = hash;
			        models.Users.find(where)
			        .then(function(users){
			        	users.updateAttributes({
	      					first_name: user.first_name,
							last_name: user.last_name,
							password: user.password,
							team_id: user.team_id,
							number: user.number
					    });
					    users.id = req.params.userId;
					    res.send({
					    	users: user
					    });
					});
			    }

		    })
		});
	} else {
		models.Users.find(where)
		.then(function(users){
			users.updateAttributes({
				team_id: user.team_id,
				first_name:user.first_name,
				last_name:user.last_name,
				number:user.number
			});
			users.id = req.params.userId;
			res.send({
				users: user
			});
		});
	};
})

//login
router.post('/authenticate',function(req,res){
	console.log('Authentication Endpoint');
	var __user = req.body;
	var where = {where:{email:__user.email}};
	models.Users.find(where)
	.then(function(user){
		console.log(user);
		if (user == null) {
			res.status(403)
		    	.json({err:'unauthorized'});
		}
		bcrypt.compare(__user.password,user.password, function(err, result) {
		    // res == true 
		    if(result==true){
		    	user.password = '';
		    	delete user.password;
		    	var user_obj = {email:user.email, user_role:user.user_role, id:user.id, team_id:user.team_id};
				var token = jwt.sign(user_obj,'brainstationkey');
				res.set('authentication',token);
		    	res.json(user_obj)
		    }
		    else{
		    	res.status(403)
		    		.json({err:'unauthhorized'});
		    }
		});
	})

})
//compare email with database
router.get('/compare/:email', function(req,res){
	var __user = req.params.email;
	var where = {where:{email:__user}}
	models.Users.find(where).then(function(users){
		res.json({users:users});
	})
})

module.exports = router;