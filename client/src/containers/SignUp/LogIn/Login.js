import React, { Component } from 'react';
import { Field, reduxForm, propTypes, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class LogIn extends Component {
  handleLogin = async (values) => {
    await this.props.onAuthLogin(values);

    // handle firebase error on reduxForm. if there is an error, code will not
    // pass this error handler
    if (Object.keys(this.props.authError).length > 0) {
      throw new SubmissionError({ _error: this.props.authError.message });
    }

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
        <form onSubmit={handleSubmit(this.handleLogin)}>
          <div>
            <p>Log In</p>
            <Field name="emailLogin" component={this.renderField} type="email" label="E-Mail" />
          </div>
          <div>
            <Field name="passwordLogin" component={this.renderField} type="password" label="Password" />
          </div>
          <button type="submit" onClick={() => console.log(this.props)}>Log In</button>
          <span>{error}</span>
          <div>authenticated: {this.props.isAuthenticated.toString()}</div>
        </form>
      </div>
    );
  }
}

// PropTypes here
LogIn.propTypes = {
  // Redux-form proptypes
  ...propTypes,
};

// validation front end.
const validate = (values) => {
  const errors = {};
  if (!values.emailLogin) {
    errors.emailLogin = 'User Email is Required';
  }

  if (!values.passwordLogin) {
    errors.passwordSignUp = 'Please Enter Password';
  }

  return errors;
};

const mapStateToProps = state => ({
  authError: state.auth.errors,
  isAuthenticated: state.auth.authenticated,
});

const mapDispatchToProps = dispatch => ({
  onAuthLogin: values => dispatch(actions.authLogin(values)),
});

export default reduxForm({
  validate,
  // name the form component
  form: 'LogInForm',
})(connect(mapStateToProps, mapDispatchToProps)(LogIn));
