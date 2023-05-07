// Require packages
const express = require('express')
const app = express()
const port = 3000

// Setting route
app.get('/',(req,res)=>{
  res.send('Hello World')
})

// Listening to port 3000
app.listen(port,()=>{
  console.log(`App is running on port:${port}`)
})