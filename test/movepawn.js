
const simplechess = require('../');
const assert = require('assert');

const White = simplechess.White;
const Black = simplechess.Black;
const Pawn = simplechess.Pawn;

// First test white

{
    const board = simplechess.createBoard();
    board.putContent(0, 3, { color: White, piece: Pawn });

    const game = simplechess.createGame(board);

    const moves = game.getMoves(White);

    assert.ok(moves);
    assert.equal(moves.length, 1);
}

// First test black

{
    const board = simplechess.createBoard();
    board.putContent(0, 4, { color: Black, piece: Pawn });

    const game = simplechess.createGame(board);

    const moves = game.getMoves(Black);

    assert.ok(moves);
    assert.equal(moves.length, 1);
}

// Blocked

{
    const board = simplechess.createBoard();
    board.putContent(0, 3, { color: White, piece: Pawn });
    board.putContent(0, 4, { color: Black, piece: Pawn });

    const game = simplechess.createGame(board);

    const moves = game.getMoves(White);

    assert.ok(moves);
    assert.equal(moves.length, 0);
}

// Blocked piece same color

{
    const board = simplechess.createBoard();
    board.putContent(0, 3, { color: White, piece: Pawn });
    board.putContent(0, 4, { color: White, piece: Pawn });
    board.putContent(0, 5, { color: Black, piece: Pawn });

    const game = simplechess.createGame(board);

    const moves = game.getMoves(White);

    assert.ok(moves);
    assert.equal(moves.length, 0);
}

// White at start position

{
    const board = simplechess.createBoard();
    const game = simplechess.createGame(board);
    
    board.putContent(1, 1, { color: White, piece: Pawn });
    
    const moves = game.getMoves(White);
    
    assert.ok(moves);
    assert.equal(moves.length, 2);
}

// White at start position partial blocking

{
    const board = simplechess.createBoard();
    const game = simplechess.createGame(board);
    
    board.putContent(1, 1, { color: White, piece: Pawn });
    board.putContent(1, 3, { color: Black, piece: Pawn });
    
    const moves = game.getMoves(White);
    
    assert.ok(moves);
    assert.equal(moves.length, 1);
}

// Black at start position

{
    const board = simplechess.createBoard();
    const game = simplechess.createGame(board);
    
    board.putContent(1, 6, { color: Black, piece: Pawn });
    
    const moves = game.getMoves(Black);
    
    assert.ok(moves);
    assert.equal(moves.length, 2);
}

// White capture

{
    const board = simplechess.createBoard();
    const game = simplechess.createGame(board);
    
    board.putContent(3, 3, { color: White, piece: Pawn });
    board.putContent(4, 4, { color: Black, piece: Pawn });
    board.putContent(2, 4, { color: Black, piece: Pawn });
    
    const moves = game.getMoves(White);
    
    assert.ok(moves);
    assert.equal(moves.length, 3);
}

// White capture with blocking

{
    const board = simplechess.createBoard();
    const game = simplechess.createGame(board);
    
    board.putContent(3, 3, { color: White, piece: Pawn });
    board.putContent(3, 4, { color: White, piece: Pawn });
    board.putContent(3, 5, { color: Black, piece: Pawn });
    board.putContent(4, 4, { color: Black, piece: Pawn });
    board.putContent(2, 4, { color: Black, piece: Pawn });
    
    const moves = game.getMoves(White);
    
    assert.ok(moves);
    assert.equal(moves.length, 2);
}

// Black capture

{
    const board = simplechess.createBoard();
    const game = simplechess.createGame(board);
    
    board.putContent(3, 4, { color: Black, piece: Pawn });
    board.putContent(4, 3, { color: White, piece: Pawn });
    board.putContent(2, 3, { color: White, piece: Pawn });
    
    const moves = game.getMoves(Black);
    
    assert.ok(moves);
    assert.equal(moves.length, 3);
}

