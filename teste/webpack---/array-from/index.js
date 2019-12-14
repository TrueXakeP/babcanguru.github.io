module.exports = (typeof Array.from === 'function' ?
    Array.from :
    require('./polyfill')
);



//////////////////
// WEBPACK FOOTER
// ./~/array-from/index.js
// module id = 50
// module chunks = 0