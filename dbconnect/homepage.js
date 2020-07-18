module.exports=async function main(username,res,client){
    
   
    try {
        var names=[]
        names.push(username)
        
        
        //not my posts
        //no posts from people who HAVE blocked me
        var blockedby=await client.db('profile').collection('user').findOne({username:username});
        for (let i = 0; i < blockedby.blockedby.length; i++) {
            const element =blockedby.blockedby[i];
            names.push(element)
        }

        //no posts from people who HAVE been blocked by me
        for (let i = 0; i <blockedby.blocks.length; i++) {
            const element =blockedby.blocks[i];
            names.push(element)
        }
        
        
        //console.log(names)
        
        
        var result =await client.db('profile').collection('post').find(
                {
                    username:{$nin:names}
                }
                        
            )
        .limit(15)
        .sort('creationdate',-1)
        .toArray();
        //console.log(result[0].blob.image,result[0].blob.path)
       /*  const base64ToImage = require('base64-to-image');

        const base64Str = result[0].blob.image;
        const path = result[0].blob.path; // Add trailing slash
        

        const { imageType, fileName } = base64ToImage(base64Str, path); // Only synchronous using */
        for(i=0;i<result.length;i++){
            let fs=require("fs")
            let yourBuffer=result[i].blob.image.buffer
            let buffer = new Buffer.from(yourBuffer)
            fs.writeFileSync(result[i].blob.path, buffer, "binary", function (err, written) {
                if (err) console.log(err);
                else {
                    //console.log("Successfully written");
                    //res.sendFile((__dirname + `location of image/imagename.yourimageextension`))
                }
            });
    }
    } catch (e) {
        console.log('error connecting to db');
        console.error(e);
    } finally {
     
        res.render('home.ejs',{username:username,postobj:result})
    }

    
    
}