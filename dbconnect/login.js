var exists=false;
var result=null;
async function fetchuser(client,userobj){
    console.log('finding',userobj);
    result=await client.db('profile').collection('user').findOne(userobj);
    if(result){console.log('user found'+result.username);exists=true;}
    else{console.log('invalid username or password');}
   
};
module.exports.login=async function main(userobj,res,req){
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://dbuser:JZf111qVS2zqKVfs@addmie-ybdhy.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {useUnifiedTopology:true}); 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('client connected sucessfully');
        // Make the appropriate DB calls
        await  fetchuser(client,userobj);
        if(exists){
            console.log('loading profile page');
        }
        else{
            console.log('oops invalid user');
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    if(exists){
        console.log(exists);
        req.session.username=result.username;
        console.log('loggin in account of'+result.username);
        res.redirect('/profile/'+result.username);
        while(true){
            console.log(req.session.username);
            if(req.session.username){
                console.log('session variable created');
                break;
            }
        }
    }
    else{
        console.log('invalid userid or password');
        //window.alert('ivalid username or password');
        res.render('Addmie.ejs');
    }
}