require('regenerator-runtime/runtime');
const builtFunctions = require('./build').default;

Object.keys(builtFunctions).forEach(functionName => {
    exports[functionName] = builtFunctions[functionName];
});