module.exports=async function main(req,res,client){
    
   var mongodb=require('mongodb')
    try {
        var posts=await client.db('profile').collection('post').findOne({_id:mongodb.ObjectId(req.query.id)});
        var comments=await client.db('profile').collection('comment').find({postid:req.query.id}).toArray();
        console.log(posts,comments)
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);
    } finally {
     
        res.render('post.ejs',{username:req.session.username,postobj:posts,comments:comments})
    }

    
    
}