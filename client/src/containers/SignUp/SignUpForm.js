import React from 'react';
import { connect } from 'react-redux';
import { Container, Tab } from 'semantic-ui-react';
import * as actions from '../../store/actions/index';
import LogIn from './LogIn/Login';
import SignUp from './SignUp/SignUp';
import classes from './SignUpForm.scss';

const signUpForm = () => {
  const panes = [
    {
      menuItem: 'Sign Up',
      render: () => (
        <Tab.Pane className={classes.MenuForm}>
          <SignUp />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Log In',
      render: () => (
        <Tab.Pane className={classes.MenuForm}>
          <LogIn />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Container textAlign="center" className={classes.Form}>
      <Tab
        panes={panes}
        menu={{
          attached: true,
          fluid: true,
          widths: 2,
          className: classes.MenuItem,
          color: 'green',
        }}
      />
    </Container>
  );
};


const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.authLogout()),
});

export default connect(null, mapDispatchToProps)(signUpForm);
