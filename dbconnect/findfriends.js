let result=null;
let friends=null;
module.exports=async function main(username,res,client){
    
    
    try {
        result =await client.db('profile').collection('user').find({}).toArray();
        friends =await client.db('profile').collection('user').findOne({username:username});        
        console.log(friends)
        friends=friends.friends;
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);
    } finally {
        //remove self name
        for (let i = 0; i < result.length; i++) {
            const element = result[i];
            if(element.username===username){               
                result.splice(i,1);
                break;
            }
        }
        //remove friends from list
        for (let i = 0; i < result.length; i++) {
            const element = result[i];
            if(friends.includes(element.username)){               
                result.splice(i,1);
            }
        }
        //await client.close();       
        res.render('explorefriends.ejs',{userobj:result,username:username});
    }
    
}