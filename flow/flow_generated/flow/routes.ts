
// Document is a relaxed signature for a Flow document of any kind.
export type Document = unknown;
// Lambda is a relaxed signature implemented by all Flow transformation lambdas.
export type Lambda = (source: Document, register?: Document, previous?: Document) => Document[];

// Import derivation classes from their implementation modules.
import { Derivation as examplesAllTimeMinMaxPrice } from '../../minMax.flow';
import { Derivation as examplesAllTimeMinMaxPrice2 } from '../../minMax2.flow';

// Build instances of each class, which will be bound to this module's router.
const __examplesAllTimeMinMaxPrice: examplesAllTimeMinMaxPrice = new examplesAllTimeMinMaxPrice();
const __examplesAllTimeMinMaxPrice2: examplesAllTimeMinMaxPrice2 = new examplesAllTimeMinMaxPrice2();

// Now build the router that's used for transformation lambda dispatch.
const routes: { [path: string]: Lambda | undefined } = {
    '/derive/examples/allTimeMinMaxPrice/minMax/Publish': __examplesAllTimeMinMaxPrice.minMaxPublish.bind(
        __examplesAllTimeMinMaxPrice,
    ) as Lambda,
    '/derive/examples/allTimeMinMaxPrice2/minMax/Publish': __examplesAllTimeMinMaxPrice2.minMaxPublish.bind(
        __examplesAllTimeMinMaxPrice2,
    ) as Lambda,
};

export { routes };
