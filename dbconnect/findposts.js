let result=null;
module.exports=async function main(username,res,client){
    
    
    try {
        result =await client.db('profile').collection('post')
        .find({username:{$nin:[username]}})
        .limit(15)
        .sort('creationdate',-1)
        .toArray();        
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);
    } finally {
 
        
        //await client.close();       
        res.render('exploreposts.ejs',{postobj:result,username:username});
    }
    
}