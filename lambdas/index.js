const express = require('express')
const app = express()
const port = 8080
const cors = require('cors')
const CovidScrapper = require('../CovidScrapper')

app.use(cors())
app.get('/', (req,res) => {
    res.send("Hello world")
})

app.get('/world', (req,res) => {
    CovidScrapper.getWorldData()
        .then(data => {
            res.send(data)
        })
        .catch(err => console.log(err))
})
// app.get('/kabupatenbali', (req,res) => {
//     CovidScrapper.getDataKab()
//         .then(data => {
//             res.send(data)
//         })
//         .catch(err => console.log(err))
// })
app.get('/covid-bali', (req,res) => {
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


app.use(express.urlencoded({extended:false}))
app.listen(port, () => {
    console.log(`Server listen on port ${port}`)
})