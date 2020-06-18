module.exports=async function main(username,convoid,res,client){
    try {
        mongodb=require('mongodb')
        
        result=await client.db('profile').collection('message').findOne({_id:mongodb.ObjectId(convoid)});
        //console.log(result)
        
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);
        res.redirect('/'+username+'/profile');
    } 
    
    res.render('existingconvo.ejs',{result:result,username:username});
}