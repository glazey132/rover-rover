const express = require('express')
const unirest = require('unirest')
const app = express()

const PORT = process.env.SERVER_PORT || 5000;

app.get('/', (req, res) => {
  unirest.get(`https://api.nasa.gov/DONKI/FLR?startDate=2019-01-01&endDate=2019-02-22&api_key=${process.env.REACT_APP_NASA_API_KEY}`)
  .end(function (result) {
    console.log(result.status, result.headers, result.body);
  });
})

app.listen(PORT, () => console.log(`Rover Rover now listening on port: ${PORT}`))
