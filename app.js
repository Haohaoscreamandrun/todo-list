// Require packages
const express = require('express')
const mongoose = require('mongoose')
// use dotenv only not in production env
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
const app = express()
const port = 3000
//Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// Retrieve database connection status
const db = mongoose.connection
db.on('error',()=>{
  console.log('mongodb error!')
})
db.once('open',()=>{
  console.log('mongodb connected!')
})

// Setting route
app.get('/',(req,res)=>{
  res.send('Hello World')
})

// Listening to port 3000
app.listen(port,()=>{
  console.log(`App is running on port:${port}`)
})