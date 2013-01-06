
var simplechess = require('../'),
    assert = require('assert');

var White = simplechess.White;
var Black = simplechess.Black;
var Queen = simplechess.Queen;

// First test

var board = simplechess.createBoard();
board.putContent(0, 0, { color: White, piece: Queen });

var game = simplechess.createGame(board);

var moves = game.getMoves(White);

assert.ok(moves);
assert.equal(moves.length, 21);

// Blocking queen

board.putContent(1, 1, { color: Black, piece: Queen });
var moves = game.getMoves(White);
assert.ok(moves);
assert.equal(moves.length, 15);

var moves = game.getMoves(Black);
assert.ok(moves);
assert.equal(moves.length, 23);

// New board

var board = simplechess.createBoard();
var game = simplechess.createGame(board);
board.putContent(3, 3, { color: Black, piece: Queen });
var moves = game.getMoves(Black);
assert.ok(moves);
assert.equal(moves.length, 27);
moves = game.getMoves(White);
assert.ok(moves);
assert.equal(moves.length, 0);

