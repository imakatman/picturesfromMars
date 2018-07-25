const dates = require("../src/redux/data/dates.json");

// dates.map(date => {
//   const keys = Object.keys(date)
//   for(let i = 0; i < keys.length; i++){
//     if (date[keys[i]].length === 0) {
//       console.log(date.name, keys[i])
//     }
//   }
// })

[dates[0]].map(date => {
  const keys = Object.keys(date)
  for(let i = 0; i < keys.length; i++){
    console.log(keys[i])
  }
})