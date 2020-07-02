module.exports=async function main(username,res,client){
    
    
    try {
 
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);
    } finally {
     
        
    }

    res.render('home.ejs',{settingsobj:{username:username}})
    
}