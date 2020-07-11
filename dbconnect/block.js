module.exports.blockuser=async function main(req,res,client){
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
            
        
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);
    } 
    res.end('blocked')
}


module.exports.unblockuser=async function main(req,res,client){
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