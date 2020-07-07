module.exports=async function main(req,res,client){
    
   var mongodb=require('mongodb')
    try {
        var result=await client.db('profile').collection('post').findOne({_id:mongodb.ObjectId(req.query.id)})
        //console.log(result)
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);
    } finally {
     
        res.render('post.ejs',{username:req.session.username,postobj:result})
    }

    
    
}