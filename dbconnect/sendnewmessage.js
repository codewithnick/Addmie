module.exports=async function main(username,req,res,client,friendname){
    try {
       
        
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);
        res.redirect('/'+username+'/profile');
    }
    console.log('SECRET',req.query.secret)
    if(req.query.secret!= 'True') {
        req.query.secret='null'
    }
   
    res.render('newmessagebox.ejs',{friend:friendname,username:username,secret:req.query.secret});
    
}