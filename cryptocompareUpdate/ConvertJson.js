const coinList = require('./file.json');

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


// baseUrl for image and link to cryptocompare
const baseUrl = coinList.BaseImageUrl;
const cryptoCoinNameArray = Object.keys(coinList.Data);
const cryptoCoinImageUrls = {};
const cryptoCoinFullName = {};
const cryptoCoinSymbol = {};

cryptoCoinNameArray.forEach((coin) => {
  cryptoCoinImageUrls[coin] = `${baseUrl}${coinList.Data[coin].ImageUrl}`;
  cryptoCoinFullName[coin] = coinList.Data[coin].FullName;
  cryptoCoinSymbol[coin] = coinList.Data[coin].Symbol;
});

console.log(cryptoCoinFullName);
