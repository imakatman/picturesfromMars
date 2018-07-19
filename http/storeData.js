/**
 * @TODO: Create a document that lists all the available days in MongoDB
 * Created by hope.kim on 6/21/18.
 */
const fetch = require('node-fetch');
const Mongo = require("mongodb").MongoClient;
const Assert = require("assert");
const fs = require("fs");

const apiUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers";
const apiKey = "8m8bkcVYqxE5j0vQL2wk1bpiBGibgaqCrOvwZVyU";
const mgurl = "mongodb://imakatman:1nsanse%26@ds117111.mlab.com:17111/picturesfrommars";
const pathToDataDir = "../src/redux/data";

let fetchSpecificRoverData = [];

/*
 Fetch rovers data from Nasa API and store the
 id, queryName, and maxSol for each rover inside
 fetchSpecificRoverData to be used when grabbing and storing
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
                        name: j.name,
                        queryName: j.name.toLowerCase(),
                        maxSol: Number(j.max_sol)
                    };
                    fetchSpecificRoverData.push(obj)
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
        database.collection("rovers").updateOne({ id: r.id }, { $set: r },
            /*
             If upsert: true and no documents match the filter, updateOne() creates a new document based on the filter criteria and update modifications.
             */
            { upsert: true }
        );
    });
}

function grabPhotos(database, fsrd, res, rej) {
    console.log("starting grabphotos process for", fsrd.queryName)

    const roverId = fsrd.id,
        roverName = fsrd.name,
        maxSol = fsrd.maxSol;

    let promises = [];


    for (let i = maxSol; i > maxSol - 10; i--) {
        let promise = new Promise((resolve, reject) => {
            fetch(`${apiUrl}/${fsrd.queryName}/photos?sol=${i}&api_key=${apiKey}`)
                .then(resp => resp.json())
                .then(json => {
                    let formattedData = {};
                    if (json.photos.length > 0) {
                        const photos = json.photos,
                            earth_date = photos[0].earth_date;

                        formattedData = {
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
                    } else {
                        formattedData = {
                            id: roverId,
                            name: roverName,
                            [earth_date]: []
                        }

                    }

                    database.collection("dates").updateOne({ id: roverId }, { $set: formattedData }, { upsert: true },
                        function(err, result) {
                            if (err) throw err;
                            console.log("updated for", roverName)
                            resolve();
                        }
                    );
                })
                // .then(json => console.log(json))
                .catch(err => {
                    console.error(err);
                    return reject(err);
                });
        });

        promises.push(promise);
    }

    Promise.all(promises).then(values => {
        console.log("promises have all resolved for", fsrd.queryName)
        res(values);
    }).catch(reason => rej(reason));
}

getRovers().then(resp => {
    /*
         Make api call with sols not earth dates but store data by earth date.
         It will be easier to loop through each day by sol.
         */
    Mongo.connect(mgurl, {
        uri_decode_auth: true
    }, function(err, db) {
        // ** Error handling for database connection
        if (err) throw err;
        console.log("Database connected!");
        // ** End

        let dbo = db.db("picturesfrommars");

        updateRovers(dbo, resp.rovers);

        let promises = fetchSpecificRoverData.map(fsrd => {
            return new Promise((resolve, reject) => grabPhotos(dbo, fsrd, resolve, reject));
        });

        Promise.all(promises).then(values => {
            console.log("promises to fetch 10 days worth of data from all rovers has been resolved")
            const rp = new Promise(function(resolve, reject) {
                dbo.collection("rovers").find({}).toArray(function(err, result) {
                    if (err) throw err;
                    const data = JSON.stringify(result);
                    let stream = fs.createWriteStream(`${pathToDataDir}/rovers.json`);

                    stream.once('open', function() {
                        stream.end(data);
                        resolve(data);
                        console.log("Inserted rovers data into rovers.json");
                    });
                    stream.on('error', function(err) {
                        reject(data);
                        console.log(err);
                    });
                });
            });

            const dp = new Promise(function(resolve, reject) {
                dbo.collection("dates").find({}).toArray(function(err, result) {
                    if (err) throw err;
                    const data = JSON.stringify(result);
                    let stream = fs.createWriteStream(`${pathToDataDir}/dates.json`);

                    stream.once('open', function() {
                        stream.end(data);
                        resolve(data);
                        console.log("Inserted dates data into dates.json");
                    });
                    stream.on('error', function(err) {
                        reject(data);
                        console.log(err);
                    });
                });
            });

            return Promise.all([rp, dp]).then(vals => dbo.close()).catch(reason => console.error(reason));
        })
    })
});