require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('604d1779edffde1654f3591c').then((task) => {
//     console.log(task)
//     return Task.countDocuments({completed: false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})

    return count
}

deleteTaskAndCount('604d8e62a0395140e853296b').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log('e', e)
})