module.exports = async function dbconnect(req,res,client)
{var mongodb=require('mongodb');
let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear() ;
    var datetoday=mm+'/'+dd+'/'+yyyy;
    var timenow = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
       try {       
        var commentobject={
            comment:req.body.comment,
            postid:req.body.postid,
            postedby:req.body.username,
            posteddate:datetoday+' '+timenow,
            replies:[],
            likes:[]
        }
        var result =await client.db('profile').collection('comment').insertOne(commentobject);
        result=await client.db('profile').collection('post').updateOne(
            {_id:mongodb.ObjectId(req.body.postid)},{$push:{comments:req.session.username}}
            );

    } catch (e) {
    } 
    res.end('liked')
    
}
