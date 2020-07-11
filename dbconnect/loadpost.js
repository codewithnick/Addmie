module.exports=async function main(req,res,client){
    
   var mongodb=require('mongodb')
    try {
        var post=await client.db('profile').collection('post').findOne({_id:mongodb.ObjectId(req.query.id)});
        var comments=await client.db('profile').collection('comment').find({postid:req.query.id}).toArray();        
        var names=[]
        
        
        //not my posts
        //no posts from people who HAVE blocked me
        var blockedby=await client.db('profile').collection('user').findOne({username:req.session.username});
        for (let i = 0; i < blockedby.blockedby.length; i++) {
            const element =blockedby.blockedby[i];
            names.push(element)
        }
        for (let i = 0; i <blockedby.blocks.length; i++) {
            const element =blockedby.blocks[i];
            names.push(element)
        }
        var blockedaccount=await client.db('profile').collection('user').findOne({username:post.username});
        
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);
    } finally {
        if (names.includes(post.username)){
            res.render('blockedaccount.ejs',{username:req.session.username,userobj:blockedaccount})
        }
        else{
            res.render('post.ejs',{username:req.session.username,postobj:post,comments:comments})
        }
        
    }

    
    
}