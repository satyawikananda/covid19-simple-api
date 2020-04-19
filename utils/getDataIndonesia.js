/**
 * @author Satya Wikananda <satyawikananda456@gmail.com>
 * @license MIT
 */

const axios = require("axios");
const url =
  "https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query";

const getDataIndonesia = () => {
  return new Promise(async (resolve, reject) => {
    await axios
      .get(url, {
        params: {
          f: "json",
          where: "(Kasus_Posi <> 0) AND (Provinsi <> 'Indonesia')",
          returnGeometry: false,
          spatialRel: "esriSpatialRelIntersects",
          outFields: "*",
          orderByFields: "Kasus_Posi desc",
          outSR: 102100,
          resultOffset: 0,
          resultRecordCount: 34,
          resultType: "standard",
          cacheHint: true,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          let result = response.data.features;

          resolve(response.data.features);
        } else {
          reject({
            code: response.status,
          });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = getDataIndonesia;
