import React, { Component } from 'react';
import { Container, Segment, Accordion, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TransactionForm from './TransactionForm/TransactionForm';
import * as actions from '../../store/actions/index';
import TransactionList from '../../components/Transaction/TransactionList';

class Portfolio extends Component {
  state = {
    activeIndex: 0,
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.getTransactions(this.props.firebaseUID);
    }
  }

  componentWillReceiveProps(nextProps) {
    // update if there is any authenticated user
    if (nextProps.firebaseUID !== this.props.firebaseUID && nextProps.isAuthenticated) {
      nextProps.getTransactions(nextProps.firebaseUID);
    }
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    return (
      <Container as={Segment.Group} raised>
        <Segment>

          <Accordion>
            <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
              <div>
                <Icon name="add square" size="big" color="green" />
                <span>Add Transaction</span>
              </div>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0} >
              <TransactionForm firebaseUID={this.props.firebaseUID} />
            </Accordion.Content>
          </Accordion>

          <TransactionList transactions={this.props.transactionList} />

        </Segment>

      </Container>
    );
  }
}

// PropTypes
Portfolio.propTypes = {
  getTransactions: PropTypes.func.isRequired,
  firebaseUID: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  transactionList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.authenticated,
  transactionList: state.transaction.transactions,
  firebaseUID: state.auth.firebaseUID,
});

const mapDispatchToProps = dispatch => ({
  getTransactions: firebaseUID => dispatch(actions.getTransactions(firebaseUID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
