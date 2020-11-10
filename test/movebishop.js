
const simplechess = require('../');
const assert = require('assert');

const White = simplechess.White;
const Black = simplechess.Black;
const Bishop = simplechess.Bishop;

// First test

{
    const board = simplechess.createBoard();

    board.putContent(0, 0, { color: White, piece: Bishop });

    const game = simplechess.createGame(board);
    const moves = game.getMoves(White);

    assert.ok(moves);
    assert.equal(moves.length, 7);
}

// Blocking bishop

{
    const board = simplechess.createBoard();

    board.putContent(0, 0, { color: White, piece: Bishop });
    board.putContent(1, 1, { color: Black, piece: Bishop });
    
    const game = simplechess.createGame(board);
    const moves = game.getMoves(White);

    assert.ok(moves);
    assert.equal(moves.length, 1);

    const moves2 = game.getMoves(Black);

    assert.ok(moves2);
    assert.equal(moves2.length, 9);
}

// New board

{
    const board = simplechess.createBoard();
    const game = simplechess.createGame(board);
    
    board.putContent(3, 3, { color: Black, piece: Bishop });
    
    const moves = game.getMoves(Black);
    
    assert.ok(moves);
    assert.equal(moves.length, 13);
    
    const moves2 = game.getMoves(White);
    
    assert.ok(moves2);
    assert.equal(moves2.length, 0);
}

