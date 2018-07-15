/**
 * @TODO: Create a document that lists all the available days in MongoDB
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
function updateRovers(database, data) {
  data.map(r => {
    // .update() method is deprecated for node driver 2.0
    database.collection("rovers").updateOne(
      { id: r.id },
      { $set: r },
      /*
       If upsert: true and no documents match the filter, updateOne() creates a new document based on the filter criteria and update modifications.
       */
      { upsert: true }
    );
  });
}

function grabPhotos() {

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

    let dbo          = db.db("picturesfrommars");
    const roversData = vals;

    updateRovers(dbo, roversData.rovers);

    const promises = photoGrabbingData.map(r => {
      console.log("starting the photo storing process with", r.queryName)
      return new Promise((res, rej) => {
        fetch(`${apiUrl}/${r.queryName}/photos?sol=${r.maxSol}&api_key=${apiKey}`)
          .then(resp => resp.json())
          .then(json => {
            const photos     = json.photos,
                  roverId    = photos[0].rover.id,
                  roverName  = photos[0].rover.name,
                  earth_date = photos[0].earth_date;

            const formattedData = {
              id: roverId,
              name: roverName,
              [earth_date]: photos.map(p => {
                /*
                * Returned data for photos repeats redundant data
                * about the rover so the script must be specific about
                * what data to send to the db
                */
                return {
                  [p.id]: {
                    id: p.id,
                    sol: p.id,
                    camera: p.camera,
                    img_src: p.img_src,
                    earth_date: p.earth_date,
                    rover: {
                      id: p.rover.id,
                      name: p.rover.name
                    }
                  }
                }
              })
            };

            console.log(formattedData)

            console.log("first line of try")
            dbo.collection("dates").updateOne(
              { id: roverId },
              { $set: formattedData },
              { upsert: true },
              function(err, result){
                console.log("first line of callback")
                if (err) throw err;
                console.log("updated", earth_date, "for", roverName)
                res(earth_date);
              }
            );
          })
          // .then(json => console.log(json))
          .catch(err => {
            console.error(err);
            return rej(err);
          });
      });
    });

    Promise.all(promises).then(() => {
      db.close()
    })
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

