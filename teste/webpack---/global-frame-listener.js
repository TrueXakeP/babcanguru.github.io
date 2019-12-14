/* global window */
'use strict';
const dataCapsuleTools = require('./frame-listener');

if (typeof window !== 'undefined') {
    window.DataCapsuleTools = dataCapsuleTools;
}

module.exports = dataCapsuleTools;



// WEBPACK FOOTER //
// ./global-frame-listener.js