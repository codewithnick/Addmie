var result=null;
module.exports = async function dbconnect(req,image,client)
{       //console.log(req.body.text);
        //console.log(req.params.username);
        let MongoDB=require('mongodb')
        
        //console.log(id);
        
        
       try {
       
        result=await client.db('profile').collection('user').updateOne({username:req.session.username},
            {$set:{dp:image}});
       
        
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);

    } finally {
        //console.log('closing client connection');
        //await client.close();
    
    }

}
