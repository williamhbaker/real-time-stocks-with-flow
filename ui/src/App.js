import logo from './logo.svg';
import './App.css';

import { gql, useSubscription } from '@apollo/client';

const SIGNALS_SUBSCRIPTION = gql`
subscription Signals {
  meanreversionsignals {
    price
    signal
    symbol
    trailingaverage
  }
}
`;

function DisplayTrades() {
  const { loading, error, data } = useSubscription(SIGNALS_SUBSCRIPTION);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error) 
    return <p>Error :(</p>
  };

  return data.meanreversionsignals.sort((a,b) => {
    if (a.symbol < b.symbol) {
      return -1
    } else if (a.symbol > b.symbol) {
      return 1
    }

    return 0
  }).map(({ symbol, signal, price, trailingaverage }) => (
    <p key={symbol}>
      {symbol}: | Recommendation: {signal} | Avg: {trailingaverage.toLocaleString(undefined, { minimumFractionDigits: 2 })} | Price: {price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
    </p>
  ));
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DisplayTrades />
      </header>
    </div>
  );
}

export default App;
