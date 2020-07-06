
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
    
    res.redirect('/'+req.session.username+'/settings');
}
module.exports.change=async function main(req,res,client)
{
    try{
        var result=await client.db('profile').collection('user').updateOne()
    }
    catch (e) {
        console.log('error connecting to db');
        console.error(e);
    }
    
    //res.redirect('/'+req.session.username+'/settings');
}