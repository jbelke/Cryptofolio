import React, { Component } from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import SearchCoins from '../../Search/Search';

class CoinExplorer extends Component {
  state = {
    value: '',
  }

  clickedHandler = (event, data) => {
    const newValue = data.result.symbol;
    this.setState({ value: newValue });
  }

  render() {
    return (
      <Segment as={Grid} divided columns={2} stackable >
        <Grid.Row centered>
          <Grid.Column mobile={16} computer={4} >
            <SearchCoins
              clicked={this.clickedHandler}
              value={this.state.value}
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={12} >
            Data: {this.state.value}
          </Grid.Column>
        </Grid.Row>
      </Segment>
    );
  }
}

export default CoinExplorer;
