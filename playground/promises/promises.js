// Callbacks
const  doWorkCallback = (callback) => {
    setTimeout(() => {
        // In case of error
        // callback('This is my error', undefined)

        // In case of success
        callback(undefined, [1, 4, 7])
    }, 2000)
}

doWorkCallback((error, result) => {
    if(error){
        return console.log(error)
    }
    console.log(result)
})

// Promises
const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(()=> {
        // resolve([7, 4, 1])
        reject('Things went wrong!')
    }, 2000)
})

doWorkPromise.then((result) => {
    console.log('Success!')
    console.log(result)
}).catch((error) => {
    console.log(error)
})
