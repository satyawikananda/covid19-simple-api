const CovidScrapper = require("./utils");

CovidScrapper.getDataKabGianyar().then((data) => console.log(data));
