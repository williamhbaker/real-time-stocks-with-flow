
// Generated from collection schema collections.flow.yaml?ptr=/collections/examples~1meanReversion/schema.
// Referenced from collections.flow.yaml#/collections/examples~1meanReversion.
export type Document = {
    price: number;
    signal: string;
    symbol: string;
    trailingAverage: number;
};


// Generated from derivation register schema collections.flow.yaml?ptr=/collections/examples~1meanReversion/derivation/register/schema.
// Referenced from collections.flow.yaml#/collections/examples~1meanReversion/derivation.
export type Register = {
    count: number;
    total: number;
};


// Generated from transform meanReversion as a re-export of collection examples/trades.
// Referenced from collections.flow.yaml#/collections/examples~1meanReversion/derivation/transform/meanReversion."
import { Document as MeanReversionSource } from "./trades";
export { Document as MeanReversionSource } from "./trades";


// Generated from derivation collections.flow.yaml#/collections/examples~1meanReversion/derivation.
// Required to be implemented by meanReversion.flow.ts.
export interface IDerivation {
    meanReversionUpdate(
        source: MeanReversionSource,
    ): Register[];
    meanReversionPublish(
        source: MeanReversionSource,
        register: Register,
        previous: Register,
    ): Document[];
}
