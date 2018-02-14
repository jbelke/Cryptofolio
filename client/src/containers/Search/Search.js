import React, { Component } from 'react';
import { Segment, Grid, Search, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class SearchCoins extends Component {
  state = {
    isLoading: false,
    value: '',
    result: [],
  }

  resetComponent = () => this.setState({ isLoading: false, result: [], value: '' })

  handleOnFocus = e => e.target.select();

  handleResultSelect = (e, { result }) => this.setState({ value: result.symbol })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const match = this.props.list.filter((coin) => {
        const matchResult = coin.symbol.includes(value.toUpperCase());
        return matchResult;
      });

      if (match.length > 5) {
        match.splice(5);
      }

      return this.setState({
        isLoading: false,
        result: match,
      });
    }, 500);
  }

  handleResultRenderer = ({ symbol, price }) => <Label>{symbol} price:{price}</Label>

  render() {
    return (
      <Segment as={Grid} divided columns={2} stackable >
        <Grid.Row centered>
          <Grid.Column mobile={16} computer={8} >
            <Search
              fluid
              loading={this.state.isLoading}
              results={this.state.result}
              value={this.state.value}
              onResultSelect={this.handleResultSelect}
              onSearchChange={this.handleSearchChange}
              resultRenderer={this.handleResultRenderer}
              minCharacters={2}
              onFocus={this.handleOnFocus}
              size="large"
              // {...this.props}
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={8} >
            <p>value: {this.state.value}</p>
            <p>isLoading: {this.state.isLoading.toString()}</p>
          </Grid.Column>
        </Grid.Row>
      </Segment>
    );
  }
}

SearchCoins.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  list: state.coin.coinSearchList,
});

export default connect(mapStateToProps)(SearchCoins);
