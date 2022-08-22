
// Generated from collection schema collections.flow.yaml?ptr=/collections/examples~1meanReversionTrailing/schema.
// Referenced from collections.flow.yaml#/collections/examples~1meanReversionTrailing.
export type Document = {
    price: number;
    signal: string;
    symbol: string;
    trailingAverage: number;
};


// Generated from derivation register schema collections.flow.yaml?ptr=/collections/examples~1meanReversionTrailing/derivation/register/schema.
// Referenced from collections.flow.yaml#/collections/examples~1meanReversionTrailing/derivation.
export type Register = {
    [k: string]: {
        price?: number;
        timestamp?: string;
    };
};


// Generated from transform meanReversionTrailing as a re-export of collection examples/trades.
// Referenced from collections.flow.yaml#/collections/examples~1meanReversionTrailing/derivation/transform/meanReversionTrailing."
import { Document as MeanReversionTrailingSource } from "./trades";
export { Document as MeanReversionTrailingSource } from "./trades";


// Generated from derivation collections.flow.yaml#/collections/examples~1meanReversionTrailing/derivation.
// Required to be implemented by meanReversionTrailing.flow.ts.
export interface IDerivation {
    meanReversionTrailingUpdate(
        source: MeanReversionTrailingSource,
    ): Register[];
    meanReversionTrailingPublish(
        source: MeanReversionTrailingSource,
        register: Register,
        previous: Register,
    ): Document[];
}
