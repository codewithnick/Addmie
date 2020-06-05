var result=null;
module.exports = async function dbconnect(req,client)
{       console.log(req.body.text);
        console.log(req.params.username);
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear()    
        var postobj={
            username:req.session.username,
            caption:req.body.text,
            likes:0,
            creationdate:mm+'/'+dd+'/'+yyyy,
            blob:null
        };
       try {
        // Connect to the MongoDB cluster
        //await client.connect();
        //console.log('client connected sucessfully');
        // Make the appropriate DB calls
        result=await client.db('profile').collection('post').insertOne(postobj);
        //console.log(result);
        
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);

    } finally {
        console.log('closing client connection');
        //await client.close();
    
    }

}
