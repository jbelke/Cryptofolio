import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import PieChart from '../../../components/Chart/PieChart/PieChart';
import TransactionPerformance from '../../../components/Transaction/TransactionPerformance/TransactionPerformance';
import TransactionSnapShot from '../../../components/Transaction/TransactionSnapShot/TransactionSnapShot';

const portfolioSummary = () => (
  <Container as={Grid} divided stackable columns={2} >
    <Grid.Row>
      <Grid.Column>
        <PieChart />
      </Grid.Column>
      <Grid.Column>
        <Grid.Row>
          <TransactionPerformance />
        </Grid.Row>
        <Grid.Row>
          <TransactionSnapShot />
        </Grid.Row>
      </Grid.Column>
    </Grid.Row>
  </Container>
);


export default portfolioSummary;
