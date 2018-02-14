import React, { Component } from 'react';
import { Field, reduxForm, propTypes } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class TransactionForm extends Component {
  addTransactionHandler = async (values) => {
    const data = { ...values, firebaseUID: this.props.firebaseUID };
    await this.props.addTransaction(data);
    this.props.reset();
  }

  renderField = ({
    input, label, type, meta: { touched, error, warning },
  }) => (
    <div>
      <input {...input} placeholder={label} type={type} />
      {
        touched && (
          (error && <span>{error}</span>) || (warning && <span>{warning}</span>)
        )
      }
      {this.props.errorMessage}
    </div>
  );

  render() {
    const { handleSubmit, error } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.addTransactionHandler)}>
          <div>
            <Field name="coinName" component={this.renderField} type="input" label="Coin" />
          </div>
          <div>
            <Field name="buyPrice" component={this.renderField} type="number" label="Buy Price" />
          </div>
          <div>
            <Field name="coinAmount" component={this.renderField} type="number" label="Amount Purchased" />
          </div>
          <button type="submit" >Add Transaction</button>
          <span>{error}</span>
          <div>authenticated: {this.props.isAuthenticated.toString()}</div>
        </form>
      </div>
    );
  }
}

// PropTypes here
TransactionForm.propTypes = {
  // Redux-form proptypes
  ...propTypes,
};

// validation front end.
const validate = (values) => {
  const errors = {};
  if (!values.coinName) {
    errors.coinName = 'Please Enter Coin';
  }

  if (!values.buyPrice) {
    errors.buyPrice = 'Please Enter the Price per Coin';
  }

  if (!values.coinAmount) {
    errors.coinAmount = 'Please Enter an amount';
  }

  return errors;
};

const mapStateToProps = state => ({
  authError: state.transaction.errors,
  isAuthenticated: state.auth.authenticated,
});

const mapDispatchToProps = dispatch => ({
  addTransaction: values => dispatch(actions.addTransaction(values)),
  // removeTransaction
});

export default reduxForm({
  validate,
  // name the form component
  form: 'transactionForm',
})(connect(mapStateToProps, mapDispatchToProps)(TransactionForm));
