/**
 * Created by hope.kim on 6/21/18.
 */
const fetch  = require('node-fetch');
const Mongo  = require("mongodb").MongoClient;
const Assert = require("assert");
const fs     = require("fs");

const apiUrl        = "https://api.nasa.gov/mars-photos/api/v1/rovers";
const apiKey        = "8m8bkcVYqxE5j0vQL2wk1bpiBGibgaqCrOvwZVyU";
const mgurl         = "mongodb://imakatman:1nsanse%26@ds117111.mlab.com:17111/picturesfrommars";
const pathToDataDir = "../src/redux/data";


let photoGrabbingData = [];

/*
Fetch rovers data from Nasa API and store the
id, queryName, and maxSol for each rover inside
photoGrabbingData to be used when grabbing and storing
photos. Then resolve the data that is returned so that the
chained callback for getRovers() can use it.
 */
function getRovers() {
  return new Promise((res, rej) => {
    fetch(`${apiUrl}?api_key=${apiKey}`)
      .then(resp => resp.json())
      .then(json => {
        json.rovers.map(j => {
          const obj = {
            id: j.id,
            queryName: j.name.toLowerCase(),
            maxSol: Number(j.max_sol)
          };
          photoGrabbingData.push(obj)
        })
        res(json);
      })
      // .then(json => console.log(json))
      .catch(err => {
        console.error(err);
        rej(err)
      })
  });
}

/*
Update rovers documents with latest data that was
returned from getRovers()
 */
function updateRovers(database, data){
  data.map(r => {
    console.log(r)
    // .update() method is deprecated for node driver 2.0
    database.collection("rovers").updateOne(
      {id: r.id},
      {$set: r},
      /*
       If upsert: true and no documents match the filter, updateOne() creates a new document based on the filter criteria and update modifications.
       */
      {upsert: true}
    );
  });
}

function grabPhotos(){

}

getRovers().then(vals => {
  console.log("getRovers has resolved", vals);
  /*
   Make api call with sols not earth dates but store data by earth date.
   It will be easier to loop through each day by sol.
   */
  Mongo.connect(mgurl, {
    uri_decode_auth: true
  }, function (err, db) {
    // ** Error handling for database connection
    if (err) throw err;
    console.log("Database connected!");
    // ** End

    let dbo = db.db("picturesfrommars");
    const roversData = vals;

    updateRovers(dbo, roversData.rovers);

    db.close();

    // let promises;
    // // for (let i = 0; i < 5; i++) {
    //
    // promises = photoGrabbingData.map(r => {
    //   return new Promise((res, rej) => {
    //     fetch(`${apiUrl}/${r.queryName}/photos?sol=${r.maxSol}&api_key=${apiKey}`)
    //       .then(resp => resp.json())
    //       .then(json => {
    //         console.log(json, r, "got back some json")
    //         const data        = json.photos,
    //               rover       = data[0].rover.id,
    //               earth_date  = data[0].earth_date;
    //
    //         let images = [];
    //         data.map(d => {
    //           const day = {
    //             [d.camera.id]: [
    //               {
    //                 src: d.img_src,
    //                 earth_date: d.earth_date,
    //                 sol: d.sol,
    //                 rover: d.rover.id,
    //                 camera: d.camera.id,
    //                 cameraName: d.camera.name,
    //               }
    //             ]
    //           };
    //
    //           images.push(day);
    //         });
    //
    //         let formattedData = {
    //           [earth_date]: {
    //             [rover]: images
    //           }
    //         };
    //
    //         console.log(formattedData)
    //
    //         dbo.collection("dates").insertOne(formattedData, function (err, resp) {
    //           if (err) throw err;
    //           console.log("Inserted", earth_date);
    //         });
    //
    //         console.log("end of fetch request")
    //         res(earth_date);
    //       })
    //       // .then(json => console.log(json))
    //       .catch(err => {
    //         console.error(err);
    //         rej(err)
    //       });
    //   }).catch(err => {
    //     console.error(err);
    //     rej(err)
    //   });;
    // });
    //
    // console.log(promises)
    //
    // Promise.all(promises).then(vals => {
    //   console.log(vals)
    //   db.close()
    // })
  })
});

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

