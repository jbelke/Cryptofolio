import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import PieChart from '../../../components/Chart/PieChart/PieChart';
import TransactionForm from '../../../components/Transaction/TransactionSummary/TransactionSummary';

const portfolioSummary = () => (
  <Container as={Grid} divided stackable columns={2} >
    <Grid.Row>
      <Grid.Column>
        <PieChart />
      </Grid.Column>
      <Grid.Column>
        <TransactionForm />
      </Grid.Column>
    </Grid.Row>
  </Container>
);


export default portfolioSummary;
