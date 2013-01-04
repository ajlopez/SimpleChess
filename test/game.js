
var simplechess = require('../'),
    assert = require('assert');

// Colors defined

assert.ok(simplechess.White);
assert.ok(simplechess.Black);

// Pieces defined

assert.ok(simplechess.Rook);
assert.ok(simplechess.Knight);
assert.ok(simplechess.Bishop);
assert.ok(simplechess.Queen);
assert.ok(simplechess.King);
assert.ok(simplechess.Pawn);
    
// create game with initial board

var game = simplechess.createGame();
assert.ok(game);

var positions = game.getPositions();

assert.ok(positions);
assert.equal(positions.length, 32);

var nwhite = 0;
var nblack = 0;

for (var k in positions) {
    var position = positions[k];
    if (position.content.color === simplechess.White)
        nwhite++;
    else if (position.content.color == simplechess.Black)
        nblack++;
}

assert.equal(nwhite, 16);
assert.equal(nblack, 16);

