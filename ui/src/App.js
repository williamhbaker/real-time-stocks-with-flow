import './App.css';
import './App.sass';

import { gql, useSubscription } from '@apollo/client';

const SIGNALS_SUBSCRIPTION = gql`
subscription Signals {
  meanreversiontrailing {
    price
    signal
    symbol
    trailingaverage
  }
}
`;

const ALL_TIME_AVG_SUBSCRIPTION = gql`
subscription AllTimeAverage {
  meanreversionsignals {
    symbol
    trailingaverage
  }
}
`;

function allTimeAverageForSymbol(data, symbol) {
  if (!data) {
    return 0
  }

  for (const item in data.meanreversionsignals) {
    if (item.symbol === symbol) {
      return item.trailingaverage.toFixed(2)
    }
  }

  return 0
}

function DisplayTrades() {
  const { loading, error, data } = useSubscription(SIGNALS_SUBSCRIPTION);
  const { loading: avgLoading, data: allTimeAverageData } = useSubscription(ALL_TIME_AVG_SUBSCRIPTION);

  if (loading || avgLoading) return <p>Loading...</p>;
  if (error) {
    console.log(error) 
    return <p>Error :(</p>
  };

  return data.meanreversiontrailing.sort((a,b) => {
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
              <p class={signal === "buy" ? "title is-size-5 has-text-success": "title is-size-5 has-text-danger"}>{signal.toUpperCase()}</p>
            </div>
          </div>

          {/* <div class="level-item has-text-centered">
            <div>
              <p class="heading is-size-6">All-Time Average Price</p>
              <p class="title is-size-5">{allTimeAverageForSymbol(allTimeAverageData, symbol)}</p>
            </div>
          </div> */}

          <div class="level-item has-text-centered">
            <div>
              <p class="heading is-size-6">Trailing Average Price (30 min)</p>
              <p class="title is-size-5">{trailingaverage.toFixed(2)}</p>
            </div>
          </div>

          <div class="level-item has-text-centered">
            <div>
              <p class="heading is-size-6">Last Traded At</p>
              <p class="title is-size-5">{price.toFixed(2)}</p>
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
