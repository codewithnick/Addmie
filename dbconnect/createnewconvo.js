let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear() ;
var datetoday=mm+'/'+dd+'/'+yyyy;
var timenow = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
module.exports = async function dbconnect(obj,res,client)
{   
    var x=require('mongodb').ObjectId();
    console.log(x);
    var senderobj={
        name:obj.from,
        reveal:true, 
        admin:true
    }
    var reciverobj={
        name:obj.to,
        reveal:true, 
        admin:true
    }
    var messageobj={
            sender:obj.from,
            date:datetoday,
            time:timenow,
            attachment:null,
            message:obj.message
        }
    
    var object={
            _id:x,
            title: null,
            admin:null,
            createdate:datetoday,
            participants:[senderobj,reciverobj],
            messages:[messageobj]
    }
       try {
       
        result=await client.db('profile').collection('message').insertOne(object);
        await new Promise(r => setTimeout(r, 1500));
        
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);
        await res.render('addmie.ejs')
    } 
    //res.end('success')
    console.log('trying to redirect');
    res.send({convoid:x})
    console.log('ok redrected');
}
