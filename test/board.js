
var simplechess = require('../'),
    assert = require('assert');
    
// create board

var board = simplechess.createBoard();
assert.ok(board);
assert.equal(board.getWidth(), 8);
assert.equal(board.getHeight(), 8);

var positions = board.getPositions();

assert.ok(positions);
assert.equal(positions.length, 0);
