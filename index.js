const CovidScrapper = require('./CovidScrapper')

CovidScrapper.getDataKabBadung()
    .then(data => console.log(data))