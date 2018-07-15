/**
 * Created by hope.kim on 7/14/18.
 */
/*
 Fetch rovers data from Nasa API and store the
 id, queryName, and maxSol for each rover inside
 fetchSpecificRoverData to be used when grabbing and storing
 photos. Then resolve the data that is returned so that the
 chained callback for getRovers() can use it.
 */
module.exports = {
  getRovers: function() {
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
}
