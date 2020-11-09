
const simplechess = require('../');
const assert = require('assert');

const White = simplechess.White;
const Black = simplechess.Black;
const King = simplechess.King;
const Rook = simplechess.Rook;

// First test

{
    const board = simplechess.createBoard();

    board.putContent(0, 0, { color: White, piece: King });

    const game = simplechess.createGame(board);
    const moves = game.getMoves(White);

    assert.ok(moves);
    assert.equal(moves.length, 3);
}

// Blocking king

{
    const board = simplechess.createBoard();

    board.putContent(0, 0, { color: White, piece: King });

    const game = simplechess.createGame(board);
    
    board.putContent(1, 1, { color: Black, piece: Rook });
    
    const moves = game.getMoves(White);
    
    assert.ok(moves);
    assert.equal(moves.length, 3);

    const moves2 = game.getMoves(Black);
    
    assert.ok(moves2);
    assert.equal(moves2.length, 14);
}

// New board

{
    const board = simplechess.createBoard();
    const game = simplechess.createGame(board);
    
    board.putContent(3, 3, { color: Black, piece: King });
    
    const moves = game.getMoves(Black);
    
    assert.ok(moves);
    assert.equal(moves.length, 8);
    
    const moves2 = game.getMoves(White);
    
    assert.ok(moves2);
    assert.equal(moves2.length, 0);
}

