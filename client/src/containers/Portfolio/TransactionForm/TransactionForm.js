import React, { Component } from 'react';
import { Field, reduxForm, propTypes } from 'redux-form';
import { connect } from 'react-redux';
import { Form, Message, Button, Segment, Tab, Header, Container } from 'semantic-ui-react';
import * as actions from '../../../store/actions/index';
import classes from './TransactionForm.scss';

class TransactionForm extends Component {
  addTransactionHandler = async (values) => {
    const data = { ...values, firebaseUID: this.props.firebaseUID };
    await this.props.addTransaction(data);
    this.props.reset();
  }

  resetForm = () => {
    this.props.reset();
  }

  renderField = ({
    placeholder, pattern, input, label, type, meta: { touched, error, warning },
  }) => (
    <Form.Field>
      <Form.Input
        {...input}
        required
        fluid
        label={label}
        type={type}
        placeholder={placeholder}
        pattern={pattern}
      />
      {
        touched && (
          (error && <Message error content={error} />)
          || (warning && <Message warning content={warning} />)
        )
      }
      <Message error content={this.props.errorMessage} />
    </Form.Field>
  );

  render() {
    const { handleSubmit, error } = this.props;
    const buyForm = (
      <Form onSubmit={handleSubmit(this.addTransactionHandler)}>
        <Form.Group widths="equal">
          <Field name="coinName" component={this.renderField} type="input" label="Coin" />
          <Field name="buyPrice" component={this.renderField} type="number" label="Price" />
          <Field name="coinAmount" component={this.renderField} type="number" label="Amount" />
          <Field
            name="date"
            component={this.renderField}
            type="date"
            label="Transaction Date"
            placeholder="MMDDYYYYHHMM"
          />
          <Field
            name="time"
            component={this.renderField}
            type="time"
            label="Transaction Time"
            placeholder="HHMM"
          />
        </Form.Group>
        <Container textAlign="center">
          <Button positive type="submit" className={classes.Button} >Add Buy Transaction</Button>
          {!error ? <Message error header={error} /> : null}
        </Container>
      </Form>
    );

    const sellForm = (
      <Form onSubmit={handleSubmit(this.addTransactionHandler)}>
        <Form.Group widths="equal">
          <Field name="coinName" component={this.renderField} type="input" label="Coin" />
          <Field name="sellPrice" component={this.renderField} type="number" label="Price" />
          <Field name="coinAmount" component={this.renderField} type="number" label="Amount" />
          <Field
            name="date"
            component={this.renderField}
            type="date"
            label="Transaction Date"
            placeholder="MMDDYYYY"
          />
          <Field
            name="time"
            component={this.renderField}
            type="time"
            label="Transaction Time"
            placeholder="HHMM"
          />
        </Form.Group>
        <Container textAlign="center" >
          <Button negative type="submit" >Add Sell Transaction</Button>
          {!error ? <Message error header={error} /> : null}
        </Container>
      </Form>
    );

    const panes = [
      { menuItem: 'Buy', render: () => <Tab.Pane color="green">{buyForm}</Tab.Pane> },
      { menuItem: 'Sell', render: () => <Tab.Pane color="red">{sellForm}</Tab.Pane> },
    ];

    return (
      <Segment color="black" raised >
        <Header textAlign="center" >Enter Transaction</Header>
        <Tab
          onTabChange={this.resetForm}
          menu={{
            fluid: true,
            widths: 2,
            pointing: true,
            inverted: true,
            color: 'grey',
          }}
          panes={panes}
        />
      </Segment>
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
