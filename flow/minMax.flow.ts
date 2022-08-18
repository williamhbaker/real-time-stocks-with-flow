import { IDerivation, Document, Register, MinMaxSource } from 'flow/examples/allTimeMinMaxPrice';

// Implementation for derivation collections.yaml#/collections/examples~1allTimeMinMaxPrice/derivation.
export class Derivation implements IDerivation {
    minMaxPublish(source: MinMaxSource, _register: Register, _previous: Register): Document[] {
        return [{ ID: source.ID, Symbol: source.Symbol, minPrice: source.Price, maxPrice: source.Price }];
    }
}
