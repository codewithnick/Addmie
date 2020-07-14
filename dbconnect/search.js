module.exports = async function dbconnect(req,res,client)
{   
       try {
        var userobjs=[]
        var pattern='.*'+req.query.q+'.*';
        var result=await client.db('profile').collection('user').find({username:{$regex:pattern,'$options' :'i'}}).limit(1).toArray();
       
       
       for (let i = 0; i < result.length; i++) {
           
            const element = result[i];
           userobjs.push(element.username);

       }
        result=await client.db('profile').collection('user').find({fname:{$regex:pattern,'$options' :'i'}}).limit(15).toArray();
        for (let i = 0; i < result.length; i++) {
           
            const element = result[i];            
           userobjs.push(element.username);
       }
       result=await client.db('profile').collection('user').find({lname:{$regex:pattern,'$options' :'i'}}).limit(15).toArray();
        for (let i = 0; i < result.length; i++) {
           
            const element = result[i];            
           userobjs.push(element.username);
       }
       result=await client.db('profile').collection('user').find({username:{$in:userobjs}}).toArray();
        //console.log(result,userobjs);
        //console.log(posts);
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);
        
    } finally {
       
        res.render('search.ejs',{username:req.session.username,userobj:userobjs})
    }

}