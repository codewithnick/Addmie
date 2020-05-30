let result=null;
module.exports=async function main(username,res,client){
    
    
    try {
        result =await client.db('profile').collection('user').find({}).toArray();        
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);
    } finally {
        for (let i = 0; i < result.length; i++) {
            const element = result[i];
            if(element.username===username){               
                result.splice(i,1);
                break;
            }
        }
        //await client.close();       
        res.render('explorefriends.ejs',{userobj:result,username:username});
    }
    
}