import React, { Component } from 'react';
import { Search, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Aux/Aux';

class SearchCoins extends Component {
  state = {
    isLoading: false,
    value: '',
    result: [],
  }

  componentDidMount() {
    this.props.getList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
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
      <Aux>
        <Search
          // make input field take 100% of container, pass an object fluid:true
          input={{ fluid: true }}
          loading={this.state.isLoading}
          results={this.state.result}
          value={this.state.value}
          onResultSelect={this.props.clicked}
          onSearchChange={this.handleSearchChange}
          resultRenderer={this.handleResultRenderer}
          minCharacters={2}
          onFocus={this.handleOnFocus}
          size="large"
          list={this.props.list}
        />
      </Aux>
    );
  }
}

SearchCoins.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  getList: PropTypes.func.isRequired,
  clicked: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};


const mapStateToProps = state => ({
  list: state.coin.coinSearchList,
});

const mapDispatchToProps = dispatch => ({
  getList: () => dispatch(actions.getCoinList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchCoins);
