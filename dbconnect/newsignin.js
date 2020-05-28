async function adduser(client,userobj){
    let result=await client.db('profile').collection('user').insertOne(userobj);
    console.log('new user added');
   // console.log(result);

};
module.exports=async function main(username,password,fname,lname,dob,email){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear()
    let userobj={
        username:username,
        password:password,
        fname:fname,
        lname:lname,
        dob:dob,
        email:email,
        creationdate:dd+'/'+mm+'/'+yyyy,
        active:0,
        friends: ['m416','akm']
    };
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://dbuser:JZf111qVS2zqKVfs@addmie-ybdhy.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {useUnifiedTopology:true}); 
        try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('client connected sucessfully');
        // Make the appropriate DB calls
        await  adduser(client,userobj);
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);
    } finally {
        await client.close();
    }
}