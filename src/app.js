const path = require('path')
const express = require('express')

const app = express()
app.use(express.static(path.join(__dirname,'../public')))

// app.get('', (request, response) => {
//     response.send('Hello, Express')
// }) //route to homepage

app.get('/help', (request, response) => {
    response.send({title:'yes',object:'true'})
}) // route to help page

app.get('/about', (request, response) => {
    response.send('This is a about page')
}) // route to help page

app.get('/weather', (request, response) => {
    response.send('This is a weather page')
}) // route to help page

app.listen(3000, () => {
    console.log('Start system!')
})