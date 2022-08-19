"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
// Import derivation classes from their implementation modules.
const minMax_flow_1 = require("../../minMax.flow");
// Build instances of each class, which will be bound to this module's router.
const __examplesAllTimeMinMaxPrice = new minMax_flow_1.Derivation();
// Now build the router that's used for transformation lambda dispatch.
const routes = {
    '/derive/examples/allTimeMinMaxPrice/minMax/Publish': __examplesAllTimeMinMaxPrice.minMaxPublish.bind(__examplesAllTimeMinMaxPrice),
};
exports.routes = routes;
//# sourceMappingURL=routes.js.map