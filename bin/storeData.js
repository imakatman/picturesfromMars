/**
 * Created by hope.kim on 6/21/18.
 */
const fetch  = require('node-fetch');
const Mongo  = require("mongodb").MongoClient;
const Assert = require("assert");

const url = `mongodb://imakatman:1nsanse%26@ds263670.mlab.com:63670/heroku_phrb56pn`;

// let manifestPromise = new Promise((res, rej) => {
//   fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=8m8bkcVYqxE5j0vQL2wk1bpiBGibgaqCrOvwZVyU`)
//     .then(resp => resp.json())
//     .then(json => res(json))
//     // .then(json => console.log(json))
//     .catch(err => {
//       console.error(err);
//       rej(err)
//     })
// })

let camerasPromise = new Promise((res, rej) => {
  fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=8m8bkcVYqxE5j0vQL2wk1bpiBGibgaqCrOvwZVyU`)
    .then(resp => resp.json())
    .then(json => res(json))
    // .then(json => console.log(json))
    .catch(err => {
      console.error(err);
      rej(err)
    })
})

// manifestPromise.then(values => console.log(values))

// manifestPromise.then(values => {
//   Mongo.connect(url, {
//     uri_decode_auth: true
//   }, function (err, db) {
//     if (err) throw err;
//     console.log("Database connected!");
//
//     var dbo = db.db("heroku_phrb56pn");
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

Mongo.connect(url, {
  uri_decode_auth: true
}, function (err, db) {
  if (err) throw err;
  console.log("Database connected!");

  let dbo = db.db("heroku_phrb56pn");
  let cursor = dbo.collection("rovers").find();

  dbo.close();
});

