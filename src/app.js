const path = require('path')
const express = require('express')
const hbs = require('hbs')
const gecode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()

const viewPath = path.join(__dirname, '../views/templates')
const partialsPath = path.join(__dirname, '../views/partials')
const port = process.env.PORT || 3000

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
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a address!'
        })

    }
    gecode(req.query.search, (error, {
        latitude,
        longtitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longtitude, (error, forecast) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                temperature: forecast.temperature,
                probability_to_rain: forecast.probability_to_rain,
                location: location
            })
        })
    })
}) // route to help page

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Not Found',
        name: 'Yicheng'
    })
})

app.listen(port, () => {
    console.log('Start system!' + port)
})