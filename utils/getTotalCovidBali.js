/**
 * @author Satya Wikananda <satyawikananda456@gmail.com>
 * @license MIT
 */

const axios = require("axios");
const cheerio = require("cheerio");
const url = "https://pendataan.baliprov.go.id/";

const getTotalCovidBali = async () => {
  return new Promise(async (resolve, reject) => {
    await axios.get(url).then((html) => {
      if (html.status == 200) {
        const $ = cheerio.load(html.data);
        let totalData = [];
        let kab = [];
        let positif = [];
        let perawatan = [];
        let sembuh = [];
        let meninggal = [];

        $(
          "body > div > div > div > div > div > div > div > div.card-body > h3"
        ).each((i, e) => {
          totalData.push($(e).text().trim());
        });

        // Data list kabupaten
        $(
          "body > div > div > div > div > div:nth-child(3) > div.col-md-12.col-md-offset-1 > div:nth-child(1) > div.card-body > div > table > tbody > tr > td:nth-child(1)"
        ).each((i, e) => {
          kab.push($(e).text().trim());
        });

        // Data jumlah positif
        $(
          "body > div > div > div > div > div:nth-child(3) > div.col-md-12.col-md-offset-1 > div:nth-child(1) > div.card-body > div > table > tbody > tr > td:nth-child(2)"
        ).each((i, e) => {
          positif.push($(e).text().trim());
        });

        // Data jumlah perawatan
        $(
          "body > div > div > div > div > div:nth-child(3) > div.col-md-12.col-md-offset-1 > div:nth-child(1) > div.card-body > div > table > tbody > tr > td:nth-child(3)"
        ).each((i, e) => {
          perawatan.push($(e).text().trim());
        });

        // Data Jumlah sembuh
        $(
          "body > div > div > div > div > div:nth-child(3) > div.col-md-12.col-md-offset-1 > div:nth-child(1) > div.card-body > div > table > tbody > tr > td:nth-child(4)"
        ).each((i, e) => {
          sembuh.push($(e).text().trim());
        });

        // Data jumlah meninggal
        $(
          "body > div > div > div > div > div:nth-child(3) > div.col-md-12.col-md-offset-1 > div:nth-child(1) > div.card-body > div > table > tbody > tr > td:nth-child(5)"
        ).each((i, e) => {
          meninggal.push($(e).text().trim());
        });

        data = {};
        data.provinsi = "BALI";
        data.positif = parseInt(totalData[0].replace(" Org", ""));
        data.perawatan = parseInt(totalData[1].replace(" Org", ""));
        data.sembuh = parseInt(totalData[2].replace(" Org", ""));
        data.meninggal = parseInt(totalData[3].replace(" Org", ""));
        data.kabupaten = [];

        let i;
        for (i = 0; i < kab.length; i++) {
          data.kabupaten[i] = {
            kabupaten: kab[i],
            positif: parseInt(positif[i]),
            perawatan: parseInt(perawatan[i]),
            sembuh: parseInt(sembuh[i]),
            meninggal: parseInt(meninggal[i]),
          };
        }
        resolve(data);
      } else {
        reject({
          code: html.status,
        });
      }
    });
  });
};

module.exports = getTotalCovidBali;
