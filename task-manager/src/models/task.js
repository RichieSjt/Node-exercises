const { ObjectID } = require('bson')
const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
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
}, {
    // Schema options
    timestamps: true
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

const Task = mongoose.model('Task', taskSchema)

module.exports = Task