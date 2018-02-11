import React, { Component } from 'react';

class SignUp extends Component {
  state = {
    userData: 'user data',
  }

  render() {
    return (
      <div>
        <p>signup</p>
        <p>login : {this.state.userData}</p>
      </div>
    );
  }
}

export default SignUp;
