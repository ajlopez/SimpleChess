
var simplechess = require('../'),
    assert = require('assert');

var White = simplechess.White;
var Black = simplechess.Black;
var Bishop = simplechess.Bishop;

// First test

var board = simplechess.createBoard();
board.putContent(0, 0, { color: White, piece: Bishop });

var game = simplechess.createGame(board);

var moves = game.getMoves(White);

assert.ok(moves);
assert.equal(moves.length, 7);

// Blocking rook

board.putContent(1, 1, { color: Black, piece: Bishop });
var moves = game.getMoves(White);
assert.ok(moves);
assert.equal(moves.length, 1);

var moves = game.getMoves(Black);
assert.ok(moves);
assert.equal(moves.length, 9);

// New board

var board = simplechess.createBoard();
var game = simplechess.createGame(board);
board.putContent(3, 3, { color: Black, piece: Bishop });
var moves = game.getMoves(Black);
assert.ok(moves);
assert.equal(moves.length, 13);
moves = game.getMoves(White);
assert.ok(moves);
assert.equal(moves.length, 0);

