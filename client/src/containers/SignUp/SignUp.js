import React, { Component } from 'react';
import { Field, reduxForm, propTypes } from 'redux-form';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class SignUp extends Component {
  handleSubmit = (values) => {
    console.log(values, this.props);
    // reset field
    this.props.reset();
  }
  // redux-form === prevent default hoc
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
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div>
          <p>UserName</p>
          <Field name="inputName" component={this.renderField} type="text" label="Name" />
        </div>
        <div>
          <Field name="password" component={this.renderField} type="password" label="Password" />
        </div>
        <p>error :</p>
        <button type="submit" onClick={() => console.log(this.props)}>Submit</button>
      </form>
    );
  }
}

// PropTypes here
SignUp.propTypes = {
  ...propTypes,
};

// validation func here
const validate = (values) => {
  const errors = {};
  if (!values.inputName) {
    errors.inputName = 'User Name is Required';
  }

  if (!values.password) {
    errors.password = 'Please Enter Comment';
  }

  return errors;
};

export default reduxForm({
  validate,
  // name the form component
  form: 'SignUpForm',
})(connect(null, null)(SignUp));
