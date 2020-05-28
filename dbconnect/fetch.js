const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbuser:JZf111qVS2zqKVfs@addmie-ybdhy.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {useUnifiedTopology:true}); 
var result=null;
module.exports = async function dbconnect(from,res)
{   
       try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('client connected sucessfully');
        // Make the appropriate DB calls
        result=await client.db('profile').collection('user').findOne({username:from});
        console.log(result);
        
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);
        res.render('addmie.ejs')
    } finally {
        console.log('closing client connection');
        await client.close();
        res.render('profile.ejs',{userobj:result});
    }
    
}
