
const simplechess = require('../');
const   assert = require('assert');
    
// create board

{
    const board = simplechess.createBoard();
    
    assert.ok(board);
    assert.equal(board.getWidth(), 8);
    assert.equal(board.getHeight(), 8);

    const positions = board.getPositions();

    assert.ok(positions);
    assert.equal(positions.length, 0);
}