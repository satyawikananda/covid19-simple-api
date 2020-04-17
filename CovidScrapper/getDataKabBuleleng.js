/**
 * @author Satya Wikananda <satyawikananda456@gmail.com>
 * @license MIT
 */

const axios = require('axios')
const cheerio = require('cheerio')
const url = 'http://infocovid19.bulelengkab.go.id/'

const getDataKabBuleleng = () => {
    return new Promise(async (resolve,reject) => {
        axios.get(url)
            .then(html => {
                if(html.status == 200){
                    const $ = cheerio.load(html.data)
                    let positif,sembuh,pdp,odp,otg,lainnya,lastUpd
    
                    positif = $('body > div.container.py-3 > div:nth-child(3) > div:nth-child(1) > div > div > h1').text().trim()
                    sembuh = $('body > div.container.py-3 > div:nth-child(3) > div:nth-child(2) > div > div > h1').text().trim()
                    pdp = $('body > div.container.py-3 > div:nth-child(3) > div:nth-child(3) > div > div > h1').text().trim()
                    odp = $('body > div.container.py-3 > div:nth-child(3) > div:nth-child(4) > div > div > h1').text().trim()
                    otg = $('body > div.container.py-3 > div:nth-child(3) > div:nth-child(5) > div > div > h1').text().trim()
                    lainnya = $('body > div.container.py-3 > div:nth-child(3) > div:nth-child(6) > div > div > h1').text().trim()
                    lastUpd = $('body > div.container.py-3 > h6').text()
    
                    // resolve(las)
                    data = {}
                    data.code = html.status
                    data.data = {
                        positif: parseInt(positif),
                        sembuh: parseInt(sembuh),
                        pdp: parseInt(pdp),
                        odp: parseInt(odp),
                        otg: parseInt(otg),
                        lainnya: parseInt(lainnya)
                    }
                    data.lastUpdate = lastUpd.replace('Sumber : GUGUS TUGAS PERCEPATAN PENANGANAN CORONA VIRUS DISEASE (COVID-19) KABUPATEN BULELENG','').replace(/(\r\n|\n|\r)/gm,'').replace('Diperbaharui pada : ','').replace(', 16:00:00 WITA','').trim()
    
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

module.exports = getDataKabBuleleng