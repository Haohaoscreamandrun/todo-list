// Include Express and router
const express = require('express')
const router = express.Router()

// Include home route
const home = require('./modules/home')
// Direct all '/' request to home module
router.use('/', home) 

// Include todos route
const todos = require('./modules/todos')
// Direct all '/todos' request to todos module
router.use('/todos', todos)

// Export router
module.exports = router