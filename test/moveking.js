
var simplechess = require('../'),
    assert = require('assert');

var White = simplechess.White;
var Black = simplechess.Black;
var King = simplechess.King;
var Rook = simplechess.Rook;

// First test

var board = simplechess.createBoard();
board.putContent(0, 0, { color: White, piece: King });

var game = simplechess.createGame(board);

var moves = game.getMoves(White);

assert.ok(moves);
assert.equal(moves.length, 3);

// Blocking king

board.putContent(1, 1, { color: Black, piece: Rook });
var moves = game.getMoves(White);
assert.ok(moves);
assert.equal(moves.length, 3);

var moves = game.getMoves(Black);
assert.ok(moves);
assert.equal(moves.length, 14);

// New board

var board = simplechess.createBoard();
var game = simplechess.createGame(board);
board.putContent(3, 3, { color: Black, piece: King });
var moves = game.getMoves(Black);
assert.ok(moves);
assert.equal(moves.length, 8);
moves = game.getMoves(White);
assert.ok(moves);
assert.equal(moves.length, 0);

