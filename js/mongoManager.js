var {user, password, dbname} = require('../config.json');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://"+user+":"+password+"@web-entreprise-systems.enfbr.mongodb.net/"+dbname+"?retryWrites=true&w=majority";


//functions to access MongoDB
module.exports = {
  //adds object to a collection
  addToDB: async function(collection, myobj){
  var here = await MongoClient.connect(uri,function(err,db){
      if(err) throw err;
      var dbo = db.db(dbname);
      var users = dbo.collection(collection);
      var result = users.insert(myobj, function(err, res){
        if (err) throw err;
        console.log(myobj.length + " object(s) inserted");
      });
      db.close();
    });
  },
  //empties entire collection
  emptyCollection: async function(collection){
    var here = await MongoClient.connect(uri, function(err, db){
      if(err) throw err;
      var dbo = db.db(dbname);
      var users = dbo.collection(collection);
      var result = users.deleteMany( { }, function(err, res){
        if (err) throw err;
        console.log("emptied the " + collection + " collection");
      });
      db.close();
    });
  },
  //gets all elements from a collection, uses a callback function to process data afterwards
  getFromDB: async function(collection, callback){
    MongoClient.connect(uri, async function(err, db){
      if(err) throw err;
      var dbo = db.db(dbname);
      var users = dbo.collection(collection);
      var elem = dbo.collection(collection).find();
      var elem_array = await elem.toArray();
      console.log("Collected " + elem_array.length + " recipes");
      db.close();
      return callback(elem_array);
    });
  }

}
