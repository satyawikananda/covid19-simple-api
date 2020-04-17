/**
 * @author Satya Wikananda <satyawikananda456@gmail.com>
 * @license MIT
 */

const axios = require('axios')
const cheerio = require('cheerio')
const url = 'https://covid19.badungkab.go.id/pemantauan-covid'

const getDataKabBadung = () => {
    return new Promise( async (resolve, reject) => {
        await axios.get(url)
            .then(html => {
                if(html.status == 200){
                    const $ = cheerio.load(html.data)
                    let kecamatan = []
                    let jumlahkasus = []
                    let pemantauan = []
                    let selesai = []
                    let kasuspdp = []
                    let perawatanpdp = []
                    let sembuh = []
                    let negatif = []
                    let positif = []
                    let pending = []
                    let totalKasusOdp, totalPemantauanOdp, kasusSelesaiOdp, totalKasusPdp, totalPerawatanPdp, kasusSembuhPdp, lastupd, totalNegatif, totalPositif, totalPending
    
                    $('body > div.container-fluid > div > div.col-lg-12.my-4 > div.table-responsive > table > tbody > tr > td:nth-child(1)').each((i,e) => {
                        kecamatan.push($(e).text().replace(/(\r\n|\n|\r)/gm,"").replace('Lihat Desa','').trim())
                    })
    
                    lastupd = $('body > div.container-fluid > div > div.col-lg-12.mt-4 > h5:nth-child(3)').text().trim().replace('S/D ','')
    
                    $('body > div.container-fluid > div > div.col-lg-12.my-4 > div.table-responsive > table > tbody > tr').each((i,e) => {
                        $(e).find('td:nth-child(2) > table > tbody > tr:nth-child(1) > th:nth-child(3)').each((s,j) => {
                            jumlahkasus.push($(j).text().trim())
                        })
                    })
    
                    $('body > div.container-fluid > div > div.col-lg-12.my-4 > div.table-responsive > table > tbody > tr').each((i,e) => {
                        $(e).find('td:nth-child(2) > table > tbody > tr:nth-child(2) > th:nth-child(3)').each((s,j) => {
                            pemantauan.push($(j).text().trim())
                        })
                    })
    
                    $('body > div.container-fluid > div > div.col-lg-12.my-4 > div.table-responsive > table > tbody > tr').each((i,e) => {
                        $(e).find('td:nth-child(2) > table > tbody > tr:nth-child(3) > th:nth-child(3)').each((s,j) => {
                            selesai.push($(j).text().trim())
                        })
                    })
    
                    $('body > div.container-fluid > div > div.col-lg-12.my-4 > div.table-responsive > table > tbody > tr').each((i,e) => {
                        $(e).find('td:nth-child(3) > table > tbody > tr:nth-child(1) > th:nth-child(3)').each((s,j) => {
                            kasuspdp.push($(j).text().trim())
                        })
                    })
                    $('body > div.container-fluid > div > div.col-lg-12.my-4 > div.table-responsive > table > tbody > tr').each((i,e) => {
                        $(e).find('td:nth-child(3) > table > tbody > tr:nth-child(6) > th:nth-child(3)').each((s,j) => {
                            perawatanpdp.push($(j).text().trim())
                        })
                    })
                    $('body > div.container-fluid > div > div.col-lg-12.my-4 > div.table-responsive > table > tbody > tr').each((i,e) => {
                        $(e).find('td:nth-child(3) > table > tbody > tr:nth-child(7) > th:nth-child(3)').each((s,j) => {
                            sembuh.push($(j).text().trim())
                        })
                    })
                    $('body > div.container-fluid > div > div.col-lg-12.my-4 > div.table-responsive > table > tbody > tr').each((i,e) => {
                        $(e).find('td:nth-child(3) > table > tbody > tr:nth-child(3) > td:nth-child(3)').each((s,j) => {
                            negatif.push($(j).text().trim())
                        })
                    })
                    $('body > div.container-fluid > div > div.col-lg-12.my-4 > div.table-responsive > table > tbody > tr').each((i,e) => {
                        $(e).find('td:nth-child(3) > table > tbody > tr:nth-child(4) > td:nth-child(3)').each((s,j) => {
                            positif.push($(j).text().trim())
                        })
                    })
                    $('body > div.container-fluid > div > div.col-lg-12.my-4 > div.table-responsive > table > tbody > tr').each((i,e) => {
                        $(e).find('td:nth-child(3) > table > tbody > tr:nth-child(5) > td:nth-child(3)').each((s,j) => {
                            pending.push($(j).text().trim())
                        })
                    })
    
                    totalKasusOdp = $('body > div.container-fluid > div > div.col-lg-12.my-4 > div.table-responsive > table > tbody > tr.bg-success.text-white > th:nth-child(2) > table > tbody > tr:nth-child(1) > th:nth-child(3)').text().trim()
    
                    totalPemantauanOdp = $('body > div.container-fluid > div > div.col-lg-12.my-4 > div.table-responsive > table > tbody > tr.bg-success.text-white > th:nth-child(2) > table > tbody > tr:nth-child(2) > th:nth-child(3)').text().trim()
    
                    kasusSelesaiOdp = $('body > div.container-fluid > div > div.col-lg-12.my-4 > div.table-responsive > table > tbody > tr.bg-success.text-white > th:nth-child(2) > table > tbody > tr:nth-child(3) > th:nth-child(3)').text().trim()
    
                    totalKasusPdp = $('body > div.container-fluid > div > div.col-lg-12.my-4 > div.table-responsive > table > tbody > tr.bg-success.text-white > th:nth-child(3) > table > tbody > tr:nth-child(1) > th:nth-child(3)').text().trim()
    
                    totalPerawatanPdp = $('body > div.container-fluid > div > div.col-lg-12.my-4 > div.table-responsive > table > tbody > tr.bg-success.text-white > th:nth-child(3) > table > tbody > tr:nth-child(6) > th:nth-child(3)').text().trim()
    
                    kasusSembuhPdp = $('body > div.container-fluid > div > div.col-lg-12.my-4 > div.table-responsive > table > tbody > tr.bg-success.text-white > th:nth-child(3) > table > tbody > tr:nth-child(7) > th:nth-child(3)').text().trim()
    
                    totalNegatif = $('body > div.container-fluid > div > div.col-lg-12.my-4 > div.table-responsive > table > tbody > tr.bg-success.text-white > th:nth-child(3) > table > tbody > tr:nth-child(3) > td:nth-child(3)').text().trim()
    
                    totalPositif = $('body > div.container-fluid > div > div.col-lg-12.my-4 > div.table-responsive > table > tbody > tr.bg-success.text-white > th:nth-child(3) > table > tbody > tr:nth-child(4) > td:nth-child(3)').text().trim()
    
                    totalPending = $('body > div.container-fluid > div > div.col-lg-12.my-4 > div.table-responsive > table > tbody > tr.bg-success.text-white > th:nth-child(3) > table > tbody > tr:nth-child(5) > td:nth-child(3)').text().trim()
    
                    data = {}
                    data.code = html.status
                    data.totalKasus = [{
                        odp: {
                            kasusKumulatif: parseInt(totalKasusOdp),
                            pemantauan: parseInt(totalPemantauanOdp),
                            selesai: parseInt(kasusSelesaiOdp)
                        },
                        pdp: {
                            kasusKumulatif: parseInt(totalKasusPdp),
                            perawatan: parseInt(totalPerawatanPdp),
                            sembuh: parseInt(kasusSembuhPdp)
                        },
                        hasilPeriksa: {
                            negatif: parseInt(totalNegatif),
                            positif: parseInt(totalPositif),
                            pending: parseInt(totalPending)
                        }
                    }]
                    data.data = []
                    data.lastUpdate = lastupd
    
                    let i
                    for(i = 0; i < kecamatan.length; i++){
                        data.data[i] = {
                            kecamatan: kecamatan[i],
                            odp: {
                                kasusKumulatif: parseInt(jumlahkasus[i]),
                                pemantauan: parseInt(pemantauan[i]),
                                selesaiPemantauan: parseInt(selesai[i])
                            },
                            pdp: {
                                kasusKumulatif: parseInt(kasuspdp[i]),
                                perawatan: parseInt(perawatanpdp[i]),
                                sembuh: parseInt(sembuh[i])
                            },
                            hasilPeriksa: {
                                negatif: parseInt(negatif[i]),
                                positif: parseInt(positif[i]),
                                pending: parseInt(pending[i])
                            }
                        }
                    }
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

module.exports = getDataKabBadung