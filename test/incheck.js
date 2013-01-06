
var simplechess = require('../'),
    assert = require('assert');

var White = simplechess.White;
var Black = simplechess.Black;
var King = simplechess.King;
var Rook = simplechess.Rook;
var Bishop = simplechess.Bishop;

// No check in empty board

var board = simplechess.createBoard();
var game = simplechess.createGame(board);

assert.equal(game.inCheck(White), false);
assert.equal(game.inCheck(Black), false);

// No check in only king is present

var board = simplechess.createBoard();
board.putContent(3, 3, { color: White, piece: King });
var game = simplechess.createGame(board);

assert.equal(game.inCheck(White), false);
assert.equal(game.inCheck(Black), false);

// Check if Rook attacks

var board = simplechess.createBoard();
board.putContent(3, 3, { color: White, piece: King });
board.putContent(3, 7, { color: Black, piece: Rook });
var game = simplechess.createGame(board);

assert.equal(game.inCheck(White), true);
assert.equal(game.inCheck(Black), false);

board.removeContent(3, 7);
board.putContent(3, 0, { color: Black, piece: Rook });
var game = simplechess.createGame(board);

assert.equal(game.inCheck(White), true);
assert.equal(game.inCheck(Black), false);

board.removeContent(3, 0);
board.putContent(0, 3, { color: Black, piece: Rook });
var game = simplechess.createGame(board);

assert.equal(game.inCheck(White), true);
assert.equal(game.inCheck(Black), false);

board.removeContent(0, 3);
board.putContent(7, 3, { color: Black, piece: Rook });
var game = simplechess.createGame(board);

assert.equal(game.inCheck(White), true);
assert.equal(game.inCheck(Black), false);


// Check if Bishop attacks

var board = simplechess.createBoard();
board.putContent(3, 3, { color: White, piece: King });
board.putContent(1, 1, { color: Black, piece: Bishop });
var game = simplechess.createGame(board);

assert.equal(game.inCheck(White), true);
assert.equal(game.inCheck(Black), false);

board.removeContent(1, 1);
board.putContent(7, 7, { color: Black, piece: Bishop });
var game = simplechess.createGame(board);

assert.equal(game.inCheck(White), true);
assert.equal(game.inCheck(Black), false);

board.removeContent(7, 7);
board.putContent(1, 5, { color: Black, piece: Bishop });
var game = simplechess.createGame(board);

assert.equal(game.inCheck(White), true);
assert.equal(game.inCheck(Black), false);

board.removeContent(1, 5);
board.putContent(5, 1, { color: Black, piece: Bishop });
var game = simplechess.createGame(board);

assert.equal(game.inCheck(White), true);
assert.equal(game.inCheck(Black), false);


