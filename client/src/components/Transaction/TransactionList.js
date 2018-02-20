import React, { Component } from 'react';
import { Table, Icon, Responsive } from 'semantic-ui-react';
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
    let list = <Table.Row><Table.Cell colSpan="16" textAlign="center">Add a Transaction</Table.Cell></Table.Row>;
    if (this.props.transactions.length > 0) {
      list = this.props.transactions.map((transaction) => {
        const e = new Date(transaction.transactionDate);
        const date = e.toLocaleString('en-US', { hour12: false });
        const image = <ImageLoader imageUrl={transaction.coin.imageUrl} />;

        let currentValue = 0;
        if (Object.keys(this.props.marketValues).length > 0
        && this.props.marketValues[transaction.coinName]) {
          currentValue = this.props.marketValues[transaction.coinName].USD;
        }
        const totalMarketValue = (currentValue * transaction.coinAmount).toFixed(2);
        let type = 'BUY';
        let price = transaction.buyPrice;

        if (transaction.buyPrice === null) {
          type = 'SELL';
          price = transaction.sellPrice;
        }
        const initialcost = transaction.coinAmount * price;
        const delta = (((totalMarketValue - initialcost) / initialcost) * 100).toFixed(2);
        let statusIcon = <Icon name="long arrow down" size="large" color="red" />;
        if (delta > 0) {
          statusIcon = <Icon name="long arrow up" size="large" color="green" />;
        }

        return (
          <Table.Row key={transaction.id} >
            <Table.Cell>{image}{transaction.coin.cryptoCoinFullName}</Table.Cell>
            <Responsive as={Table.Cell} minWidth={768}>{date}</Responsive>
            <Responsive as={Table.Cell} minWidth={768}>{type}</Responsive>
            <Responsive as={Table.Cell} minWidth={768}>
              {numFormat(transaction.coinAmount)}
            </Responsive>
            <Responsive as={Table.Cell} minWidth={768}>${numFormat(price)}</Responsive>
            <Table.Cell>${numFormat(initialcost)}</Table.Cell>
            <Table.Cell>${numFormat(totalMarketValue)}</Table.Cell>
            <Table.Cell>{numFormat(delta)}% {statusIcon}</Table.Cell>
          </Table.Row>
        );
      });
    }

    return (
      <Table celled size="small" justified="true" compact selectable unstackable>
        <Table.Header inverted="true" fullWidth>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Responsive as={Table.HeaderCell} minWidth={768}>Date</Responsive>
            <Responsive as={Table.HeaderCell} minWidth={768}>Type</Responsive>
            <Responsive as={Table.HeaderCell} minWidth={768}>Amount</Responsive>
            <Responsive as={Table.HeaderCell} minWidth={768}>Price</Responsive>
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
