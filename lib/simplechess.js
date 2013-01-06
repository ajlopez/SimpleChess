
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

        this.getMoves = function (color) {
            var positions = this.getPositions();
            var n = positions.length;
            var moves = [];

            for (var k = 0; k < n; k++) {
                var position = positions[k];
                if (position.content.color === color)
                    moves = moves.concat(getPieceMoves(board, position));
            }

            return moves;
        }
    }

    function getPieceMoves(board, position) {
        if (position.content.piece === Piece.Rook)
            return getRookMoves(board, position.x, position.y, position.content.color);
        if (position.content.piece === Piece.Bishop)
            return getBishopMoves(board, position.x, position.y, position.content.color);
        if (position.content.piece === Piece.Queen)
            return getQueenMoves(board, position.x, position.y, position.content.color);
        if (position.content.piece === Piece.King)
            return getKingMoves(board, position.x, position.y, position.content.color);
        if (position.content.piece === Piece.Knight)
            return getKnightMoves(board, position.x, position.y, position.content.color);
        if (position.content.piece === Piece.Pawn)
            return getPawnMoves(board, position.x, position.y, position.content.color);
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

    function getQueenMoves(board, x, y, color) {
        return getBishopMoves(board, x, y, color).concat(getRookMoves(board, x, y, color));
    }

    function getKingMoves(board, x, y, color) {
        var moves = [];
        var width = board.getWidth();
        var height = board.getHeight();

        for (var k = -1; k <= 1; k++)
            for (var j = -1; j <= 1; j++)
                if ((k || j) && x + k >= 0 && x + k < width && y + j >= 0 && y + j < height)
                    moves.push({ x1: x, y1: y, x2: x + k, y2: y + j });

        return moves;
    }

    function getPawnMoves(board, x, y, color) {
        var moves = [];
        var width = board.getWidth();
        var height = board.getHeight();
        var deltay = color === Color.White ? 1 : -1;
        var y2 = y + deltay;

        if (y2 >= height || y2 < 0)
            return moves;

        if (board.getContent(x, y2) === null) {
            moves.push({ x1: x, y1: y, x2: x, y2: y2 });
            if ((color === Color.White && y === 1) || (color === Color.Black && y === height - 2)) {
                var y3 = y2 + deltay;
                if (board.getContent(x, y3) === null)
                    moves.push({ x1: x, y1: y, x2: x, y2: y3 });
            }
        }

        var content;

        if (x - 1 >= 0) {
            content = board.getContent(x - 1, y2);
            if (content !== null && content.color !== color)
                moves.push({ x1: x, y1: y, x2: x - 1, y2: y2 });
        }

        if (x + 1 < width) {
            content = board.getContent(x + 1, y2);
            if (content !== null && content.color !== color)
                moves.push({ x1: x, y1: y, x2: x + 1, y2: y2 });
        }

        return moves;
    }

    function getKnightMoves(board, x, y, color) {
        var moves = [];
        var width = board.getWidth();
        var height = board.getHeight();

        addValidMove(width, height, moves, x, y, x - 1, y - 2);
        addValidMove(width, height, moves, x, y, x - 1, y + 2);
        addValidMove(width, height, moves, x, y, x + 1, y - 2);
        addValidMove(width, height, moves, x, y, x + 1, y + 2);
        addValidMove(width, height, moves, x, y, x - 2, y - 1);
        addValidMove(width, height, moves, x, y, x - 2, y + 1);
        addValidMove(width, height, moves, x, y, x + 2, y - 1);
        addValidMove(width, height, moves, x, y, x + 2, y + 1);

        return moves;
    }

    function addValidMove(width, height, moves, x1, y1, x2, y2) {
        if (x2 >= 0 && x2 < width && y2 >= 0 && y2 < height)
            moves.push({ x1: x1, y1: y1, x2: x2, y2: y2 });
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
