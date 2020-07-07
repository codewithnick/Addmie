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
const restrictionauth=(req,res,next)=>{
    if(req.session.username === req.params.username){
        next();
        }
    else{
            console.log(req.session.username)
            console.log(req.params.username)
            res.redirect('/'+req.session.username+'/profile');
            console.log('this page is restricted');
        }
};

bodyparserencoder = bodyparserencoder.urlencoded({ extended: true })
module.exports=function(app){
    app.get('/',function(req,res){
        //req.session.loggedIn=true;
        res.render('Addmie.ejs');
    });
    //request handling when login is requested
    app.post('/login',bodyparserencoder,function(req,res){
            //console.log('login requested');
            let query=require('../dbconnect/login.js');
            let exists=query.login({username:req.body.User,password:req.body.Pass},res,req,client);
            req.session.loggedIn=true;
            req.session.username=req.body.User;
    });
    //request handling when signup is requested
    app.post('/signup',bodyparserencoder,function(req,res){
        //console.log('signup requested');
        //if validated sucessfully then fire insert query in database
        let query=require('../dbconnect/newsignin.js');
        query(req.body.Username,req.body.Password,req.body.Fname,req.body.Lname
            ,req.body.DOB,req.body.Email,req.body.Gender,req.body.City,client);

        query=require('../dbconnect/login.js');
        exists=query.login({username:req.body.Username,password:req.body.Password},res,req);       
        //move to profile page directly
    });
    //////////own account login///////////
    app.get('/:username/profile',loginauth,restrictionauth,function(req,res){
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
    app.post('/:username/sendpost',bodyparserencoder,loginauth,restrictionauth,function(req,res){
        console.log('post has been recived');
        var query=require('../dbconnect/insertpost');
        query(req,client);
        res.redirect('/'+req.session.username+'/profile');
    });
    /////////////////////////////////////////home section\feed section////////////////////////////////
    app.get('/:username/home',loginauth,restrictionauth,function(req,res){
        console.log('request for home feed');
        let query =require('../dbconnect/homepage.js');
        query(req.session.username,res,client);
    });
    //////////////////////////////explore section/////////////////////////
    app.get('/:username/explore/friends',loginauth,restrictionauth,function(req,res){
        console.log('loading some friends to be added');
        let query =require('../dbconnect/findfriends.js');
        query(req.session.username,res,client);
       console.log('found friends');
    });
    app.get('/:username/explore/posts',loginauth,restrictionauth,function(req,res){
        console.log('finding some posts to be liked');
        let query =require('../dbconnect/findposts.js');
        query(req.session.username,res,client);
       console.log('found posts');
     });




     
     /////////////////////////////// messages ////////////////////////////////
     app.get('/:username/direct',loginauth,restrictionauth,function(req,res){
        let query =require('../dbconnect/loadmessages.js');//correct this
        query(req.session.username,res,client);
        console.log('loading messages')
        
     });


     
     app.get('/:username/direct/inbox/:convoid',loginauth,restrictionauth,function(req,res){

        let query =require('../dbconnect/loadmessagebox.js');//correct this
        query(req.session.username,req.params.convoid,res,client);
     });



     app.get('/:username/direct/new/:friendname',loginauth,restrictionauth,function(req,res){
        let query =require('../dbconnect/sendnewmessage.js');
        //console.log(req.query.secret)
        query(req.session.username,req,res,client,req.params.friendname);
        console.log('sending neww message from '+req.session.username+' to '+req.params.friendname);
     });




    ///////////////////////////////////// settings ///////////////////////////
    app.get('/:username/settings',loginauth,restrictionauth,function(req,res){
        let query=require('../dbconnect/settings');
        query.load(req,res,client);
     });

     app.post('/:username/updatesettings',bodyparserencoder,loginauth,restrictionauth,function(req,res){
        console.log('updatingsettings');
        console.log(req.body)
        let query=require('../dbconnect/settings');
        query.update(req,res,client);
    });


     ////////////////////////////////////////// background authenticated ajax requests //////////////////////
                            /////////////////// adding a new friend ////////////////////////////
     app.get('/ajax/addfriend',loginauth,function(req,res){
        //console.log(req.query)
        //console.log(req.url)
        let query=require('../dbconnect/addfriend.js');
        query(req.session.username,req.query.text,client);
        res.end('success');
     });
                ////////////////////////////////////messages dealings///////////////////////////
                            ////////////////////////creating new conversation//////////////////
     app.post('/ajax/newmessage',bodyparserencoder,loginauth,function(req,res){
        //console.log(req)
        //console.log(req.body);    
        let query=require('../dbconnect/createnewconvo.js');
        query(req.body,res,client);
        console.log('new message id created')
     });
                            ////////////////////////append message to existing convo//////////////////
     app.post('/ajax/appendmessage',bodyparserencoder,loginauth,function(req,res){
        let query=require('../dbconnect/appendmessage.js');
        query(req.body,req.session.username,res,client);
        //console.log(req.body.convoid)
        console.log('trying to send new message')
     });
                ////////////////////////////////post dealing////////////////////////////////////
                             ////////////////////////liking a post//////////////////
     app.post('/ajax/like',bodyparserencoder,loginauth,function(req,res){
        let query=require('../dbconnect/like.js');
        query(req,res,client);
        
     });
     app.get('/ajax/removepost',loginauth,function(req,res){
        let query=require('../dbconnect/removepost.js');
        query(req,res,client);
        
     });
                ///////////////////////////// user settings /////////////////////////////////
                            //////////////////// toggle //////////////////////
    app.post('/ajax/changesettings',bodyparserencoder,loginauth,function(req,res){
        let query=require('../dbconnect/settings.js');
        query.change(req,res,client);
        //console.log(req.body)
        });
    
    console.log('closing connection to db');
    client.close();

}
