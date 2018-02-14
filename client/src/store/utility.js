export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties,
});

export const transformToChartData = (histCoinDataArray) => {
  const transformedData = histCoinDataArray.map((coinData) => {
    // transform epoch to millisecond
    const timeInMilli = coinData.time * 1000;
    return [timeInMilli, coinData.close];
  });

  return transformedData;
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
