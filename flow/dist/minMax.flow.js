"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Derivation = void 0;
// Implementation for derivation collections.yaml#/collections/examples~1allTimeMinMaxPrice/derivation.
class Derivation {
    minMaxPublish(source, _register, _previous) {
        return [{ ID: source.ID, Symbol: source.Symbol, minPrice: source.Price, maxPrice: source.Price }];
    }
}
exports.Derivation = Derivation;
//# sourceMappingURL=minMax.flow.js.map