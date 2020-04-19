const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const http = require("http");
const https = require("https");
const responseTime = require("response-time");
const compression = require("compression");
const bodyParser = require("body-parser");
const path = require("path");
const CovidScrapper = require("../utils");

http.globalAgent.maxSockets = Infinity;
https.globalAgent.maxSockets = Infinity;

app.use(cors());
app.use(compression());
app.use(responseTime());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  setImmediate(() => {
    try {
      res.setHeader("Cache-Control", "public, max-age=86400");
      res.sendFile(path.join(__dirname, "../index.html"));
    } catch (e) {
      res.status(400).send("Something went wrong");
    }
  });
});

app.get("/api/world", (req, res) => {
  res.setHeader("Cache-Control", "no-store");
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
  res.setHeader("Cache-Control", "no-store");
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
  res.setHeader("Cache-Control", "no-store");
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
  res.setHeader("Cache-Control", "no-store");
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
  res.setHeader("Cache-Control", "no-store");
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
  res.setHeader("Cache-Control", "no-store");
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
app.get("/world/:country", (req, res) => {
  const id = req.params.country;
  CovidScrapper.getDataCountry(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
});
app.use(express.urlencoded({ extended: false }));
app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
