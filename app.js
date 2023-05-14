// Require packages
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
// use dotenv only not in production env
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
const app = express()
const port = 3000

const Todo = require('./models/todo')
const methodOverride = require('method-override')

// Include router and use it
const routes = require('./routes') // it'll find 'index.js' automatically


// set template engine
app.engine('hbs',exphbs({defaultLayout:'main',extname:'.hbs'})) //建立一個名為hbs的樣板引擎，並傳入exphbs為相關參數
app.set('view engine','hbs') //啟用樣板引擎hbs

// decrypt request body
app.use(bodyParser.urlencoded({extended: true}))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
// use.routes 必須要在最後
app.use(routes)

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

// Listening to port 3000
app.listen(port,()=>{
  console.log(`App is running on port:${port}`)
})