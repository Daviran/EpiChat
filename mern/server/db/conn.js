const { MongoClient } = require("mongodb");
const Db = "mongodb+srv://truemern:mongo1@ircepi.u4ypd.mongodb.net/IRCEPI?retryWrites=true&w=majority";
if(Db === undefined) {throw new Error ("My ATLAS is not defined");}
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("myFirstDatabase");
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
         });
  },
 
  getDb: function () {
    return _db;
  },
};