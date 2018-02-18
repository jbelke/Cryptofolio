import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { numFormat } from '../../store/utility';
import * as actions from '../../store/actions/index';
import ImageLoader from '../ImageLoader/ImageLoader';

class TransactionList extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.transactions !== this.props.transactions) {
      this.props.getMarketValue(nextProps.transactions);
    }
  }

  render() {
    let list = <Table.Row><Table.Cell>Add a Transaction</Table.Cell></Table.Row>;
    if (this.props.transactions.length > 0) {
      list = this.props.transactions.map((transaction) => {
        const e = new Date(transaction.transactionDate);
        const date = e.toLocaleDateString('en-US');
        const image = <ImageLoader imageUrl={transaction.coin.imageUrl} />;

        let currentValue = 0;
        if (Object.keys(this.props.marketValues).length > 0) {
          currentValue = this.props.marketValues[transaction.coinName].USD;
        }
        const totalMarketValue = (currentValue * transaction.coinAmount).toFixed();
        let type = 'BUY';
        let price = transaction.buyPrice;

        if (transaction.buyPrice === null) {
          type = 'SELL';
          price = transaction.sellPrice;
        }
        const initialcost = transaction.coinAmount * price;
        const delta = (((totalMarketValue - initialcost) / initialcost) * 100).toFixed(2);

        return (
          <Table.Row key={transaction.id} >
            <Table.Cell>{image}{transaction.coin.cryptoCoinFullName}</Table.Cell>
            <Table.Cell>{date}</Table.Cell>
            <Table.Cell>{type}</Table.Cell>
            <Table.Cell>{numFormat(transaction.coinAmount)}</Table.Cell>
            <Table.Cell>${numFormat(price)}</Table.Cell>
            <Table.Cell>${numFormat(initialcost)}</Table.Cell>
            <Table.Cell>${numFormat(totalMarketValue)}</Table.Cell>
            <Table.Cell>{numFormat(delta)} %</Table.Cell>
          </Table.Row>
        );
      });
    }

    return (
      <Table celled size="small" compact>
        <Table.Header inverted="true" fullWidth>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Initial Cost</Table.HeaderCell>
            <Table.HeaderCell>Market Value</Table.HeaderCell>
            <Table.HeaderCell>Delta</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {list}
        </Table.Body>
      </Table>
    );
  }
}

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  marketValues: PropTypes.shape(),
  getMarketValue: PropTypes.func.isRequired,
};

TransactionList.defaultProps = {
  marketValues: {},
};

const mapStateToProps = state => ({
  marketValues: state.coin.coinMarketValue,
});

const mapDispatchToProps = dispatch => ({
  getMarketValue: symbols => dispatch(actions.getMarketValues(symbols)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);
