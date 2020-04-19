/**
 * @author Satya Wikananda <satyawikananda456@gmail.com>
 * @license MIT
 */

const axios = require("axios");
const cheerio = require("cheerio");
const url = "https://covid19.gianyarkab.go.id/peta";

const getDataKabGianyar = () => {
  return new Promise(async (resolve, reject) => {
    await axios
      .get(url)
      .then((html) => {
        if (html.status == 200) {
          const $ = cheerio.load(html.data);
          let lastUpd;
          let statusTotalKum = [];
          let penangananTotalKum = [];
          let lepasPenangananTotalKum = [];
          let meninggalTotalKum = [];
          let jumlahTotalKum = [];

          $(
            "#pills-profile > div:nth-child(1) > div:nth-child(1) > div > div > div > table > tbody > tr > td:nth-child(2) > div.badge.badge-pill.badge-info"
          ).each((i, e) => {
            statusTotalKum.push($(e).text().trim());
          });
          $(
            "#pills-profile > div:nth-child(1) > div:nth-child(1) > div > div > div > table > tbody > tr > td:nth-child(3) > div.badge.badge-pill.badge-outline-danger"
          ).each((i, e) => {
            penangananTotalKum.push($(e).text().trim());
          });
          $(
            "#pills-profile > div:nth-child(1) > div:nth-child(1) > div > div > div > table > tbody > tr > td:nth-child(4) > div.badge.badge-pill.badge-outline-danger"
          ).each((i, e) => {
            lepasPenangananTotalKum.push($(e).text().trim());
          });
          $(
            "#pills-profile > div:nth-child(1) > div:nth-child(1) > div > div > div > table > tbody > tr > td:nth-child(5) > div.badge.badge-pill.badge-outline-danger"
          ).each((i, e) => {
            meninggalTotalKum.push($(e).text().trim());
          });
          lastUpd = $(
            "#pills-profile > div:nth-child(1) > div:nth-child(1) > div > div > p.text-left"
          )
            .text()
            .replace("*Update: ", "")
            .trim();
          data = {};
          data.code = html.status;
          data.totalKasusKumulatif = [];
          data.lastUpd = lastUpd;

          let i;

          for (i = 0; i < statusTotalKum.length; i++) {
            data.totalKasusKumulatif[i] = {
              status: statusTotalKum[i],
              kasus: {
                penanganan: parseInt(penangananTotalKum[i]),
                lepasPenganganan: parseInt(lepasPenangananTotalKum[i]),
                meninggal: parseInt(meninggalTotalKum[i]),
                jumlah: parseInt(jumlahTotalKum[i]),
              },
            };
          }
          resolve(data);
        } else {
          reject({
            code: html.status,
          });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = getDataKabGianyar;
