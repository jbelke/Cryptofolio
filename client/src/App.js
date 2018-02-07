import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    response: '',
    trx: [],
  };

  componentDidMount() {
    // test backend working with client
    this.callApi()
      .then((res) => {
        this.setState({ response: res.body[0].name });
        this.setState({ trx: res.trxbody });
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    // fetch user 1
    const response = await fetch('/api/user/1');
    const trx = await fetch('/api/transactions/1');
    const body = await response.json();
    const trxbody = await trx.json();
    if (response.status !== 200) throw Error(response.message);

    return { body, trxbody };
  };

  render() {
    return (
      <div className="App">
        <p>{this.state.response}</p>
        <div>{this.state.trx.map(transaction => (
          <div key={transaction.id}>
            <p>{transaction.coinName}</p>
            <p>{transaction.coinAmount}</p>
            <p>{transaction.buyPrice}</p>
          </div>
          ))}
        </div>
        <p>testing</p>
      </div>
    );
  }
}

export default App;
