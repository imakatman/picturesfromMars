/**
 * Created by hope.kim on 6/21/18.
 */
const fetch  = require('node-fetch');
const Mongo  = require("mongodb").MongoClient;
const Assert = require("assert");
const fs     = require("fs");

const url           = "mongodb://imakatman:1nsanse%26@ds117111.mlab.com:17111/picturesfrommars";
const pathToDataDir = "../src/redux/data";

let rovers = [];
//let manifestPromise =
function storeLocalRovers(){
  return new Promise((res, rej) => {
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=8m8bkcVYqxE5j0vQL2wk1bpiBGibgaqCrOvwZVyU`)
      .then(resp => resp.json())
      .then(json => {
        json.rovers.map(j => {
          const obj = {
            id: j.id,
            queryName: j.name.toLowerCase()
          };
          rovers.push(obj)
        })
        res(rovers);
      })
      // .then(json => console.log(json))
      .catch(err => {
        console.error(err);
        rej(err)
      })
  });
}

storeLocalRovers().then(()=> {
  
});

// let camerasPromise = new Promise((res, rej) => {
//   fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=8m8bkcVYqxE5j0vQL2wk1bpiBGibgaqCrOvwZVyU`)
//     .then(resp => resp.json())
//     // .then(json => res(json))
//     .then(json => console.log(json))
//     .catch(err => {
//       console.error(err);
//       rej(err)
//     })
// })

// manifestPromise.then(values => console.log(values))

// manifestPromise.then(values => {
//   Mongo.connect(url, {
//     uri_decode_auth: true
//   }, function (err, db) {
//     if (err) throw err;
//     console.log("Database connected!");
//
//     var dbo = db.db("picturesfrommars");
//     // dbo.collection("rovers").insertMany(values.rovers, function (err, res) {
//     //   if (err) throw err;
//     //   console.log("Multiple documents inserted");
//     //   db.close();
//     // });
//
//     dbo.collection("rovers").insertMany(values.rovers, function (err, res) {
//       if (err) throw err;
//       console.log("Multiple documents inserted");
//       db.close();
//     });
//
//     // db.close();
//   });
// });

/**
 * Create a JSON file from "rovers" collection
 * **/

// Mongo.connect(url, {
//   uri_decode_auth: true
// }, function (err, db) {
//   if (err) throw err;
//   console.log("Database connected!");
//
//   let dbo = db.db("picturesfrommars");
//
//   dbo.collection("rovers").find({}).toArray(function(err, result) {
//     if (err) throw err;
//     const data = JSON.stringify(result);
//     let stream = fs.createWriteStream(`${pathToDataDir}/rovers.json`);
//
//     stream.once('open', function () {
//       stream.end(data);
//       console.log("Inserted rovers data into rovers.json");
//     });
//     stream.on('error', function (err) {
//       console.log(err);
//     });
//     db.close();
//   });
// });

