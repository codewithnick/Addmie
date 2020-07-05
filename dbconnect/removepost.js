module.exports = async function dbconnect(req,res,client)
{var mongodb=require('mongodb');
       try {       
        var result =await client.db('profile').collection('post').deleteOne({_id:mongodb.ObjectId(req.query.id)})
        } catch (e) {
    } 
    console.log('deleting post ',req.query.id)
    res.end('deleted')
    
}
