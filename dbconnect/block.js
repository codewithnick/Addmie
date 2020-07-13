var mongodb=require('mongodb')
module.exports.blockuser=async function blockuser(req,res,client){
    try {        
        //first add to blockedby array and blocks array ///
        var result=await client.db('profile').collection('user').updateOne({username:req.body.blockthisuserid},
            {$addToSet:{blockedby:req.session.username}});
        result=await client.db('profile').collection('user').updateOne({username:req.session.username},
            {$addToSet:{blocks:req.body.blockthisuserid}});
        //second remove fan //
       result=await client.db('profile').collection('user').updateOne({username:req.session.username},
            {$pull:{friends:req.body.blockthisuserid}});
        //third remove following//
        result=await client.db('profile').collection('user').updateOne({username:req.body.blockthisuserid},
            {$pull:{friends:req.session.username}});
        //remove my saved posts
        console.log(req.body)
        
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);
    } 
    res.end('blocked')
}



module.exports.blockthispostuser=async function main(req,res,client){
    try {        

        var result=await client.db('profile').collection('post').findOne({_id:mongodb.ObjectId(req.body.blockthispostuserid)})
        
       req.body.blockthisuserid=result.username
       
        this.blockuser(req,res,client)
        console.log('blocked post user')
        
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);
    } 
    
}


module.exports.unblockuser=async function unblock(req,res,client){
    try {        
        //first remove from blockedby array and blocks array ///
        var result=await client.db('profile').collection('user').updateOne({username:req.body.unblockthisuserid},
            {$pull:{blockedby:req.session.username}});
            
        result=await client.db('profile').collection('user').updateOne({username:req.session.username},
            {$pull:{blocks:req.body.unblockthisuserid}});
        //remove my saved posts
            
        
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);
    } 
    res.end('blocked')
    
}