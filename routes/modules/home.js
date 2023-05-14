// Include Express and router
const express = require('express')
const router = express.Router()
// Include Todo model
const Todo = require('../../models/todo')
// Define home route
router.get('/',(req,res)=>{
  // Controller
  Todo
    .find() //取出Todo model裡所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    // .sort({name: "asc"}) //按照名字的順序排列，反敘desc
    .sort({_id: "asc"}) //按照id順序(創立時間)
    .then(todos => res.render('index',{ todos })) // view: 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})
// Export
module.exports = router