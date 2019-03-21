const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

const viewPath = path.join(__dirname, '../views/templates')
const partialsPath = path.join(__dirname, '../views/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, '../public')))

// app.get('', (req, res) => {
//     res.send('Hello, Express')
// }) //route to homepage

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Yicheng'
    })
}) // route to help page

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Yicheng'
    })
}) // route to help page

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Yicheng'
    })
}) // route to help page

app.get('/weather', (req, res) => {
    res.send('This is a weather page')
}) // route to help page

app.get('*', (req, res) => {
    res.render('404',{
        title:'404 Not Found',
        name:'Yicheng'
    })
})

app.listen(3000, () => {
    console.log('Start system!')
})