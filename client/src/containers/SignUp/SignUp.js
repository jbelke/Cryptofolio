import React, { Component } from 'react';
import { Field, reduxForm, propTypes, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Aux/Aux';
import LogIn from './LogIn/Login';
// import PropTypes from 'prop-types';

class SignUp extends Component {
  handleSignUp = async (values) => {
    await this.props.onAuth(values);

    // handle firebase error on reduxForm. if there is an error, code will not
    // pass this error handler
    if (Object.keys(this.props.authError).length > 0) {
      throw new SubmissionError({ _error: this.props.authError.message });
    }

    this.props.reset();
    this.props.history.push('/portfolio');
  }

  handleLogOut = () => {
    this.props.logout();
    this.props.history.push('/home');
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
      <Aux>
        <div>
          <form onSubmit={handleSubmit(this.handleSignUp)}>
            <div>
              <p>Sign Up</p>
              <Field name="emailSignUp" component={this.renderField} type="email" label="E-Mail" />
            </div>
            <div>
              <Field name="usernameSignUp" component={this.renderField} type="text" label="Username" />
            </div>
            <div>
              <Field name="passwordSignUp" component={this.renderField} type="password" label="Password" />
            </div>
            <button type="submit" onClick={() => console.log(this.props)}>Sign Up</button>
            <span>{error}</span>
            <div>authenticated: {this.props.isAuthenticated.toString()}</div>
          </form>
        </div>

        <br />

        <LogIn />
        <div>
          <button onClick={() => this.props.handleLogOut} >Log Out</button>
        </div>
      </Aux>
    );
  }
}

// PropTypes here
SignUp.propTypes = {
  // Redux-form proptypes
  ...propTypes,
};

// validation front end.
const validate = (values) => {
  const errors = {};
  if (!values.emailSignUp) {
    errors.emailSignUp = 'User Email is Required';
  }

  if (!values.passwordSignUp) {
    errors.passwordSignUp = 'Please Enter Password';
  }

  if (!values.usernameSignUp) {
    errors.usernameSignUp = 'Please Enter a Username';
  }

  return errors;
};

const mapStateToProps = state => ({
  authError: state.auth.errors,
  isAuthenticated: state.auth.authenticated,
});

const mapDispatchToProps = dispatch => ({
  onAuth: values => dispatch(actions.auth(values)),
  logout: () => dispatch(actions.authLogout()),
});

export default reduxForm({
  validate,
  // name the form component
  form: 'SignUpForm',
})(withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp)));
