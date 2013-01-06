
var simplechess = require('../'),
    assert = require('assert');

var White = simplechess.White;
var Black = simplechess.Black;
var Rook = simplechess.Rook;

// First test

var board = simplechess.createBoard();
board.putContent(0, 0, { color: White, piece: Rook });

var game = simplechess.createGame(board);

var moves = game.getMoves(White);

assert.ok(moves);
assert.equal(moves.length, 14);

// Blocking rook

board.putContent(0, 1, { color: Black, piece: Rook });
var moves = game.getMoves(White);
assert.ok(moves);
assert.equal(moves.length, 8);

var moves = game.getMoves(Black);
assert.ok(moves);
assert.equal(moves.length, 14);

board.putContent(1, 0, { color: Black, piece: Rook });
var moves = game.getMoves(White);
assert.ok(moves);
assert.equal(moves.length, 2);

var moves = game.getMoves(Black);
assert.ok(moves);
assert.equal(moves.length, 28);

// New board

var board = simplechess.createBoard();
var game = simplechess.createGame(board);
board.putContent(3, 3, { color: Black, piece: Rook });
var moves = game.getMoves(Black);
assert.ok(moves);
assert.equal(moves.length, 14);
moves = game.getMoves(White);
assert.ok(moves);
assert.equal(moves.length, 0);