var {user, password, dbname} = require('../config.json');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://"+user+":"+password+"@web-entreprise-systems.enfbr.mongodb.net/"+dbname+"?retryWrites=true&w=majority";

module.exports = {
  addToDB: function(collection, myobj){
    MongoClient.connect(uri, async function(err,db){
      if(err) throw err;
      var dbo = db.db(dbname);
      var users = dbo.collection(collection);
      dbo.collection(collection).insert(myobj, function(err, res){
        if (err) throw err;
        console.log(myobj.length + " object(s) inserted");
      });
      db.close();
    });
  },
  emptyCollection: function(collection){
    MongoClient.connect(uri, async function(err, db){
      if(err) throw err;
      var dbo = db.db(dbname);
      var users = dbo.collection(collection);
      dbo.collection(collection).deleteMany( { }, function(err, res){
        if (err) throw err;
        console.log("emptied the " + collection + " collection");
      });
      db.close();
    });
  },
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
