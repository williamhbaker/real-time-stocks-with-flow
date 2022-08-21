
// Document is a relaxed signature for a Flow document of any kind.
export type Document = unknown;
// Lambda is a relaxed signature implemented by all Flow transformation lambdas.
export type Lambda = (source: Document, register?: Document, previous?: Document) => Document[];

// Import derivation classes from their implementation modules.
import { Derivation as examplesAllTimeMinMaxPrice } from '../../minMax.flow';
import { Derivation as examplesMeanReversion } from '../../meanReversion.flow';

// Build instances of each class, which will be bound to this module's router.
const __examplesAllTimeMinMaxPrice: examplesAllTimeMinMaxPrice = new examplesAllTimeMinMaxPrice();
const __examplesMeanReversion: examplesMeanReversion = new examplesMeanReversion();

// Now build the router that's used for transformation lambda dispatch.
const routes: { [path: string]: Lambda | undefined } = {
    '/derive/examples/allTimeMinMaxPrice/minMax/Publish': __examplesAllTimeMinMaxPrice.minMaxPublish.bind(
        __examplesAllTimeMinMaxPrice,
    ) as Lambda,
    '/derive/examples/meanReversion/meanReversion/Update': __examplesMeanReversion.meanReversionUpdate.bind(
        __examplesMeanReversion,
    ) as Lambda,
    '/derive/examples/meanReversion/meanReversion/Publish': __examplesMeanReversion.meanReversionPublish.bind(
        __examplesMeanReversion,
    ) as Lambda,
};

export { routes };
