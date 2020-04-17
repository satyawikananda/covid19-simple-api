/**
 * @author Satya Wikananda <satyawikananda456@gmail.com>
 * @license MIT
 */

const axios = require('axios')
const cheerio = require('cheerio')
const url = 'https://www.worldometers.info/coronavirus/'

const getWorldData = () => {
   return new Promise(async (resolve,reject) => {
       await axios.get(url)
        .then(html => {
            if(html.status == 200){
                const $ = cheerio.load(html.data)
                let datas = []
                let cases = []
                let lastUpd

                $('.maincounter-number').each((i,e) => {
                    datas.push($(e).text().trim())
                })
                $('.number-table-main').each((i,e) => {
                    cases.push($(e).text().trim())
                })
                lastUpd = $('div[style="font-size:13px; color:#999; margin-top:5px; text-align:center"]').text()

                data = {}
                data.totalCases = datas[0]
                data.recovered = datas[2]
                data.deaths = datas[1]
                data.activeCases = cases[0]
                data.closedCases = cases[1]
                data.lastUpdate = lastUpd.replace('Last updated: ','').replace(', 17:50 GMT','').trim()

                resolve(data)
            }else{
                reject({
                    code: html.status
                })
            }
        })
        .catch(err => {
            reject(err)
        })
   })
}

module.exports = getWorldData