let result=null;
module.exports=async function main(username,res,client){
    
    
    try {
        result =await client.db('profile').collection('post').find({}).toArray();        
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);
    } finally {
 
        for (let i = 0; i < result.length; i++) {
            const element = result[i];
            if(element.username===username){ 
                result.splice(i,1);
                i--
            }
        }
        //await client.close();       
        res.render('exploreposts.ejs',{postobj:result,username:username});
    }
    
}