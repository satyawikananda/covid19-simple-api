const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const http = require("http");
const https = require("https");
const responseTime = require("response-time");
const compression = require("compression");
const path = require("path");
const CovidScrapper = require("../utils");

http.globalAgent.maxSockets = Infinity;
https.globalAgent.maxSockets = Infinity;

app.use(cors());
app.use(compression());
app.use(responseTime());

app.get("/", (req, res) => {
  setImmediate(() => {
    try {
      res.setHeader("Cache-Control", "public,max-age=0");
      res.sendFile(path.join(__dirname, "../index.html"));
    } catch (e) {
      res.status(400).send("Something went wrong");
    }
  });
});

app.get("/api/world", (req, res) => {
  res.setHeader("Cache-Control", "public,max-age=3600,s-maxage=30");
  setImmediate(() => {
    try {
      CovidScrapper.getWorldData()
        .then((data) => {
          res.json(data);
        })
        .catch((err) => console.log(err));
    } catch (e) {
      res.status(400).send("Something went wrong");
    }
  });
});
app.get("/api/covid-badung", (req, res) => {
  res.setHeader("Cache-Control", "public,max-age=3600,s-maxage=30");
  setImmediate(() => {
    try {
      CovidScrapper.getDataKabBadung()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => console.log(err));
    } catch (e) {
      res.status(400).send("Something went wrong");
    }
  });
});
app.get("/api/covid-buleleng", (req, res) => {
  res.setHeader("Cache-Control", "public,max-age=3600,s-maxage=30");
  setImmediate(() => {
    try {
      CovidScrapper.getDataKabBuleleng()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => console.log(err));
    } catch (e) {
      res.status(400).send("Something went wrong");
    }
  });
});
app.get("/api/covid-bali", (req, res) => {
  res.setHeader("Cache-Control", "public,max-age=3600,s-maxage=30");
  setImmediate(() => {
    try {
      CovidScrapper.getTotalCovidBali()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => console.log(err));
    } catch (e) {
      res.status(400).send("Something went wrong");
    }
  });
});
app.get("/api/covid-tabanan", (req, res) => {
  res.setHeader("Cache-Control", "public,max-age=3600,s-maxage=30");
  setImmediate(() => {
    try {
      CovidScrapper.getDataKabTabanan()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => console.log(err));
    } catch (e) {
      res.status(400).send("Something went wrong");
    }
  });
});
app.get("/api/covid-gianyar", (req, res) => {
  res.setHeader("Cache-Control", "public,max-age=3600,s-maxage=30");
  setImmediate(() => {
    try {
      CovidScrapper.getDataKabGianyar()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => console.log(err));
    } catch (e) {
      res.status(400).send("Something went wrong");
    }
  });
});
app.get("/api/covid-indonesia", (req, res) => {
  res.setHeader("Cache-Control", "public,max-age=3600,s-maxage=30");
  setImmediate(() => {
    try {
      CovidScrapper.getDataIndonesia()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => console.log(err));
    } catch (e) {
      res.status(400).send("Something went wrong");
    }
  });
});
app.get('/api/rs-rujukan', (req, res) => {
  const prov = req.query.prov
  res.setHeader("Cache-Control", "public,max-age=3600,s-maxage=30");
  setImmediate(() => {
    try {
      if(prov == "" || prov == null){
        res.status(400).send({
          code: res.statusCode,
          success: false,
          result: null,
          message: "Query string can not be empty!",
          creator: "Satya Wikananda"
        });
      }else{
        CovidScrapper.rsRujukan(prov)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => console.log(err));
      }
    } catch (e) {
      res.status(400).send("Something went wrong");
    }
  });
});
app.use(express.urlencoded({ extended: false }));
app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
