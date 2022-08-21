import { IDerivation, Document, Register, MeanReversionSource } from 'flow/examples/meanReversion';

// Implementation for derivation collections.flow.yaml#/collections/examples~1meanReversion/derivation.
export class Derivation implements IDerivation {
  meanReversionUpdate(source: MeanReversionSource): Register[] {
    if (!source.Price || !source.Size) {
      return [];
    }

    const gotPrice = source.Price;
    const gotSize = source.Size;

    return [{ count: gotSize, total: gotSize * gotPrice }];
  }
  meanReversionPublish(source: MeanReversionSource, register: Register, _previous: Register): Document[] {
    const avg = register.total / register.count;
    const thisPrice = source.Price ? source.Price : 0;

    let signal = 'hold';
    if (thisPrice > avg) {
      signal = 'sell';
    } else if (thisPrice < avg) {
      signal = 'buy';
    }

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
