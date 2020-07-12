module.exports=async function main(username,res,client){
    
   
    try {
        var names=[]
        names.push(username)
        
        
        //not my posts
        //no posts from people who HAVE blocked me
        var blockedby=await client.db('profile').collection('user').findOne({username:username});
        for (let i = 0; i < blockedby.blockedby.length; i++) {
            const element =blockedby.blockedby[i];
            names.push(element)
        }

        //no posts from people who HAVE been blocked by me
        for (let i = 0; i <blockedby.blocks.length; i++) {
            const element =blockedby.blocks[i];
            names.push(element)
        }
        
        
        //console.log(names)
        
        
        var result =await client.db('profile').collection('post').find(
                {
                    username:{$nin:names}
                }
                        
            )
        .limit(15)
        .toArray();
        //console.log(result)
    
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);
    } finally {
     
        res.render('home.ejs',{username:username,postobj:result})
    }

    
    
}