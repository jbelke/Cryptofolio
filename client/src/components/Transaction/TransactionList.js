import React from 'react';
import { Segment } from 'semantic-ui-react';

const transactionList = (props) => {
  const list = props.transactions.map(transaction => (
    <Segment key={transaction.id}>
      <p>Name: {transaction.coinName}</p>
      <p>Amount: {transaction.coinAmount}</p>
      <p>Price: {transaction.buyPrice}</p>
      <p>Total: {transaction.coinAmount * transaction.buyPrice}</p>
    </Segment>
  ));

  return list;
};

export default transactionList;
