module.exports=async function main(username,res,client){
    
   
    try {
        var result =await client.db('profile').collection('post')
        .find(
                {username:{$nin:[username]}}    
            )
        .limit(5)
        .toArray();
        console.log(result)
    
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);
    } finally {
     
        res.render('home.ejs',{username:username,postobj:result})
    }

    
    
}