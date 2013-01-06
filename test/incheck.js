
var simplechess = require('../'),
    assert = require('assert');

var White = simplechess.White;
var Black = simplechess.Black;

// No check in empty board

var board = simplechess.createBoard();
var game = simplechess.createGame(board);

assert.equal(game.inCheck(White), false);
assert.equal(game.inCheck(Black), false);

