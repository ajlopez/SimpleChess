
'use strict';

if (typeof simpleboard === 'undefined')
    var simpleboard = require('simpleboard');

var simplego = (function () {
    return {
        createBoard: function () {
            return simpleboard.createBoard(8, 8);
        }
    };
})();

if (typeof window === 'undefined') {
	module.exports = simplego;
}
