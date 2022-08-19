import logo from './logo.svg';
import './App.css';

import { gql, useSubscription } from '@apollo/client';

const TRADES_SUBSCRIPTION = gql`
  subscription trades {
    trades {
      symbol
      total_volume
      price
    }
  }
`;

function LatestTrades() {
  const { data, loading } = useSubscription(TRADES_SUBSCRIPTION);
  return <h4>New trades: {!loading && data.trades}</h4>;
}

function DisplayTrades() {
  const { loading, error, data } = useSubscription(TRADES_SUBSCRIPTION);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error) 
    return <p>Error :(</p>
  };

  return data.trades.sort((a,b) => {
    if (a.symbol < b.symbol) {
      return -1
    } else if (a.symbol > b.symbol) {
      return 1
    }

    return 0
  }).map(({ symbol, total_volume, price }) => (
    <p key={symbol}>
      {symbol}: Vol: {total_volume} | Price: {price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
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
