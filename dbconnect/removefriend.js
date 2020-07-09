module.exports=async function main(req,client){
    try {
        
        result=await client.db('profile').collection('user').updateOne({username:req.session.username},
        { $pull: {friends:{$in:[req.query.text]}}}
        );
        //console.log(result)
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);
    } 
}