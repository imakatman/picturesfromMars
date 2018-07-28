const fs     = require("fs");
const json = require("../src/redux/data/dates.json");

let dates = [];

json.map(obj => {
  let keys = Object.keys(obj);
  let data = [];
  for(let i = 0; i < keys.length; i++){
    data.push(keys[i]);
  }
  dates.push({
    [obj.name]: data
  })
});

let stream = fs.createWriteStream(`data/justDates.json`);

dates = JSON.stringify(dates);

stream.once('open', function () {
  stream.end(dates);
  console.log("Inserted dates data into justDates.json");
});
stream.on('error', function (err) {
  console.log(err);
});