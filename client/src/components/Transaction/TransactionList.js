import React from 'react';
import { Icon, Table } from 'semantic-ui-react';

const transactionList = (props) => {
  // const list = props.transactions.map(transaction => (
  //   <Segment key={transaction.id}>
  //     <p>Name: {transaction.coinName}</p>
  //     <p>Amount: {transaction.coinAmount}</p>
  //     <p>Price: {transaction.buyPrice}</p>
  //     <p>Total: {transaction.coinAmount * transaction.buyPrice}</p>
  //   </Segment>
  // ));
  console.log(props);
  return (
    <Table celled size="large" color="blue" definition>
      <Table.Header inverted="true" fullWidth>
        <Table.Row>
          <Table.HeaderCell>ICON</Table.HeaderCell>
          <Table.HeaderCell>Currency</Table.HeaderCell>
          <Table.HeaderCell>Amount</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Initial Cost</Table.HeaderCell>
          <Table.HeaderCell>Market Value</Table.HeaderCell>
          <Table.HeaderCell>Delta</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>No Name Specified</Table.Cell>
          <Table.Cell>Unknown</Table.Cell>
          <Table.Cell>None</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Jimmy</Table.Cell>
          <Table.Cell>
            <Icon name="checkmark" />
              Approved
          </Table.Cell>
          <Table.Cell>None</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Jamie</Table.Cell>
          <Table.Cell>Unknown</Table.Cell>
          <Table.Cell>
            <Icon name="close" />
              Requires call
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Jill</Table.Cell>
          <Table.Cell>Unknown</Table.Cell>
          <Table.Cell>None</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default transactionList;
