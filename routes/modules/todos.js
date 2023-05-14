// Include Express and router
const express = require('express')
const router = express.Router()
// Include Todo model
const Todo = require('../../models/todo')

// go to "Add new todo"
router.get('/new',(req,res)=>{
  res.render('new')
})
// add new todo
router.post('/',(req,res)=>{  //往 post new todo
  const name = req.body.name //從req.body拿出表單裡name的資料
  // const todo = new Todo({ name: name }) //在伺服器端建立Todo實例
  // return todo
  //   .save()   // 存入資料庫中
  return Todo.create({name}) //命令mongoose，用該資料建立一個todo
    .then(()=> res.redirect('/')) //把使用者送回首頁
    .catch(error => console.log(error)) //錯誤處理
  
})

router.get('/:id',(req,res)=>{
  //在路由網址如果用了冒號 :，表示這是一個動態參數，可以用 req.params 取出，這裡我們設定 :id，所以就用 req.params.id 拿到資料。
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', {todo}))
    .catch(error => console.error(error))
})

router.get('/:id/edit',(req,res)=>{
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', {todo}))
    .catch(error => console.error(error))
})

router.put('/:id',(req,res)=>{
  const id = req.params.id
  // const name = req.body.name
  // const isDone = req.body.isDone
  // 解構賦值
  const {name, isDone} = req.body
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = (isDone === 'on') // on or nothing
      return todo.save()
      //這次因為搭配的資料操作是 Todo.findById，這個方法只會返回一筆資料，所以後面需要接 todo.save() 針對這一筆資料進行儲存，而非操作整份資料。
    })
    .then(()=> res.redirect(`/todos/${id}`))
    .catch(error=>console.error(error))

})

router.delete('/:id',(req,res)=>{
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(()=> res.redirect('/'))
    .catch(error=>console.error(error))
})

// Export
module.exports = router