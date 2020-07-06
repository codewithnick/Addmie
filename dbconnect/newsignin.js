async function adduser(client,userobj){
    let result=await client.db('profile').collection('user').insertOne(userobj);
    //console.log('new user added');
   // console.log(result);

};
module.exports=async function main(username,password,fname,lname,dob,email,gender,city,client){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear() ;
    var datetoday=mm+'/'+dd+'/'+yyyy;
    var timenow = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let userobj={
        username:username,
        password:password,
        fname:fname,
        lname:lname,
        dob:dob,
        email:email,
        creationdate:datetoday+' '+timenow,
        active:0,
        secret:true,
        dates:true,
        notifications:true,
        friends: [],
        gender:gender,
        city:city.toLowerCase(),
        blockedby:[]
    };
        try {
        // Connect to the MongoDB cluster
        //await client.connect();
        //console.log('client connected sucessfully');
        // Make the appropriate DB calls
        await  adduser(client,userobj);
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);
    } finally {
        //await client.close();
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}