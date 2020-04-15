/**
 * @author Satya Wikananda <satyawikananda456@gmail.com>
 * @license MIT
 */

const puppeteer = require('puppeteer')
const cheerio = require('cheerio')

const getDataCountry = async (country) => {
   const browser = await puppeteer.launch({headless: true})
   const page = await browser.newPage()
   await page.goto(`https://www.worldometers.info/coronavirus/country/${country}/`, {
       waitUntil: 'load',
       timeout: 0
   })
   const content = await page.content()
    .then(html => {
        const $ = cheerio.load(html)
        let datas = []
        let lastUpd

        $('.maincounter-number').each((i,e) => {
            datas.push($(e).text().trim())
        })
        lastUpd = $('div[style="font-size:13px; color:#999; text-align:center"]').text().trim()

        data = {}
        data.country = country
        data.totalCases = datas[0]
        data.recovered = datas[2]
        data.deaths = datas[1]
        data.lastUpdate = lastUpd

        return data
    })

   return content
}

module.exports = getDataCountry