
var result=null;
var posts=null;
var saved =null;
module.exports = async function dbconnect(from,res,client)
{   
       try {
        // Connect to the MongoDB cluster
        //await client.connect();
        //console.log('client connected sucessfully');
        // Make the appropriate DB calls
        result=await client.db('profile').collection('user').findOne({username:from});
        posts=await client.db('profile').collection('post').find({username:from}).sort('creationdate',-1).toArray();
        saved=await client.db('profile').collection('post').find({saves:from}).sort('creationdate',-1).toArray();
        fans=await client.db('profile').collection('user').countDocuments({friends:from});
        result.fans=fans
        //console.log(result);
        //console.log(posts);
        for(i=0;i<posts.length;i++){
            let fs=require("fs")
            let yourBuffer=posts[i].blob.image.buffer
            let buffer = new Buffer.from(yourBuffer)
            fs.writeFileSync(posts[i].blob.path, buffer, "binary", function (err, written) {
                if (err) console.log(err);
                else {
                    //console.log("Successfully written");
                    //res.sendFile((__dirname + `location of image/imagename.yourimageextension`))
                }
            });
    }
        for(i=0;i<saved.length;i++){
            let fs=require("fs")
            let yourBuffer=saved[i].blob.image.buffer
            let buffer = new Buffer.from(yourBuffer)
            fs.writeFileSync(saved[i].blob.path, buffer, "binary", function (err, written) {
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
        await res.render('addmie.ejs')
    } finally {
        //console.log('closing client connection');
        //await client.close();
        //console.log(saved);
        await res.render('myprofile.ejs',{userobj:result,postobj:posts,saved:saved});
    }

}
