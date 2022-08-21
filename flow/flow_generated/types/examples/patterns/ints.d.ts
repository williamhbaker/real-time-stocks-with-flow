
// Generated from collection schema collections.flow.yaml?ptr=/collections/examples~1patterns~1ints/schema.
// Referenced from collections.flow.yaml#/collections/examples~1patterns~1ints.
export type Document = {
    Key: string;
    Sum?: number;
};


// Generated from derivation register schema collections.flow.yaml?ptr=/collections/examples~1patterns~1ints/derivation/register/schema.
// Referenced from collections.flow.yaml#/collections/examples~1patterns~1ints/derivation.
export type Register = number;


// Generated from self-referential transform fromInts.
// Referenced from collections.flow.yaml#/collections/examples~1patterns~1ints/derivation/transform/fromInts."
export type FromIntsSource = Document;


// Generated from derivation collections.flow.yaml#/collections/examples~1patterns~1ints/derivation.
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
