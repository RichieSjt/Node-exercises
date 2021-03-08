// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    
    // Mongo db setup

    if(error) {
        return console.log('Unable to connect to database')
    }
    console.log('MongoDB connection stablished correctly')

    const db = client.db(databaseName)

    // CRUD
    
    /*
    
    CREATE
    
    */
    
    /* db.collection('users').insertOne({
        name: 'Richie',
        age: 26
    }, (error, result) => {
        if(error) {
            return console.log('Unable to insert user')
        }

        console.log(result.ops)
    }) */

     /* db.collection('users').insertMany([
        {
            name: 'Andrew',
            age: 29
        },
        {
            name: 'Jen',
            age: 28
        }
    ], (error, result) => {
        if(error) {
            return console.log('Unable to insert documents')
        }
    
        console.log(result.ops)
    })  */

    /* 
    
    READ
    
    */

    /* db.collection('users').find({age: 27}).toArray((error, users) => {
        console.log(users)
    })

    db.collection('users').find({age: 27}).count((error, usersCount) => {
        console.log(usersCount)
    })

    db.collection('tasks').findOne({_id: new ObjectID('604596d227f292213c82ccd0')}, (error, task) => {
        if(error) {
            return console.log('Unable to fetch task')
        }
        console.log(task)
    })
    db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
        if(error) {
            return console.log('Unable to fetch tasks')
        }
        console.log(tasks)
    }) */

    /*
    
    UPDATE
    
    */

    /* db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    }) */

    // Promise to update an user name
    /* db.collection('users').updateOne({
        _id: new ObjectID('6045a480d3c40b0da0b91c57')
    }, {
        $inc: {
            age: 2
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    }) */


    /*
    
    DELETE
    
    */

    /* db.collection('tasks').deleteOne({
        description: 'Feed dogs'
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    // Deleting an user
    db.collection('users').deleteMany({
        age: 27
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    }) */
})