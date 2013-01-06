
var simplechess = require('../'),
    assert = require('assert');

var White = simplechess.White;
var Black = simplechess.Black;
var Rook = simplechess.Rook;

var board = simplechess.createBoard();
board.putContent(0, 0, { color: White, piece: Rook });

var game = simplechess.createGame(board);

var moves = game.getMoves(White);

assert.ok(moves);
assert.equal(moves.length, 14);
