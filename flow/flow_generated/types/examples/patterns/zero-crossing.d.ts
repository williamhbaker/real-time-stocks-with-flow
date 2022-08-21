
// Generated from collection schema zero-crossing.flow.yaml?ptr=/collections/examples~1patterns~1zero-crossing/schema.
// Referenced from zero-crossing.flow.yaml#/collections/examples~1patterns~1zero-crossing.
export type Document = /* A document that holds an integer */ {
    Int: number;
    Key: string;
};


// Generated from derivation register schema zero-crossing.flow.yaml?ptr=/collections/examples~1patterns~1zero-crossing/derivation/register/schema.
// Referenced from zero-crossing.flow.yaml#/collections/examples~1patterns~1zero-crossing/derivation.
export type Register = {
    count?: number;
    total?: number;
};


// Generated from transform fromInts as a re-export of collection examples/zs/ints.
// Referenced from zero-crossing.flow.yaml#/collections/examples~1patterns~1zero-crossing/derivation/transform/fromInts."
import { Document as FromIntsSource } from "./../zs/ints";
export { Document as FromIntsSource } from "./../zs/ints";


// Generated from derivation zero-crossing.flow.yaml#/collections/examples~1patterns~1zero-crossing/derivation.
// Required to be implemented by zero-crossing.flow.ts.
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
