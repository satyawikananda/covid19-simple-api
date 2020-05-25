/**
 * @author Satya Wikananda <satyawikananda456@gmail.com>
 * @license MIT
 */

 const axios = require('axios');

 const getRsRujukan = (prov) => {
    return new Promise(async (resolve, reject) => {
        axios.get(`https://siaga-covid19-api.line-apps.com/provinces/${prov}/hospitals`)
         .then((response) => {
            if(response.status == 200){
                const results = response.data
                
                data = {}
                data.code = response.status
                data.message = "Success"
                data.data = []

                results.forEach((res) => {
                    data.data.push({
                        namaRs: res.name,
                        alamat: res.address,
                        noTelpRs: res.phone,
                        gmapsUrl: res.gmapsUrl
                    })
                })
            }else{
                data.code = response.status
                data.message = "Failed"
                data.data = "Provinsi yang anda masukan salah!"
            }
            resolve(data)
         })
         .catch((err) => {
            reject(err)
         })
    })
 }

 module.exports = getRsRujukan 