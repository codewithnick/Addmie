const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbuser:JZf111qVS2zqKVfs@addmie-ybdhy.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {useUnifiedTopology:true}); 
var result=null;
module.exports = async function dbconnect(req)
{       console.log(req.body.text);
        console.log(req.params.username);
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear()    
        var postobj={
            username:req.params.username,
            caption:req.body.text,
            likes:0,
            creationdate:dd+'/'+mm+'/'+yyyy,
            blob:null
        };
       try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('client connected sucessfully');
        // Make the appropriate DB calls
        result=await client.db('profile').collection('post').insertOne(postobj);
        //console.log(result);
        
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);

    } finally {
        console.log('closing client connection');
        await client.close();
    
    }

}
