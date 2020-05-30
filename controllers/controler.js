let path=require('path');
let bodyparserencoder=require('body-parser');
//connecting to db client 
let dbconnect=require('../dbconnect/connect');
const MongoClient=dbconnect.MongoClient;
const uri=dbconnect.uri;
const client=dbconnect.client;
dbconnect.main(client);
//adding session authentication
const loginauth=(req,res,next)=>{
    if(req.session.loggedIn){
        next();
        }
    else{
            res.redirect('/');
            console.log('looks like youve been logged out of the session login to continue');
        }
};
bodyparserencoder = bodyparserencoder.urlencoded({ extended: false })
module.exports=function(app){
    app.get('/',function(req,res){
        req.session.loggedIn=true;
        res.render('Addmie.ejs');
    });
    //request handling when login is requested
    app.post('/login',bodyparserencoder,function(req,res){
            console.log('login requested');
            let query=require('../'+'dbconnect/'+'login.js');
            let exists=query.login({username:req.body.User,password:req.body.Pass},res,req,client);
            //console.log('everything done, exists= ' + exists);
            req.session.loggedIn=true;
            //console.log(req.session);
    });
    //request handling when signup is requested
    app.post('/signup',bodyparserencoder,function(req,res){
        console.log('signup requested');
        //if validated sucessfully then fire insert query in database
        let query=require('../'+'dbconnect/'+'newsignin.js');
        //console.log(req.body);
        query(req.body.Username,req.body.Password,req.body.Fname,req.body.Lname,req.body.DOB,req.body.Email,client);
        //window.alert('signed up successfully ,now you can login');
        //now logging in
        query=require('../'+'dbconnect/'+'login.js');
        exists=query.login({username:req.body.Username,password:req.body.Password},res,req);
        
        //move to profile page directly
    });
    /////////////////////////////////////////////// session pages ////////////////////////////////////////  
    //request handling when logout is requested
    app.get('/logout',function(req,res){
        //console.log(req.session);
        if(req.session.loggedIn){
        req.session.destroy();       
        }
        else{
            //console.log('login to continue');
        }
        res.redirect('/');
        
    });
    //request handling when user posts
    app.post('/:username/sendpost',bodyparserencoder,loginauth,function(req,res){
        console.log('post has been recived');
        var query=require('../dbconnect/insertpost');
        query(req,client);
        res.redirect('/'+req.params.username+'/profile');
    });
    app.get('/:username/profile',loginauth,function(req,res){
        console.log('get request to profile');
        var userobj={
            username:req.params.username,
        };
        let fetch=require('../dbconnect/fetch.js');
        const fname=null;
        fetch(req.params.username,res,client);
        console.log('profile loaded');

    });
    //////////////////////////////explore section/////////////////////////
    app.get('/:username/explore/friends',loginauth,function(req,res){
       res.render('profile.ejs');
    });
    app.get('/:username/explore/posts',loginauth,function(req,res){
        res.render('profile.ejs');
     });
     /////////////////////////////// messages ////////////////////////////////
     app.get('/:username/messages',loginauth,function(req,res){
        res.render('profile.ejs');
     });
    ///////////////////////////////////// settings ///////////////////////////
    app.get('/:username/explore/friends',loginauth,function(req,res){
        res.render('profile.ejs');
     });
      
    console.log('closing connection to db');
    client.close();
}
