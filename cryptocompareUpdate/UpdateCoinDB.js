const coinList = require('./file.json');
const db = require('../server/db');
// *** add data and save it to database -  sample Data below
/*
"LTC": {
"Id": "3808",
"Url": "/coins/ltc/overview",
"ImageUrl": "/media/19782/litecoin-logo.png",
"Name": "LTC",
"Symbol": "LTC",
"CoinName": "Litecoin",
"FullName": "Litecoin (LTC)",
"Algorithm": "Scrypt",
"ProofType": "PoW",
"FullyPremined": "0",
"TotalCoinSupply": "84000000",
"PreMinedValue": "N/A",
"TotalCoinsFreeFloat": "N/A",
"SortOrder": "3",
"Sponsored": false
*/


// baseUrl for image and link to cryptocompare. relevant data
const baseUrl = coinList.BaseImageUrl;
const cryptoCoinNameArray = Object.keys(coinList.Data);
const cryptoCoinImageUrls = {};
const cryptoCoinFullName = {};
const cryptoCoinSymbol = {};

// load to database fn. coin@string
const createCoinEntry = (coin) => {
  const coinData = {
    coinName: coin || 'N/A',
    symbol: cryptoCoinSymbol[coin] || 'N/A',
    cryptoCoinFullName: cryptoCoinFullName[coin] || 'N/A',
    imageUrl: cryptoCoinImageUrls[coin] || 'N/A',
  };

  return coinData;
};

const updateCoinDB = () => {
  cryptoCoinNameArray.forEach((coin) => {
    // update crypto data
    cryptoCoinImageUrls[coin] = `${baseUrl}${coinList.Data[coin].ImageUrl}`;
    cryptoCoinFullName[coin] = coinList.Data[coin].FullName;
    cryptoCoinSymbol[coin] = coinList.Data[coin].Symbol;

    // create entry in database
    db.models.Coins.create(createCoinEntry(coin));
  });
};

// updateCoinDB();

module.exports = updateCoinDB;
