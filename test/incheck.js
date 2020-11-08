
const simplechess = require('../');
const    assert = require('assert');

const White = simplechess.White;
const Black = simplechess.Black;
const King = simplechess.King;
const Queen = simplechess.Queen;
const Rook = simplechess.Rook;
const Bishop = simplechess.Bishop;
const Knight = simplechess.Knight;
const Pawn = simplechess.Pawn;

// No check in empty board

{
    const board = simplechess.createBoard();
    const game = simplechess.createGame(board);

    assert.equal(game.inCheck(White), false);
    assert.equal(game.inCheck(Black), false);
}

// No check in only king is present

{
    const board = simplechess.createBoard();
    
    board.putContent(3, 3, { color: White, piece: King });
    
    const game = simplechess.createGame(board);

    assert.equal(game.inCheck(White), false);
    assert.equal(game.inCheck(Black), false);
}

// Check if King at position x y, and it is attackbed by piece 

function checkInCheck(piece, x, y) {
    let board = simplechess.createBoard();
    let game = simplechess.createGame(board);

    const moves = game.getPieceMoves(Black, Knight, x, y);

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

{
    checkInCheck(Knight, 3, 3);
    checkInCheck(Bishop, 3, 3);
    checkInCheck(Rook, 3, 3);
    checkInCheck(Queen, 3, 3);
}

// Check if King at position x y, and it is not attackbed by misplaced piece 

function checkNotInCheck(piece, x, y) {
    let board = simplechess.createBoard();
    let game = simplechess.createGame(board);

    const moves = game.getPieceMoves(Black, Knight, x, y);

    assert.ok(moves);
    assert.ok(moves.length > 0);

    moves.forEach(function(move) {
        board = simplechess.createBoard();
        const width = board.getWidth();
        board.putContent(x, y, { color: White, piece: King });
        const x2 = move.x2 + 1;
        if (x2 >= width)
            x2 = 0;
        board.putContent(x2, move.y2, { color: Black, piece: Knight });
        game = simplechess.createGame(board);
        assert.equal(game.inCheck(White), false);
        assert.equal(game.inCheck(Black), false);
    });
}

{
    checkNotInCheck(Knight, 3, 3);
    checkNotInCheck(Bishop, 3, 3);
    checkNotInCheck(Rook, 3, 3);
}

// Pawn attack

{
    const board = simplechess.createBoard();
    board.putContent(3, 3, { color: White, piece: King });
    board.putContent(2, 4, { color: Black, piece: Pawn });
    const game = simplechess.createGame(board);

    assert.equal(game.inCheck(White), true);
    assert.equal(game.inCheck(Black), false);
}

{
    const board = simplechess.createBoard();
    board.putContent(3, 3, { color: White, piece: King });
    board.putContent(4, 4, { color: Black, piece: Pawn });
    const game = simplechess.createGame(board);

    assert.equal(game.inCheck(White), true);
    assert.equal(game.inCheck(Black), false);
}
