
'use strict';

const simpleboard = require('simpleboard');

const simplechess = (function () {
    const Color = { White: 1, Black: 2 };
    const Piece = { King: 1, Queen: 2, Rook: 3, Bishop: 4, Knight: 5, Pawn: 6 };

    const Moves = [];

    Moves[Piece.King] = getKingMoves;
    Moves[Piece.Queen] = getQueenMoves;
    Moves[Piece.Rook] = getRookMoves;
    Moves[Piece.Bishop] = getBishopMoves;
    Moves[Piece.Knight] = getKnightMoves;
    Moves[Piece.Pawn] = getPawnMoves;

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
            const positions = this.getPositions();
            const n = positions.length;
            let moves = [];

            for (let k = 0; k < n; k++) {
                const position = positions[k];
                if (position.content.color === color)
                    moves = moves.concat(getPieceMoves(board, position));
            }

            return moves;
        };

        this.getPieceMoves = function (color, piece, x, y) {
            return Moves[piece](board, x, y, color);
        };
        
        this.putPieces = function (pieces) {
            pieces.forEach(function (piece) {
                board.putContent(piece.x, piece.y, { color: piece.color, piece: piece.piece });
            });
        }

        this.inCheck = function (color) {
            const kingposition = board.findPosition(function(content) { return content.color == color && content.piece == Piece.King; });

            if (!kingposition)
                return false;

            const moves = this.getMoves(color === Color.White ? Color.Black : Color.White);
            const nmoves = moves.length;

            for (let k = 0; k < nmoves; k++)
                if (moves[k].x2 === kingposition.x && moves[k].y2 === kingposition.y)
                    return true;

            return false;
        }
    }

    function getPieceMoves(board, position) {
        return Moves[position.content.piece](board, position.x, position.y, position.content.color);
    }

    function getRookMoves(board, x, y, color) {
        const moves = [];
        const width = board.getWidth();
        const height = board.getHeight();

        for (let k = x + 1; k < width; k++)
            if (!addMove(board, moves, x, y, k, y, color))
                break;

        for (let k = x - 1; k >= 0; k--)
            if (!addMove(board, moves, x, y, k, y, color))
                break;

        for (let k = y + 1; k < height; k++)
            if (!addMove(board, moves, x, y, x, k, color))
                break;

        for (let k = y - 1; k >= 0; k--)
            if (!addMove(board, moves, x, y, x, k, color))
                break;

        return moves;
    }

    function getBishopMoves(board, x, y, color) {
        const moves = [];
        const width = board.getWidth();
        const height = board.getHeight();

        for (let k = 1; x + k < width && y + k < height; k++)
            if (!addMove(board, moves, x, y, x + k, y + k, color))
                break;

        for (let k = 1; x - k >= 0 && y - k >= 0; k++)
            if (!addMove(board, moves, x, y, x - k, y - k, color))
                break;

        for (let k = 1; x + k < width && y - k >= 0; k++)
            if (!addMove(board, moves, x, y, x + k, y - k, color))
                break;

        for (let k = 1; x - k >= 0 && y + k < height; k++)
            if (!addMove(board, moves, x, y, x - k, y + k, color))
                break;

        return moves;
    }

    function getQueenMoves(board, x, y, color) {
        return getBishopMoves(board, x, y, color).concat(getRookMoves(board, x, y, color));
    }

    function getKingMoves(board, x, y, color) {
        const moves = [];
        const width = board.getWidth();
        const height = board.getHeight();

        for (let k = -1; k <= 1; k++)
            for (let j = -1; j <= 1; j++)
                if ((k || j) && x + k >= 0 && x + k < width && y + j >= 0 && y + j < height)
                    addMove(board, moves, x, y, x + k, y + j, color);

        return moves;
    }

    function getPawnMoves(board, x, y, color) {
        const moves = [];
        const width = board.getWidth();
        const height = board.getHeight();
        const deltay = color === Color.White ? 1 : -1;
        const y2 = y + deltay;

        if (y2 >= height || y2 < 0)
            return moves;

        if (board.getContent(x, y2) === null) {
            moves.push({ x1: x, y1: y, x2: x, y2: y2 });
            if ((color === Color.White && y === 1) || (color === Color.Black && y === height - 2)) {
                const y3 = y2 + deltay;
                if (board.getContent(x, y3) === null)
                    moves.push({ x1: x, y1: y, x2: x, y2: y3 });
            }
        }

        let content;

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
        const moves = [];
        const width = board.getWidth();
        const height = board.getHeight();

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
        const content = board.getContent(x2, y2);

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
        const board = simpleboard.createBoard(8, 8);

        putSymmetricPiece(board, 0, 0, Piece.Rook);
        putSymmetricPiece(board, 1, 0, Piece.Knight);
        putSymmetricPiece(board, 2, 0, Piece.Bishop);

        for (let k = 0; k < 4; k++)
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

    const result = {
        createBoard: createBoard,
        createGame: function (board) {
            return new Game(board);
        }
    };

    for (let n in Color)
        result[n] = Color[n];
    for (let n in Piece)
        result[n] = Piece[n];

    return result;
})();

if (typeof window === 'undefined') {
	module.exports = simplechess;
}
