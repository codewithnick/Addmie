let path=require('path');
let bodyparserencoder=require('body-parser');
//adding session

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
            let exists=query.login({username:req.body.Username,password:req.body.Password},res,req);
            //console.log('everything done, exists= ' + exists);
            req.session.loggedIn=true;
            console.log(req.session);
    });
    //request handling when signup is requested
    app.post('/signup',bodyparserencoder,function(req,res){
        console.log('signup requested');
        //if validated sucessfully then fire insert query in database
        let query=require('../'+'dbconnect/'+'newsignin.js');
        //console.log(req.body);
        query(req.body.Username,req.body.Password,req.body.Fname,req.body.Lname,req.body.DOB,req.body.Email);
        //window.alert('signed up successfully ,now you can login');
        //now logging in
        query=require('../'+'dbconnect/'+'login.js');
        exists=query.login({username:req.body.Username,password:req.body.Password},res,req);
        
        //move to profile page directly
    });
    /////////////////////////////////////////////// session pages ////////////////////////////////////////  
    //request handling when logout is requested
    app.get('/logout',function(req,res){
        console.log(req.session);
        if(req.session.loggedIn){
        console.log('logout requested');
        res.render('Addmie.ejs');}
        else{
            console.log('login to continue');
        }
    });
    //request handling when user posts
    app.post('/sendpost/:username',bodyparserencoder,function(req,res){
        console.log('post has been recived');
        var query=require('../dbconnect/insertpost');
        query(req);
        res.redirect('/profile/'+req.params.username);
    });
    app.get('/profile/:username',function(req,res){
        console.log('get request to profile');
        var userobj={
            username:req.params.username,
        };
        let fetch=require('../dbconnect/fetch.js');
        const fname=null;
        fetch(req.params.username,res);
        console.log('profile loaded');

    });
}
