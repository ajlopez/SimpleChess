
const simplechess = require('../');
const assert = require('assert');

const White = simplechess.White;
const Black = simplechess.Black;
const Rook = simplechess.Rook;

// First test
{
    const board = simplechess.createBoard();
    
    board.putContent(0, 0, { color: White, piece: Rook });

    const game = simplechess.createGame(board);
    const moves = game.getMoves(White);

    assert.ok(moves);
    assert.equal(moves.length, 14);
}

// Blocking rook

{
    const board = simplechess.createBoard();
    
    board.putContent(0, 0, { color: White, piece: Rook });
    board.putContent(0, 1, { color: Black, piece: Rook });

    const game = simplechess.createGame(board);
    
    const moves = game.getMoves(White);
    
    assert.ok(moves);
    assert.equal(moves.length, 8);

    const moves2 = game.getMoves(Black);
    
    assert.ok(moves2);
    assert.equal(moves2.length, 14);

    board.putContent(1, 0, { color: Black, piece: Rook });
    
    const moves3 = game.getMoves(White);
    
    assert.ok(moves3);
    assert.equal(moves3.length, 2);

    const moves4 = game.getMoves(Black);
    
    assert.ok(moves4);
    assert.equal(moves4.length, 28);
}

// Blocking rook using same color

{
    const board = simplechess.createBoard();
    
    board.putContent(0, 0, { color: White, piece: Rook });
    board.putContent(0, 1, { color: White, piece: Rook });

    const game = simplechess.createGame(board);
    
    const moves = game.getMoves(White);
    
    assert.ok(moves);
    assert.equal(moves.length, 20);

    const moves2 = game.getMoves(Black);
    
    assert.ok(moves2);
    assert.equal(moves2.length, 0);
}

// Single rook at center

{
    const board = simplechess.createBoard();
    
    board.putContent(4, 4, { color: White, piece: Rook });

    const game = simplechess.createGame(board);
    
    const moves = game.getMoves(White);
    
    assert.ok(moves);
    assert.equal(moves.length, 14);

    const moves2 = game.getMoves(Black);
    
    assert.ok(moves2);
    assert.equal(moves2.length, 0);
}

// New board
{
    const board = simplechess.createBoard();
    const game = simplechess.createGame(board);
    
    board.putContent(3, 3, { color: Black, piece: Rook });
    
    const moves = game.getMoves(Black);
    
    assert.ok(moves);
    assert.equal(moves.length, 14);
    
    const moves2 = game.getMoves(White);
    
    assert.ok(moves2);
    assert.equal(moves2.length, 0);
}

