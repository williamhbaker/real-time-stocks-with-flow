
// Generated from collection schema summer.flow.yaml?ptr=/collections/examples~1sums-register/schema.
// Referenced from summer.flow.yaml#/collections/examples~1sums-register.
export type Document = {
    Key: string;
    Sum?: number;
};


// Generated from derivation register schema summer.flow.yaml?ptr=/collections/examples~1sums-register/derivation/register/schema.
// Referenced from summer.flow.yaml#/collections/examples~1sums-register/derivation.
export type Register = number;


// Generated from transform fromInts as a re-export of collection examples/ints.
// Referenced from summer.flow.yaml#/collections/examples~1sums-register/derivation/transform/fromInts."
import { Document as FromIntsSource } from "./ints";
export { Document as FromIntsSource } from "./ints";


// Generated from derivation summer.flow.yaml#/collections/examples~1sums-register/derivation.
// Required to be implemented by summer-reg.flow.ts.
export interface IDerivation {
    fromIntsUpdate(
        source: FromIntsSource,
    ): Register[];
    fromIntsPublish(
        source: FromIntsSource,
        register: Register,
        previous: Register,
    ): Document[];
}
