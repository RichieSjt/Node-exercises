const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')

const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    
    try {
        await user.save()
        // We could use await however we do not need to wait for the email to be sent for our user to register
        // sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()

        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const email = req.body.email
        const pass = req.body.password
        const user = await User.findByCredentials(email, pass)

        const token = await user.generateAuthToken()

        res.send({user, token})
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        // We return every token which is different to the one we are trying to remove
        req.user.tokens = req.user.tokens.filter((tokenWrap) => tokenWrap.token !== req.token)
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
}) 

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// router.get('/users/:id', async (req, res) =>{
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id)
//         if(!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

router.patch('/users/me', auth, async (req, res) => {
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid update!' })
    }

    const toUpdate = req.body

    try {
        updates.forEach((update) => req.user[update] = toUpdate[update])
        await req.user.save()
        
        //const user = await User.findByIdAndUpdate(_id, toUpdate, {new: true, runValidators: true})
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        // sendCancelationEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

// Setting up file upload for multer
const upload = multer({
    // In case we want to store data in a folder, however deploy platforms wipe folders when deploying so it is not ideal
    // dest: 'avatar',
    limits: {
        // One million bytes = one mb
        fileSize: 1000000
    },
    // cb = callback
    fileFilter(req, file, cb) {
        // Using regex to exclude any file that is not an image
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('File must be an image with extension jpg, jpeg or png.'))
        }

        // Things went well, we add true to accept the file, false to reject it
        cb(undefined, true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    // Multer binary data from file: req.file.buffer
    const bufferImgFromSharp = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = bufferImgFromSharp
    
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    // If callback throws an error we send a json response with the error message
    res.status(400).send({ error: error.message })
})

// <img src = "data:img/jpg;base64,binaryData"> Rendering image in html

router.delete('/users/me/avatar', auth, async (req, res) => {
    
    try {
        if (!req.user.avatar) {
            throw new Error()
        }

        req.user.avatar = undefined
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findById(_id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        // Setting a response header (nameOfResponseHeader, valueOfResponseHeader)
        res.set('Content-type', 'image/png')
        res.send(user.avatar)

    } catch (e) {
        res.status(404).send()
    }
})

module.exports = router