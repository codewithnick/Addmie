var express=require('express');
//adding session
var session=require('express-session');
var path=require('path');
var cookieParser = require('cookie-parser');
var port=process.env.port || 4000;
//to check db connection disabled for now due to interruptions
/* var connectdb=require(path.join(__dirname+'../../..'+'/dbconnect/connect.js'));
connectdb(); */
var controler=require('./controllers/controler');
console .log('server started');
var app = express();
app.use(cookieParser());
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'nikhilsingh',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge:36000000,
    httpOnly:false
  }
}))
//controlling the routhin using controller in controller directory
controler(app);
//set the view engine as ejs
app.set('view engine','ejs');
//adding css and images using static path in express
app.use(express.static(path.join(__dirname)));
app.use('/:username',express.static(path.join(__dirname)));
//request handling when root dir is requested
//listening at port
console.log('listening at port '+port) ;
app.listen(port);