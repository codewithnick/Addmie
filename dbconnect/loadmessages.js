module.exports=async function main(username,res,client){
    try {
        result=await client.db('profile').collection('message').find({'participants':{$elemMatch:{name:username} } } )
        .sort('lastmessage',-1).toArray();
        //finding all documents that includes participant as username
       //console.log(result)
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);
        res.redirect('/'+username+'/profile');
    } 
    for (let i = 0; i < result.length; i++) {
        const element = result[i];
        if(element.participants.includes({name:username})){
            //console.log('found')
        }
    //console.log(result[1]._id)    
    }
    res.render('direct.ejs',{convobj:result,username:username,secret:null});
}