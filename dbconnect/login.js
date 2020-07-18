var exists=false;
var result=null;

module.exports.login=async function main(userobj,res,req,client){
    
    try {
        // Connect to the MongoDB cluster
        //await client.connect();
        //console.log('client connected sucessfully');
        // Make the appropriate DB calls
       
        //console.log('finding',userobj);
       // console.log(client)
            result=await client.db('profile').collection('pass').findOne(userobj);
            if(result){
            // console.log('user found '+result.username);
            exists=true;
        }
            else{
                
                //console.log('invalid username or password');
        }
        

        if(exists){
            //console.log('loading profile page');
        }
        else{
            //console.log('oops invalid user');
        }
    } catch (e) {
        console.error(e);
    } finally {
        //await client.close();
    }
    if(exists){
        //console.log(exists);
        req.session.username=result.username;
       // console.log('loggin in account of'+result.username);
        res.redirect('/'+result.username+'/profile');
        
    }
    else{
        //console.log('invalid userid or password');
        //window.alert('ivalid username or password');
        //res.redirect('/');
        res.send('invalid username or password')
    }
}