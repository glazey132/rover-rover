const express = require('express')
const app = express()

const PORT = process.env.SERVER_PORT || 5000;

app.get('/', (req, res) => {
  console.log('process->', process.env);
  res.send('<h1>Welcome to the rover rover app</h1>')
})

app.listen(PORT, () => console.log(`Rover Rover now listening on port: ${PORT}`))
