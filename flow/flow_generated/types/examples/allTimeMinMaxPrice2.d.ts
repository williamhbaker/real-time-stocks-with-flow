
// Generated from collection schema collections.yaml?ptr=/collections/examples~1allTimeMinMaxPrice2/schema.
// Referenced from collections.yaml#/collections/examples~1allTimeMinMaxPrice2.
export type Document = {
    Conditions?: unknown[];
    Exchange?: string;
    ID: number;
    Price?: number;
    Size?: number;
    Symbol: string;
    Tape?: string;
    Timestamp?: string;
    maxPrice?: number;
    minPrice?: number;
    symbol?: string;
};


// Generated from derivation register schema collections.yaml?ptr=/collections/examples~1allTimeMinMaxPrice2/derivation/register/schema.
// Referenced from collections.yaml#/collections/examples~1allTimeMinMaxPrice2/derivation.
export type Register = unknown;


// Generated from transform minMax as a re-export of collection examples/trades.
// Referenced from collections.yaml#/collections/examples~1allTimeMinMaxPrice2/derivation/transform/minMax."
import { Document as MinMaxSource } from "./trades";
export { Document as MinMaxSource } from "./trades";


// Generated from derivation collections.yaml#/collections/examples~1allTimeMinMaxPrice2/derivation.
// Required to be implemented by minMax2.flow.ts.
export interface IDerivation {
    minMaxPublish(
        source: MinMaxSource,
        register: Register,
        previous: Register,
    ): Document[];
}
