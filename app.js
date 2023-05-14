// Require packages
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
// use dotenv only not in production env
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
const port = 3000
const methodOverride = require('method-override')
// Include router
const routes = require('./routes') // it'll find 'index.js' automatically

require('./config/mongoose') //do not need a const to get the export or used by another line


const app = express()
// set template engine
app.engine('hbs',exphbs({defaultLayout:'main',extname:'.hbs'})) //建立一個名為hbs的樣板引擎，並傳入exphbs為相關參數
app.set('view engine','hbs') //啟用樣板引擎hbs

// decrypt request body
app.use(bodyParser.urlencoded({extended: true}))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
// use.routes 必須要在最後
app.use(routes)

// Listening to port 3000
app.listen(port,()=>{
  console.log(`App is running on port:${port}`)
})