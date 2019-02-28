var express = require('express');
var models  = require('./models');
var bodyParser = require("body-parser");
var app = express();
app.set('port', (process.env.PORT || 3000));

var pg = require('pg');

//app config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + './../app/'));

//middleware
var authentication = require("./middleware/auth");

//route configuration
var auth_routes = require('./routes/auth');
var init = require('./routes/init');
var user_routes = require('./routes/users');
var regimen_routes = require('./routes/regimens');
var entry_routes = require('./routes/entries');
var teams_routes = require('./routes/teams');
var media_routes = require('./routes/media');

//set Routes
app.use('/api/auth',auth_routes);
app.use('/api/init',init);
app.use('/api/users',authentication,user_routes);
app.use('/api/regimens',authentication,regimen_routes);
app.use('/api/entries',authentication,entry_routes);
app.use('/api/teams',teams_routes);
app.use('/api/media',authentication,media_routes);


//start server
models.sequelize.sync().then(function(){
      app.listen(app.get('port'),function(){
            console.log('Listening on ', app.get('port'));
            console.log('Stop Server With CTRL + C');
      });
});