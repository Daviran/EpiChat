const express = require("express");

// recordRoutes = express router.
// We use it to define our routes.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// list of all the records.
recordRoutes.route("/channel").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("channels")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// single record by id
recordRoutes.route("/channel/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("channels")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// create a new record.
recordRoutes.route("/channel/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    creator: req.body.creator,
    img: req.body.img,
  };
  db_connect.collection("channels").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      name: req.body.name,
      creator: req.body.creator,
      img: req.body.img,

    },
  };
  db_connect
    .collection("channels")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});
// delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("channels").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

module.exports = recordRoutes;