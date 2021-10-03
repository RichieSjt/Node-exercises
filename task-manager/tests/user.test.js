const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
    // Deleting every user in the database before testing
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should sign up a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Andrew',
        email: 'andreuwu@example.com',
        password: 'Mypass777!'
    }).expect(201)

    // Verifying that we can get the user from the database
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Andrew',
            email: 'andreuwu@example.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('Mypass777!')
})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    // Verifying that the second auth token matches the response token
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'incorrectPassword'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticaded user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete acount for logged user', async () => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    
    // Verifying that the user is now deleted
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account if user is not logged in', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})