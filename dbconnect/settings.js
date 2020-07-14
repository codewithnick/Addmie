
module.exports.load=async function main(req,res,client)
{
    try{
        var result=await client.db('profile').collection('user').findOne({username:req.session.username})
    }
    catch (e) {
        console.log('error connecting to db');
        console.error(e);
    }
    
    res.render('settings.ejs',{settingsobj:result});
}
module.exports.update=async function main(req,res,client)
{
    try{
        var result=await client.db('profile').collection('user').updateOne({username:req.session.username},{$set:req.body})
    }
    catch (e) {
        console.log('error connecting to db');
        console.error(e);
    }
    
    res.redirect('/'+req.session.username+'/settings')
}
module.exports.change=async function main(req,res,client)
{
    try{
        ///converting from string to bool
        if(req.body.secret=='true'){
            var secret =true;
        }
        else{
            var secret=false
        }
        if(req.body.dates=='true'){
            var dates =true;
        }
        else{
            var dates=false
        }
        if(req.body.notifications=='true'){
            var notifications =true;
        }
        else{
            var notifications=false
        }
        var settingsobj={
            secret:secret,
            dates:dates,
            notifications:notifications
        }
        var result=await client.db('profile').collection('user').updateOne({username:req.session.username},{$set:settingsobj})
    }
    catch (e) {
        console.log('error connecting to db');
        console.error(e);
    }
    
    res.end('changed settings')
}
module.exports.changepassword=async function main(req,res,client)
{
    try{
var result=await client.db('profile').collection('pass').findOne({username:req.session.username,password:req.body.oldpassword});
if(result){
    result=await client.db('profile').collection('pass').updateOne({username:req.session.username},{$set:{password:req.body.newpassword}});
    
    res.redirect('/logout')
}
else{
    res.send('wrong password')
}
    }
    catch (e) {
    
        console.log('error connecting to db');
        console.error(e);
    }
    
   
}