import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import PieChart from '../../../components/Chart/PieChart/PieChart';

class PortfolioSummary extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <Container as={Grid} divided stackable columns={2} >
        <Grid.Row>
          <Grid.Column>
            <PieChart />
          </Grid.Column>
          <Grid.Column>
            <PieChart />
          </Grid.Column>
        </Grid.Row>
      </Container>
    );
  }
}

export default PortfolioSummary;
