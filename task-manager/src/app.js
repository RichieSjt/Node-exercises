const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

// // Express middleware
// app.use((req, res, next) => {
//     if(req.method === 'GET'){
//         res.send('GET requests are disabled')
//     }else{
//         // Letting express know that we are done with the function
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('The site is under maintainance, please try again later.')
// })  

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app