
var simplechess = require('../'),
    assert = require('assert');

var White = simplechess.White;
var Black = simplechess.Black;
var King = simplechess.King;
var Queen = simplechess.Queen;
var Rook = simplechess.Rook;
var Bishop = simplechess.Bishop;
var Knight = simplechess.Knight;
var Pawn = simplechess.Pawn;

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

// Check if King at position x y, and it is attackbed by piece 

function checkInCheck(piece, x, y) {
    var board = simplechess.createBoard();
    var game = simplechess.createGame(board);

    var moves = game.getPieceMoves(Black, Knight, x, y);

    assert.ok(moves);
    assert.ok(moves.length > 0);

    moves.forEach(function(move) {
        board = simplechess.createBoard();
        board.putContent(x, y, { color: White, piece: King });
        board.putContent(move.x2, move.y2, { color: Black, piece: Knight });
        game = simplechess.createGame(board);
        assert.equal(game.inCheck(White), true);
        assert.equal(game.inCheck(Black), false);
    });
}

checkInCheck(Knight, 3, 3);
checkInCheck(Bishop, 3, 3);
checkInCheck(Rook, 3, 3);
checkInCheck(Queen, 3, 3);

// Check if King at position x y, and it is not attackbed by misplaced piece 

function checkNotInCheck(piece, x, y) {
    var board = simplechess.createBoard();
    var game = simplechess.createGame(board);

    var moves = game.getPieceMoves(Black, Knight, x, y);

    assert.ok(moves);
    assert.ok(moves.length > 0);

    moves.forEach(function(move) {
        board = simplechess.createBoard();
        var width = board.getWidth();
        board.putContent(x, y, { color: White, piece: King });
        var x2 = move.x2 + 1;
        if (x2 >= width)
            x2 = 0;
        board.putContent(x2, move.y2, { color: Black, piece: Knight });
        game = simplechess.createGame(board);
        assert.equal(game.inCheck(White), false);
        assert.equal(game.inCheck(Black), false);
    });
}

checkNotInCheck(Knight, 3, 3);
checkNotInCheck(Bishop, 3, 3);
checkNotInCheck(Rook, 3, 3);

// Pawn attack

var board = simplechess.createBoard();
board.putContent(3, 3, { color: White, piece: King });
board.putContent(2, 4, { color: Black, piece: Pawn });
var game = simplechess.createGame(board);

assert.equal(game.inCheck(White), true);
assert.equal(game.inCheck(Black), false);

var board = simplechess.createBoard();
board.putContent(3, 3, { color: White, piece: King });
board.putContent(4, 4, { color: Black, piece: Pawn });
var game = simplechess.createGame(board);

assert.equal(game.inCheck(White), true);
assert.equal(game.inCheck(Black), false);

