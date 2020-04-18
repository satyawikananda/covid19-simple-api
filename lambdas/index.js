const express = require('express')
const app = express()
const port = 8080
const cors = require('cors')
const CovidScrapper = require('../CovidScrapper')
const http = require('http')
const https = require('https')
const compression = require('compression')

http.globalAgent.maxSockets = Infinity
https.globalAgent.maxSockets = Infinity

app.use(cors())
app.get('/', (req,res) => {
    res.send("Hello world")
})

app.get('/world', (req,res) => {
    res.setHeader('Cache-Control', 'public, max-age=86400')
    CovidScrapper.getWorldData()
        .then(data => {
            res.send(data)
        })
        .catch(err => console.log(err))
})
app.get('/covid-badung', (req,res) => {
    res.setHeader('Cache-Control', 'public, max-age=86400')
    CovidScrapper.getDataKabBadung()
        .then(data => {
            res.send(data)
        })
        .catch(err => console.log(err))
})
app.get('/covid-buleleng', (req,res) => {
    res.setHeader('Cache-Control', 'public, max-age=86400')
    CovidScrapper.getDataKabBuleleng()
        .then(data => {
            res.send(data)
        })
        .catch(err => console.log(err))
})
app.get('/covid-bali', (req,res) => {
    res.setHeader('Cache-Control', 'public, max-age=86400')
    CovidScrapper.getTotalCovidBali()
        .then(data => {
            res.send(data)
        })
        .catch(err => console.log(err))
})
app.get('/world/:country', (req, res) => {
    const id = req.params.country
    CovidScrapper.getDataCountry(id)
        .then(data => {
            res.send(data)
        })
        .catch(err => console.log(err))
})

app.use(compression())
app.use(express.urlencoded({extended:false}))
app.listen(port, () => {
    console.log(`Server listen on port ${port}`)
})