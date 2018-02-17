import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import PieChart from '../../../components/Chart/PieChart/PieChart';

class PortfolioSummary extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <Container>
        <PieChart />
      </Container>
    );
  }
}

export default PortfolioSummary;
