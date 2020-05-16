require('regenerator-runtime/runtime');
const admin = require('firebase-admin');
const builtFunctions = require('./build').default;

admin.initializeApp();

Object.keys(builtFunctions).forEach(functionName => {
    exports[functionName] = builtFunctions[functionName];
});