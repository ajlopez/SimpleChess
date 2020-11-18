
const simplechess = require('../');
const assert = require('assert');

const White = simplechess.White;
const Black = simplechess.Black;
const Knight = simplechess.Knight;

// First test

{
    const board = simplechess.createBoard();

    board.putContent(0, 0, { color: White, piece: Knight });

    const game = simplechess.createGame(board);
    const moves = game.getMoves(White);

    assert.ok(moves);
    assert.equal(moves.length, 2);
}

// In the center

{
    const board = simplechess.createBoard();

    board.putContent(4, 4, { color: White, piece: Knight });

    const game = simplechess.createGame(board);
    const moves = game.getMoves(White);

    assert.ok(moves);
    assert.equal(moves.length, 8);
}

// New board

{
    const board = simplechess.createBoard();
    const game = simplechess.createGame(board);
    
    board.putContent(3, 3, { color: Black, piece: Knight });
    
    const moves = game.getMoves(Black);
    
    assert.ok(moves);
    assert.equal(moves.length, 8);
    
    const moves2 = game.getMoves(White);
    
    assert.ok(moves2);
    assert.equal(moves2.length, 0);
}

