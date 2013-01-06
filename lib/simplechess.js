
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

        this.getBoard = function () { return board; }
    }

    Game.prototype.getMoves = function (color) {
        var positions = this.getPositions();
        var n = positions.length;
        var moves = [];
        var board = this.getBoard();

        for (var k = 0; k < n; k++) {
            var position = positions[k];
            if (position.content.color === color)
                moves = moves.concat(getPieceMoves(board, position));
        }

        return moves;
    };

    function getPieceMoves(board, position) {
        if (position.content.piece === Piece.Rook)
            return getRookMoves(board, position.x, position.y, position.content.color);
        if (position.content.piece === Piece.Bishop)
            return getBishopMoves(board, position.x, position.y, position.content.color);
    }

    function getRookMoves(board, x, y, color) {
        var moves = [];
        var width = board.getWidth();
        var height = board.getHeight();

        for (var k = x + 1; k < width; k++)
            if (!addMove(board, moves, x, y, k, y, color))
                break;

        for (var k = x - 1; k >= 0; k--)
            if (!addMove(board, moves, x, y, k, y, color))
                break;

        for (var k = y + 1; k < height; k++)
            if (!addMove(board, moves, x, y, x, k, color))
                break;

        for (var k = y - 1; k >= 0; k--)
            if (!addMove(board, moves, x, y, x, k, color))
                break;

        return moves;
    }

    function getBishopMoves(board, x, y, color) {
        var moves = [];
        var width = board.getWidth();
        var height = board.getHeight();

        for (var k = 1; x + k < width && y + k < height; k++)
            if (!addMove(board, moves, x, y, x + k, y + k, color))
                break;

        for (var k = 1; x - k >= 0 && y - k >= 0; k++)
            if (!addMove(board, moves, x, y, x - k, y - k, color))
                break;

        for (var k = 1; x + k < width && y - k >= 0; k++)
            if (!addMove(board, moves, x, y, x + k, y - k, color))
                break;

        for (var k = 1; x - k >= 0 && y + k < height; k++)
            if (!addMove(board, moves, x, y, x - k, y + k, color))
                break;

        return moves;
    }

    function addMove(board, moves, x1, y1, x2, y2, color) {
        var content = board.getContent(x2, y2);

        if (content === null) {
            moves.push({ x1: x1, y1: y1, x2: x2, y2: y2 });
            return true;
        }

        if (content.color === color)
            return false;

        moves.push({ x1: x1, y1: y1, x2: x2, y2: y2 });
        return false;
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
