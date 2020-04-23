# Covid-19 Simple API

Sebuah Api yang menampilkan data berupa json dari berbagai daerah yang khususnya di Bali, karena bali adalah tempat tinggal saya. API ini sudah di deploy menggunakan Vercel Now.

## Instalation

```
npm install
```

## Run project

```
npm run start
```

## Sumber data

Saya membuat API ini mengambil data dari beberapa website covid daerah setiap kabupaten khususnya di bali

1. Provinsi Bali => https://pendataan.baliprov.go.id/ - Situs scraping
2. Kabupaten Badung => https://covid19.badungkab.go.id/pemantauan-covid - Situs scraping
3. Kabupaten Gianyar => https://covid19.gianyarkab.go.id/peta - Situs scraping
4. Kabupaten Tabanan => http://infocorona.tabanankab.go.id/ - Situs scraping
5. Kabupaten Buleleng => http://infocovid19.bulelengkab.go.id/ - Situs scraping
6. World => https://www.worldometers.info/coronavirus/ - Situs scraping
7. Indonesia => API Inacovid ArcGIS

## Endpoint

- / => Homepage routes
- /api/world => Menampilkan seluruh data covid secara spesifik di dunia
- /api/covid-bali => Menampilkan data covid di Provinsi Bali
- /api/covid-badung => Menampilkan data covid di Kabupaten Bali
- /api/covid-gianyar => Menampilkan data covid di Kabupaten Gianyar
- /api/covid-tabanan => Menampilkan data covid di Kabupaten Tabanan
- /api/covid-buleleng => Menampilkan data covid di Kabupaten Buleleng
- /api/covid-indonesia => Menampilkan data covid di seluruh provinsi di Indonesia

## Resources

- [Express](https://github.com/expressjs/express)
- [Cheerio](https://github.com/cheeriojs/cheerio)
- [Axios](https://github.com/axios/axios)

## Author

Satya Wikananda &copy; 2020
