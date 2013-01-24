
var simplechess = require('../'),
    assert = require('assert');

// Colors defined

assert.ok(simplechess.White);
assert.ok(simplechess.Black);

var White = simplechess.White;
var Black = simplechess.Black;

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

// create game with empty board and put pieces

var board = simplechess.createBoard();
var game = simplechess.createGame(board);

game.putPieces([{ x: 3, y: 3, color: White, piece: simplechess.Rook },
    { x: 4, y: 4, color: Black, piece: simplechess.Bishop }]);
    
var positions = game.getPositions();

assert.ok(positions);
assert.equal(positions.length, 2);

var nwhite = 0;
var nblack = 0;

for (var k in positions) {
    var position = positions[k];
    if (position.content.color === simplechess.White)
        nwhite++;
    else if (position.content.color == simplechess.Black)
        nblack++;
}

assert.equal(nwhite, 1);
assert.equal(nblack, 1);
