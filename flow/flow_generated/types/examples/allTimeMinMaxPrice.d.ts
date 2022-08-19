
// Generated from collection schema collections.flow.yaml?ptr=/collections/examples~1allTimeMinMaxPrice/schema.
// Referenced from collections.flow.yaml#/collections/examples~1allTimeMinMaxPrice.
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
};


// Generated from derivation register schema collections.flow.yaml?ptr=/collections/examples~1allTimeMinMaxPrice/derivation/register/schema.
// Referenced from collections.flow.yaml#/collections/examples~1allTimeMinMaxPrice/derivation.
export type Register = unknown;


// Generated from transform minMax as a re-export of collection examples/trades.
// Referenced from collections.flow.yaml#/collections/examples~1allTimeMinMaxPrice/derivation/transform/minMax."
import { Document as MinMaxSource } from "./trades";
export { Document as MinMaxSource } from "./trades";


// Generated from derivation collections.flow.yaml#/collections/examples~1allTimeMinMaxPrice/derivation.
// Required to be implemented by minMax.flow.ts.
export interface IDerivation {
    minMaxPublish(
        source: MinMaxSource,
        register: Register,
        previous: Register,
    ): Document[];
}
