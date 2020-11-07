
const simplechess = require('../');
const assert = require('assert');

// Colors defined

{
    assert.ok(simplechess.White);
    assert.ok(simplechess.Black);
}

const White = simplechess.White;
const Black = simplechess.Black;

// Pieces defined

{
    assert.ok(simplechess.Rook);
    assert.ok(simplechess.Knight);
    assert.ok(simplechess.Bishop);
    assert.ok(simplechess.Queen);
    assert.ok(simplechess.King);
    assert.ok(simplechess.Pawn);
}
    
// create game with initial board

{
    const game = simplechess.createGame();
    assert.ok(game);

    const positions = game.getPositions();

    assert.ok(positions);
    assert.equal(positions.length, 32);

    let nwhite = 0;
    let nblack = 0;

    for (let k in positions) {
        const position = positions[k];
        
        if (position.content.color === simplechess.White)
            nwhite++;
        else if (position.content.color == simplechess.Black)
            nblack++;
    }

    assert.equal(nwhite, 16);
    assert.equal(nblack, 16);
}

// create game with empty board and put pieces

{
    const board = simplechess.createBoard();
    const game = simplechess.createGame(board);

    game.putPieces([{ x: 3, y: 3, color: White, piece: simplechess.Rook },
        { x: 4, y: 4, color: Black, piece: simplechess.Bishop }]);
        
    const positions = game.getPositions();

    assert.ok(positions);
    assert.equal(positions.length, 2);

    let nwhite = 0;
    let nblack = 0;

    for (let k in positions) {
        let position = positions[k];
        
        if (position.content.color === simplechess.White)
            nwhite++;
        else if (position.content.color == simplechess.Black)
            nblack++;
    }

    assert.equal(nwhite, 1);
    assert.equal(nblack, 1);
}

