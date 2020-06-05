module.exports=async function main(from,to,client){
    try {
        result=await client.db('profile').collection('user').findOne({username:from});
        let friends=result.friends;
        //just some extra security push friend only if not exists in friends array and exists in db ..this is to be added 
        if(!result.friends.includes(to) ){
            friends.push(to);
        }
        result.friends=friends;
        result=await client.db('profile').collection('user').replaceOne({username:from},result);
        result=await client.db('profile').collection('user').findOne({username:from});
        console.log(result)
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);
    } 
}