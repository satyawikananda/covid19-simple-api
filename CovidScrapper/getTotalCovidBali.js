/**
 * @author Satya Wikananda <satyawikananda456@gmail.com>
 * @license MIT
 */

const puppeteer = require('puppeteer')
const cheerio = require('cheerio')

const getTotalCovidBali = async () => {
   const browser = await puppeteer.launch({headless: true})
   const page = await browser.newPage()
   await page.goto('https://pendataan.baliprov.go.id/', {
    waitUntil: 'load',
    timeout: 0
   })
   const content = await page.content()
       .then(html => {
           const $ = cheerio.load(html)
           let totalData = []

           $('body > div > div > div > div > div > div > div > div.card-body > h3').each((i,e) => {
               totalData.push($(e).text().trim())
           })
           data = {}
           data.provinsi = "bali"
           data.positif = totalData[0].replace(' Org','')
           data.perawatan = totalData[1].replace(' Org','')
           data.sembuh = totalData[2].replace(' Org','')
           data.meninggal = totalData[3].replace(' Org','')

           return data
       })

   return content
}

module.exports = getTotalCovidBali