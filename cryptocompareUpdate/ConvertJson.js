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
const cryptoCoinDataArray = coinList.Data;
const cryptoCoinNameArray = Object.keys(coinList.Data);

console.log(cryptoCoinNameArray);
