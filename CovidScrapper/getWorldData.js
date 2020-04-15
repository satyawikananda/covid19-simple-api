/**
 * @author Satya Wikananda <satyawikananda456@gmail.com>
 * @license MIT
 */

const puppeteer = require('puppeteer')
const cheerio = require('cheerio')

const getWorldData = async () => {
   const browser = await puppeteer.launch({headless: true})
   const page = await browser.newPage()
   await page.goto('https://www.worldometers.info/coronavirus/',{
       waitUntil: 'load',
       timeout: 0
   })
   const content = await page.content()
    .then(html => {
        const $ = cheerio.load(html)
        let datas = []
        let cases = []
        let lastUpd

        $('.maincounter-number').each((i,e) => {
            datas.push($(e).text().trim())
        })
        $('.number-table-main').each((i,e) => {
            cases.push($(e).text().trim())
        })
        lastUpd = $('div[style="font-size:13px; color:#999; margin-top:5px; text-align:center"]').text().trim()

        data = {}
        data.totalCases = datas[0]
        data.recovered = datas[2]
        data.deaths = datas[1]
        data.activeCases = cases[0]
        data.closedCases = cases[1]
        data.lastUpdate = lastUpd

        return data    
    })
   return content
}

module.exports = getWorldData