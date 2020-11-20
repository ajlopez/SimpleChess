
const simplechess = require('../');
const assert = require('assert');

const White = simplechess.White;
const Black = simplechess.Black;
const Queen = simplechess.Queen;
const Pawn = simplechess.Pawn;

// First test

{
    const board = simplechess.createBoard();
    
    board.putContent(0, 0, { color: White, piece: Queen });

    const game = simplechess.createGame(board);
    const moves = game.getMoves(White);

    assert.ok(moves);
    assert.equal(moves.length, 21);
}

// Queen at center

{
    const board = simplechess.createBoard();
    
    board.putContent(4, 4, { color: White, piece: Queen });

    const game = simplechess.createGame(board);
    const moves = game.getMoves(White);

    assert.ok(moves);
    assert.equal(moves.length, 27);
}

// Blocking queen
{
    const board = simplechess.createBoard();
    
    board.putContent(0, 0, { color: White, piece: Queen });
    board.putContent(1, 1, { color: Black, piece: Queen });

    const game = simplechess.createGame(board);
    const moves = game.getMoves(White);

    assert.ok(moves);
    assert.equal(moves.length, 15);

    const moves2 = game.getMoves(Black);

    assert.ok(moves2);
    assert.equal(moves2.length, 23);
}

// Blocking queen with same color piece
{
    const board = simplechess.createBoard();
    
    board.putContent(0, 0, { color: White, piece: Queen });
    board.putContent(1, 1, { color: White, piece: Pawn });

    const game = simplechess.createGame(board);
    const moves = game.getMoves(White);

    assert.ok(moves);
    assert.equal(moves.length, 16);

    const moves2 = game.getMoves(Black);

    assert.ok(moves2);
    assert.equal(moves2.length, 0);
}

// New board

{
    const board = simplechess.createBoard();
    const game = simplechess.createGame(board);
    
    board.putContent(3, 3, { color: Black, piece: Queen });
    
    const moves = game.getMoves(Black);
    
    assert.ok(moves);
    assert.equal(moves.length, 27);
    
    const moves2 = game.getMoves(White);
    
    assert.ok(moves2);
    assert.equal(moves2.length, 0);
}

