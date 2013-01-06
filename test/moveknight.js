
var simplechess = require('../'),
    assert = require('assert');

var White = simplechess.White;
var Black = simplechess.Black;
var Knight = simplechess.Knight;

// First test

var board = simplechess.createBoard();
board.putContent(0, 0, { color: White, piece: Knight });

var game = simplechess.createGame(board);

var moves = game.getMoves(White);

assert.ok(moves);
assert.equal(moves.length, 2);

// New board

var board = simplechess.createBoard();
var game = simplechess.createGame(board);
board.putContent(3, 3, { color: Black, piece: Knight });
var moves = game.getMoves(Black);
assert.ok(moves);
assert.equal(moves.length, 8);
moves = game.getMoves(White);
assert.ok(moves);
assert.equal(moves.length, 0);

