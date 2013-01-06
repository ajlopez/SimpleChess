
var simplechess = require('../'),
    assert = require('assert');

var White = simplechess.White;
var Black = simplechess.Black;
var Pawn = simplechess.Pawn;

// First test

var board = simplechess.createBoard();
board.putContent(0, 3, { color: White, piece: Pawn });

var game = simplechess.createGame(board);

var moves = game.getMoves(White);

assert.ok(moves);
assert.equal(moves.length, 1);

// White at start position

var board = simplechess.createBoard();
var game = simplechess.createGame(board);
board.putContent(1, 1, { color: White, piece: Pawn });
var moves = game.getMoves(White);
assert.ok(moves);
assert.equal(moves.length, 2);

// Black at start position

var board = simplechess.createBoard();
var game = simplechess.createGame(board);
board.putContent(1, 6, { color: Black, piece: Pawn });
var moves = game.getMoves(Black);
assert.ok(moves);
assert.equal(moves.length, 2);

// White capture

var board = simplechess.createBoard();
var game = simplechess.createGame(board);
board.putContent(3, 3, { color: White, piece: Pawn });
board.putContent(4, 4, { color: Black, piece: Pawn });
board.putContent(2, 4, { color: Black, piece: Pawn });
var moves = game.getMoves(White);
assert.ok(moves);
assert.equal(moves.length, 3);

// Black capture

var board = simplechess.createBoard();
var game = simplechess.createGame(board);
board.putContent(3, 4, { color: Black, piece: Pawn });
board.putContent(4, 3, { color: White, piece: Pawn });
board.putContent(2, 3, { color: White, piece: Pawn });
var moves = game.getMoves(Black);
assert.ok(moves);
assert.equal(moves.length, 3);