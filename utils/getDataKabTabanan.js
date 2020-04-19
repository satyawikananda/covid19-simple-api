/**
 * @author Satya Wikananda <satyawikananda456@gmail.com>
 * @license MIT
 */

const axios = require("axios");
const cheerio = require("cheerio");
const url = "http://infocorona.tabanankab.go.id/";

const getDataKabTabanan = () => {
  return new Promise(async (resolve, reject) => {
    await axios
      .get(url)
      .then((html) => {
        if (html.status == 200) {
          const $ = cheerio.load(html.data);
          let dataTerkini = [];
          let lastUpdate;
          let kecamatan = [];
          let jmlOtg = [];
          let jmlOdp = [];
          let jmlPdp = [];

          $(
            "#services > div > div.row > div > div > div.body.text-center > h3"
          ).each((i, e) => {
            dataTerkini.push($(e).text().trim());
          });
          lastUpdate = $(
            "body > section:nth-child(4) > div > div.row > div.col-md-5.col-lg-5.col-xs-12 > p"
          )
            .text()
            .replace("*Update data:", "")
            .trim();
          $(
            "body > section:nth-child(4) > div > div.row > div.col-md-5.col-lg-5.col-xs-12 > div > div.table-responsive > table > tbody > tr > td:nth-child(2)"
          ).each((i, e) => {
            kecamatan.push($(e).text().trim());
          });
          $(
            "body > section:nth-child(4) > div > div.row > div.col-md-5.col-lg-5.col-xs-12 > div > div.table-responsive > table > tbody > tr > td:nth-child(3)"
          ).each((i, e) => {
            jmlOtg.push($(e).text().trim());
          });
          $(
            "body > section:nth-child(4) > div > div.row > div.col-md-5.col-lg-5.col-xs-12 > div > div.table-responsive > table > tbody > tr > td:nth-child(4)"
          ).each((i, e) => {
            jmlOdp.push($(e).text().trim());
          });
          $(
            "body > section:nth-child(4) > div > div.row > div.col-md-5.col-lg-5.col-xs-12 > div > div.table-responsive > table > tbody > tr > td:nth-child(5)"
          ).each((i, e) => {
            jmlPdp.push($(e).text().trim());
          });
          data = {};
          data.code = html.status;
          data.data = {
            otg: parseInt(dataTerkini[0]),
            odp: parseInt(dataTerkini[1]),
            pdp: parseInt(dataTerkini[2]),
            positif: parseInt(dataTerkini[3]),
          };
          data.kecamatan = [];
          data.lastUpdate = lastUpdate;

          let i;
          for (i = 0; i < kecamatan.length; i++) {
            data.kecamatan[i] = {
              kecamatan: kecamatan[i],
              otg: parseInt(jmlOtg[i]),
              odp: parseInt(jmlOdp[i]),
              pdp: parseInt(jmlPdp[i]),
            };
          }

          resolve(data);
        } else {
          reject({
            code: html.status,
          });
        }
      })
      .catch((err) => reject(err));
  });
};

module.exports = getDataKabTabanan;
