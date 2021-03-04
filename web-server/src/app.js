const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '..', 'public')
const viewsPath = path.join(__dirname, '..', 'templates', 'views');
const partialsPath = path.join(__dirname, '..', 'templates', 'partials')

// Setup for handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Dynamic index
app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Richie'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Richie'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Richie',
        helpText: 'Sample help text.'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'clear',
        location: 'Mexico City'
    })
})

// Matching any page on help that hasn´t been matched so far 
app.get('/help/*', (req, res) => {
    res.render('404',  {
        title: '404',
        name: 'Richie',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404',  {
        title: '404',
        name: 'Richie',
        message: 'Page not found'
    })
})

app.listen(3000, () =>{
    console.log('Server is up on port 3000.')
})
