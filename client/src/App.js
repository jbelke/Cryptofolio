import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
  response: ''
};

componentDidMount() {
  // test backend working with client
  this.callApi()
    .then(res => this.setState({ response: res.express }))
    .catch(err => console.log(err));
}

  callApi = async () => {
    const response = await fetch('/api');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

  return body;
};

  render() {
    return (
      <div className="App">
        <p>{this.state.response}</p>
      </div>
    );
  }
}

export default App;
