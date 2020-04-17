/**
 * @author Satya Wikananda <satyawikananda456@gmail.com>
 * @license MIT
 */

const puppeteer = require('puppeteer')
const cheerio = require('cheerio')

const getDataKabBadung = async () => {
   const browser = await puppeteer.launch({headless: true})
   const page = await browser.newPage()
   await page.goto('https://covid19.badungkab.go.id/pemantauan-covid', {
    waitUntil: 'load',
    timeout: 0
   })
   const content = await page.content()
    .then(html => {
        const $ = cheerio.load(html)
        let kecamatan = []

        $('body > div.container-fluid > div > div.col-lg-12.my-4 > div.table-responsive > table > tbody > tr > td:nth-child(1)').each((i,e) => {
            kecamatan.push($(e).text().trim())
        })
        console.log(kecamatan)
    })
    return content
}

module.exports = getDataKabBadung