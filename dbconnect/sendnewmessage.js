module.exports=async function main(username,req,res,client,friendname){
    try {
        var names=[]
        names.push(username)
        
        
        //not my messages
        //no messages from people who HAVE blocked me
        var blockedby=await client.db('profile').collection('user').findOne({username:username});
        var exists= null;
        exists=await client.db('profile').collection('user').findOne({username:friendname});
        for (let i = 0; i < blockedby.blockedby.length; i++) {
            const element =blockedby.blockedby[i];
            names.push(element)
        }

        //no messages from people who HAVE been blocked by me
        for (let i = 0; i <blockedby.blocks.length; i++) {
            const element =blockedby.blocks[i];
            names.push(element)
        }
        
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);
        res.redirect('/'+username+'/profile');
    }
    //setting the secret
    if(req.query.secret!= 'True') {
        req.query.secret='null'
    }
    //if user doesnt exist
    if(exists==null){
        //console.log('page does not exist')
        res.redirect('/'+username+'/profile');
    }
    //if user is blocked
   if(names.includes(friendname)){
    await res.render('blockedaccount.ejs',{username:req.session.username,userobj:exists})
   }
   else{
    res.render('newmessagebox.ejs',{friend:friendname,username:username,secret:req.query.secret});
   }    
}