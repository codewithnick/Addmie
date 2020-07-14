/* JZf111qVS2zqKVfs */
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    //console.log("Databases:");
   // databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbuser:JZf111qVS2zqKVfs@addmie-ybdhy.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {useUnifiedTopology:true}); 
module.exports.MongoClient = MongoClient;
module.exports.uri=uri;
module.exports.client=client;
module.exports.main=async function main(client){
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        //console.log('client connected sucessfully');
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        //console.log('beware the client is still loggeed in the db');
        //await client.close();
    }
};
