let path=require('path');
let fs=require('fs');
let bodyparserencoder=require('body-parser');
//preparing multer for file uploads
const multer=require('multer');
var storage=multer.diskStorage(
    {
        destination:function(req,file,cb){
            cb(null,'addmie/dp');
        },
        filename:function(req,file,cb){
            cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname));
        },
    },
    console.log('disk')
);
var upload =multer({storage:storage});
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

    //request handling fro post view
    app.get('/post',loginauth,function(req,res){//#block applied
        console.log(req.query.id);
        var query=require('../dbconnect/loadpost');
        query(req,res,client);

    });
    ///request handling for search query///
    app.get('/search',function(req,res){
        let query=require('../dbconnect/search.js')
        query(req,res,client);
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
    app.get('/profile/:username',loginauth,function(req,res){//#block applied
        if(req.session.username==req.params.username){
            console.log('oops wrong url')
            res.redirect('/'+req.session.username+'/profile')
        }
        else{
            console.log('get request for profile');
           
            let fetch=require('../dbconnect/loadprofile.js');
            
            fetch(req,res,client);
            
        }
        
    });
    

    //request handling when user posts
    app.post('/:username/sendpost',upload.single('newimage'),bodyparserencoder,loginauth,restrictionauth,function(req,res){
        console.log('post has been recived');
        var img =fs.readFileSync(req.file.path)
        var encode_img=img.toString('base64');
        //make a new image object
        var finalimg={
            contentType:req.file.mimetype,
            path:req.file.path,
            image:new Buffer.from(encode_img,'base64')
        };
        //console.log(finalimg)
        var query=require('../dbconnect/insertpost');
        query(req,finalimg,client);
        res.redirect('/'+req.session.username+'/profile');
    });
    //request handling when user updates profile picture
    app.post('/:username/updatedp',upload.single('newimage'),bodyparserencoder,loginauth,restrictionauth,function(req,res){
        console.log('dp has been recived');
        var img =fs.readFileSync(req.file.path)
        var encode_img=img.toString('base64');
        //make a new image object
        var finalimg={
            contentType:req.file.mimetype,
            path:req.file.path,
            image:new Buffer.from(encode_img,'base64')
        };
        //console.log(finalimg)
        var query=require('../dbconnect/updatedp');
        query(req,finalimg,client);
        res.redirect('/'+req.session.username+'/settings');
    });
    /////////////////////////////////////////home section\feed section////////////////////////////////
    app.get('/:username/home',loginauth,restrictionauth,function(req,res){//#block applied
        console.log('request for home feed');
        let query =require('../dbconnect/homepage.js');
        query(req.session.username,res,client);
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



     app.get('/:username/direct/new/:friendname',loginauth,restrictionauth,function(req,res){//#block applied
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
        query(req,client);
        res.end('success');
     });
                            /////////////////// removing a new friend ////////////////////////////
     app.get('/ajax/removefriend',loginauth,function(req,res){
        //console.log(req.query)
        //console.log(req.url)
        let query=require('../dbconnect/removefriend.js');
        query(req,client);
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
                            //////////////////////// commenting on a post //////////////
    app.post('/ajax/newcomment',bodyparserencoder,loginauth,function(req,res){
        let query=require('../dbconnect/comment.js');
        console.log(req.body)
        query(req,res,client);        
        });
         ////////////////////////liking a post//////////////////
     app.post('/ajax/save',bodyparserencoder,loginauth,function(req,res){
        let query=require('../dbconnect/savepost.js');        
        query(req,res,client);        
     });
                            //////////////////////// removing a post //////////////
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
    


                /////////////////////////////////// BLOCKS //////////////////////////////
                        //////////////////////// blocking user ///////////////////
                
    app.post('/ajax/blockuser',bodyparserencoder,loginauth,function(req,res){
        let query=require('../dbconnect/block.js');
        query.blockuser(req,res,client);
        //console.log(req.body)
        });
    app.post('/ajax/unblockuser',bodyparserencoder,loginauth,function(req,res){
        let query=require('../dbconnect/block.js');
        query.unblockuser(req,res,client);
        //console.log(req.body)
        });
    app.post('/ajax/blockthispostuser',bodyparserencoder,loginauth,function(req,res){
        let query=require('../dbconnect/block.js');
        query.blockthispostuser(req,res,client);
        //console.log(req.body)
        });
   
    app.get('/report',function(req,res){
        res.send('this feature is not yet updated')
    });
    console.log('closing connection to db');
    client.close();

}
