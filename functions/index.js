require('regenerator-runtime/runtime');
const functions = require('firebase-functions');
const builtFunctions = require('./build');

Object.keys(builtFunctions).forEach(functionName => {
    exports[functionName] = builtFunctions[functionName];
});