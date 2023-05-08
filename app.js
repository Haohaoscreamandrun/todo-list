// Require packages
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
// use dotenv only not in production env
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
const app = express()
const port = 3000

// set template engine
app.engine('hbs',exphbs({defaultLayout:'main',extname:'.hbs'})) //建立一個名為hbs的樣板引擎，並傳入exphbs為相關參數
app.set('view engine','hbs') //啟用樣板引擎hbs

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
  res.render('index')
})


// Listening to port 3000
app.listen(port,()=>{
  console.log(`App is running on port:${port}`)
})