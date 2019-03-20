const path = require('path')
const express = require('express')

const app = express()

app.set('view engine','hbs')
app.use(express.static(path.join(__dirname,'../public')))

// app.get('', (req, res) => {
//     res.send('Hello, Express')
// }) //route to homepage

app.get('', (req, res) => {
    res.render('index',{
        title:'Weather',
        name:'ande'
    })
}) // route to help page

app.get('/help', (req, res) => {
    res.send({title:'yes',object:'true'})
}) // route to help page

app.get('/about', (req, res) => {
    res.send('This is a about page')
}) // route to help page

app.get('/weather', (req, res) => {
    res.send('This is a weather page')
}) // route to help page

app.listen(3000, () => {
    console.log('Start system!')
})