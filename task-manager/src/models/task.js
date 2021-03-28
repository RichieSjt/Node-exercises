const { ObjectID } = require('bson')
const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
    description:{
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

// const task = new Task({
//     description: 'buy milk',
//     completed: true
// })

// task.save().then(() => {
//     console.log(task)
// }).catch((error) => {
//     console.log(error)
// })

module.exports = Task