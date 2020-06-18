module.exports=async function main(username,req,res,client,friendname){
    try {
       
        
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);
        res.redirect('/'+username+'/profile');
    } 
    res.render('newmessagebox.ejs');
}