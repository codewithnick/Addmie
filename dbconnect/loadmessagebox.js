module.exports=async function main(username,convoid,res,client){
    try {
        mongodb=require('mongodb')
        
        result=await client.db('profile').collection('message').findOne({_id:mongodb.ObjectId(convoid)});
        //console.log(result)
        
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);
        res.redirect('/'+username+'/profile');
    } 
    //creating the title
    if(result.participants.length==2){
        if(result.participants[1].name==username){
            result.title=result.participants[0].name
        }
        else{
            result.title=result.participants[1].name
        }
    }
    //checking if username is a viewer of the conversation so ill remove title if he/she is not
    if(result.viewers.length==1 && result.viewers[0]==username){
        result.title='someone left a secret message'
    }
    //console.log(result,username)
    res.render('existingconvo.ejs',{result:result,username:username});
}