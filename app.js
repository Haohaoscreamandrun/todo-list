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

// set template engine
app.engine('hbs',exphbs({defaultLayout:'main',extname:'.hbs'})) //建立一個名為hbs的樣板引擎，並傳入exphbs為相關參數
app.set('view engine','hbs') //啟用樣板引擎hbs

// decrypt request body
app.use(bodyParser.urlencoded({extended: true}))

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
  // Controller
  Todo
    .find() //取出Todo model裡所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(todos => res.render('index',{ todos })) // view: 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

  // Add new todo
app.get('/todos/new',(req,res)=>{
  res.render('new')
})

app.post('/todos',(req,res)=>{  //往/todos post new todo
  const name = req.body.name //從req.body拿出表單裡name的資料
  // const todo = new Todo({ name: name }) //在伺服器端建立Todo實例
  // return todo
  //   .save()   // 存入資料庫中
  return Todo.create({name}) //命令mongoose，用該資料建立一個todo
    .then(()=> res.redirect('/')) //把使用者送回首頁
    .catch(error => console.log(error)) //錯誤處理
  
})

app.get('/todos/:id',(req,res)=>{
  //在路由網址如果用了冒號 :，表示這是一個動態參數，可以用 req.params 取出，這裡我們設定 :id，所以就用 req.params.id 拿到資料。
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', {todo}))
    .catch(error => console.error(error))
})

app.get('/todos/:id/edit',(req,res)=>{
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', {todo}))
    .catch(error => console.error(error))
})

app.post('/todos/:id/edit',(req,res)=>{
  const id = req.params.id
  const name = req.body.name
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      return todo.save()
    })
    .then(()=> res.redirect(`/todos/${id}`))
    .catch(error=>console.error(error))

})

// Listening to port 3000
app.listen(port,()=>{
  console.log(`App is running on port:${port}`)
})