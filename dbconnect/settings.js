
module.exports=async function main(req,res){
    
    var settingsobj={
        username:req.session.username
    }
    
    res.render('settings.ejs',{settingsobj:settingsobj});
}