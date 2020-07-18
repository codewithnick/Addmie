
module.exports=async function main(username,password,fname,lname,dob,email,gender,city,req,res,client){
    let result=await client.db('profile').collection('pass').findOne(
        {username:username}
    );
    if(result){
        console.log(result)
        res.send('username is not unique please try again')
    }
    else{

    
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear() ;
    var datetoday=mm+'/'+dd+'/'+yyyy;
    var timenow = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let result=await client.db('profile').collection('pass').insertOne({username:username,password:password});
    let userobj={
        username:username,
        fname:fname,
        lname:lname,
        dob:dob,
        dp:{path:'addmie/dp/default_pic'},
        email:email,
        creationdate:datetoday+' '+timenow,
        active:0,
        secret:true,
        dates:true,
        notifications:true,
        friends: [],
        gender:gender,
        city:city.toLowerCase(),
        blockedby:[],
        blocks:[]
    };
        try {
        // Connect to the MongoDB cluster
        //await client.connect();
        //console.log('client connected sucessfully');
        // Make the appropriate DB calls
        await client.db('profile').collection('user').insertOne(userobj);

        await new Promise(r => setTimeout(r, 1500));
        res.redirect('/');

    } catch (e) {
        console.log('error connecting to db');
        console.error(e);
    } finally {
        
        //await client.close();
        //res.send('you have been registered now<a href="/login"> return to the page</a> and login')
    }
}
}