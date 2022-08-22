import './App.css';
import './App.sass';

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
      <div class="box has-background-light" key={symbol}>
        <p class="title has-text-centered is-size-4">
          {symbol}
        </p>

        <div class="level">

          <div class="level-item has-text-centered">
            <div>
              <p class="heading is-size-6">Recommendation</p>
              <p class={signal == "buy" ? "title is-size-5 has-text-success": "title is-size-5 has-text-danger"}>{signal.toUpperCase()}</p>
            </div>
          </div>

          <div class="level-item has-text-centered">
            <div>
              <p class="heading is-size-6">All-Time Average Price</p>
              <p class="title is-size-5">{trailingaverage.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
          </div>

          <div class="level-item has-text-centered">
            <div>
              <p class="heading is-size-6">Last Traded At</p>
              <p class="title is-size-5">{price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
          </div>

        </div>

    </div>
  ));
}

function App() {
  return (

  <section className="section">
    <DisplayTrades />
  </section>
  );
}

export default App;
