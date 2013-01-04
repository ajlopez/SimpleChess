
'use strict';

if (typeof simpleboard === 'undefined')
    var simpleboard = require('simpleboard');

var simplechess = (function () {
    var Color = { White: 1, Black: 2 };
    var Piece = { King: 1, Queen: 2, Rook: 3, Bishop: 4, Knight: 5, Pawn: 6 };

    function Game(board) {
        if (!board)
            board = getInitialBoard();

        this.getPositions = function () {
            return board.getPositions();
        };

        this.getSquare = function (x, y) {
            return board.getContent(x, y);
        };
    }

    function getInitialBoard() {
        var board = simpleboard.createBoard(8, 8);

        putSymmetricPiece(board, 0, 0, Piece.Rook);
        putSymmetricPiece(board, 1, 0, Piece.Knight);
        putSymmetricPiece(board, 2, 0, Piece.Bishop);

        for (var k = 0; k < 4; k++)
            putSymmetricPiece(board, k, 1, Piece.Pawn);

        board.putContent(3, 0, { color: Color.White, piece: Piece.Queen });
        board.putContent(4, 0, { color: Color.White, piece: Piece.King });
        board.putContent(3, 7, { color: Color.Black, piece: Piece.Queen });
        board.putContent(4, 7, { color: Color.Black, piece: Piece.King });

        return board;
    }

    function putSymmetricPiece(board, x, y, piece) {
        board.putContent(x, y, { color: Color.White, piece: piece });
        board.putContent(8-x-1, y, { color: Color.White, piece: piece });        
        board.putContent(x, 8-y-1, { color: Color.Black, piece: piece });
        board.putContent(8-x-1, 8-y-1, { color: Color.Black, piece: piece });        
    }

    function createBoard() {
        return simpleboard.createBoard(8, 8);
    }

    var result = {
        createBoard: createBoard,
        createGame: function (board) {
            return new Game(board);
        }
    };

    for (var n in Color)
        result[n] = Color[n];
    for (var n in Piece)
        result[n] = Piece[n];

    return result;
})();

if (typeof window === 'undefined') {
	module.exports = simplechess;
}
