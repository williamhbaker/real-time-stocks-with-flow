import { IDerivation, Document, Register, MeanReversionTrailingSource } from 'flow/examples/meanReversionTrailing';

const NUM_BUCKETS = 60; // 1 for each minute in an hour
const TIME_WINDOW = 30 * 60000; // minutes multipled by milliseconds/minute = milliseconds

// Times are in milliseconds. We want a 60 minute average, where each bucket is 1 minute.
// So we need to extra just the minutes part

// Implementation for derivation collections.flow.yaml#/collections/examples~1meanReversionTrailing/derivation.
export class Derivation implements IDerivation {
  meanReversionTrailingUpdate(source: MeanReversionTrailingSource): Register[] {
    if (!source.Timestamp) {
      return [];
    }

    const ts = new Date(source.Timestamp).getMinutes();
    const bucket = ts % NUM_BUCKETS;

    console.log('BUCKET: ', bucket);

    return [
      {
        [bucket.toString()]: { price: source.Price, timestamp: source.Timestamp },
      },
    ];
  }
  meanReversionTrailingPublish(
    source: MeanReversionTrailingSource,
    register: Register,
    _previous: Register,
  ): Document[] {
    const currentTime = new Date();

    let summedPrices = 0;
    let countedPrices = 0;

    // For all the values in the register, sum the prices and increment a counter if they are within
    // timeWindow
    for (const bucket in register) {
      let val = register[bucket];
      if (!val.timestamp || !val.price) {
        continue;
      }
      let thisTS = new Date(val.timestamp);
      let delta = currentTime.getTime() - thisTS.getTime();

      if (delta < 0) {
        continue; // event happend in the future - invalid timestamp?
      }

      if (delta < TIME_WINDOW) {
        summedPrices += val.price;
        countedPrices += 1;
      }
    }

    let avg = summedPrices / countedPrices;
    avg = avg ? avg : 0; // Handle NaN if divided by 0
    const thisPrice = source.Price ? source.Price : 0;

    let signal = 'hold';
    if (thisPrice > avg) {
      signal = 'sell';
    } else if (thisPrice < avg) {
      signal = 'buy';
    }

    console.log('COUNTED', countedPrices);
    console.log('SUMMED', summedPrices);
    console.log('AVG', avg);
    console.log('PRICE', thisPrice);

    return [
      {
        symbol: source.Symbol,
        price: thisPrice,
        signal: signal,
        trailingAverage: avg,
      },
    ];
  }
}
