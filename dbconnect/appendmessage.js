let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear() ;
var datetoday=mm+'/'+dd+'/'+yyyy;
var timenow = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
module.exports = async function dbconnect(obj,username,res,client)
{   
    var messageobj={
        sender:username,
        date:datetoday,
        time:timenow,
        attachment:null,
        message:obj.message
    }
    var mongodb=require('mongodb');
       try {       
        result=await client.db('profile').collection('message').updateOne({_id:mongodb.ObjectId(obj.convoid)},
                                                               {$push:{messages:messageobj}});
        result=await client.db('profile').collection('message').updateOne({_id:mongodb.ObjectId(obj.convoid)},
                                                               {$set:{lastmessage:datetoday+' '+timenow}});
        
        
        //console.log(obj.convoid);
        
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);
        await res.render('addmie.ejs')
    } 
    res.end('success')
    
}
