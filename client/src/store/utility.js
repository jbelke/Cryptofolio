export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties,
});

export const transformToChartData = (histCoinDataArray) => {
  const barData = [];
  const areaData = [];

  histCoinDataArray.forEach((coinData) => {
    // transform epoch to millisecond
    const timeInMilli = coinData.time * 1000;
    barData.push([timeInMilli, coinData.volumeto]);
    areaData.push([timeInMilli, coinData.close]);
  });

  return [areaData, barData];
};

export const transformToSearchList = (coins) => {
  const searchListArray = coins.map(coin => ({
    key: coin.coinId,
    name: coin.cryptoCoinFullName,
    imageurl: coin.imageUrl,
    symbol: coin.symbol,
  }));

  return searchListArray;
};

export const transformToPieData = (arrData) => {
  const dataHolder = {};
  let transformedData = [];
  arrData.forEach((trx) => {
    let totalAmount = trx.coinAmount * Math.max(trx.sellPrice, trx.buyPrice);
    if (trx.sellPrice) {
      totalAmount *= -1;
    }

    if (!dataHolder[trx.coinName]) {
      dataHolder[trx.coinName] = totalAmount;
    } else {
      dataHolder[trx.coinName] += totalAmount;
    }
  });

  transformedData = Object.entries(dataHolder);
  return transformedData;
};
