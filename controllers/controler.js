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
            req.session.loggedIn=true;
            req.session.username=req.body.User;
    });
    //request handling when signup is requested
    app.post('/signup',bodyparserencoder,function(req,res){
        console.log('signup requested');
        //if validated sucessfully then fire insert query in database
        let query=require('../'+'dbconnect/'+'newsignin.js');
        query(req.body.Username,req.body.Password,req.body.Fname,req.body.Lname,req.body.DOB,req.body.Email,client);
        query=require('../'+'dbconnect/'+'login.js');
        exists=query.login({username:req.body.Username,password:req.body.Password},res,req);       
        //move to profile page directly
    });
    //////////own account login///////////
    app.get('/:username/profile',loginauth,function(req,res){
        if(req.params.username==req.session.username){
            console.log('get request to profile');
            var userobj={
                username:req.params.username,
            };
            let fetch=require('../dbconnect/fetch.js');
            const fname=null;
            fetch(req.params.username,res,client);
            console.log('profile loaded');
        }
        else{
            console.log('restricted')
            res.redirect('/'+req.session.username+'/profile')
        }
    });
    ////////to view others account///////////
    app.get('/profile/:username',loginauth,function(req,res){
        
        console.log('get request to profile');
        var userobj={
            username:req.params.username,
        };
        let fetch=require('../dbconnect/loadprofile.js');
        const fname=null;
        fetch(req.params.username,res,client);
        console.log('profile loaded');
    
        
    });
    /////////////////////////////////////////////// session pages ////////////////////////////////////////  
    //request handling when logout is requested
    app.get('/logout',loginauth,function(req,res){
        //console.log(req.session);
        if(req.session.loggedIn){
        req.session.destroy();       
        }
        else{
            console.log('login to continue');
        }
        res.redirect('/');
        
    });
    //request handling when user posts
    app.post('/:username/sendpost',bodyparserencoder,loginauth,function(req,res){
        console.log('post has been recived');
        var query=require('../dbconnect/insertpost');
        query(req,client);
        res.redirect('/'+req.session.username+'/profile');
    });
    app.get('/:username/home',loginauth,function(req,res){
        console.log('request for home feed');
        res.send('<h1>this feature is yet to be updated</h1>')
    });
    //////////////////////////////explore section/////////////////////////
    app.get('/:username/explore/friends',loginauth,function(req,res){
        console.log('loading some friends to be added');
        let query =require('../dbconnect/findfriends.js');
        query(req.session.username,res,client);
       console.log('found friends');
    });
    app.get('/:username/explore/posts',loginauth,function(req,res){
        console.log('finding some posts to be liked');
        let query =require('../dbconnect/findposts.js');
        query(req.session.username,res,client);
       console.log('found posts');
     });
     /////////////////////////////// messages ////////////////////////////////
     app.get('/:username/messages',loginauth,function(req,res){
        res.send('<h1>this feature is yet to be updated</h1>');
     });
    ///////////////////////////////////// settings ///////////////////////////
    app.get('/:username/settings',loginauth,function(req,res){
        res.send('<h1>this feature is yet to be updated</h1>');
     });
     ////////////////////////////////////////// background authenticated ajax requests ///////////////////////
     app.get('/ajax/addfriend',loginauth,function(req,res){
        console.log(req.query)
        console.log(req.url)
        let query=require('../dbconnect/addfriend.js');
        query(req.session.username,req.query.text,client)
     });
    
    console.log('closing connection to db');
    client.close();

}
