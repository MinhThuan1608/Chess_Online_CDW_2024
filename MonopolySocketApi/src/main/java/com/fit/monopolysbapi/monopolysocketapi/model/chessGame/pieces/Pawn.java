package com.fit.monopolysbapi.monopolysocketapi.model.chessGame.pieces;

import com.fit.monopolysbapi.monopolysocketapi.model.chessGame.GameBoard;
import lombok.*;

@Getter
@Setter

public class Pawn extends Piece {

    public Pawn(GameBoard board, int row, int col, boolean isWhite) {
        super(board);
        this.row = row;
        this.col = col;
        this.isWhite = isWhite;
        this.name = isWhite ? "wn" : "bn";
        this.xPos = col * board.getTileSize();
    }

    public boolean isValidMovement(int row, int col) {
        int colorIndex = isWhite ? 1 : -1;
//        push 1
        if (this.col == col && row == this.row + colorIndex && board.getPiece(row, col) == null){
            return true;
        }
//        push 2
        if(isFirstMove && this.col == col && row == this.row + colorIndex * 2 &&
                board.getPiece(row, col) == null && board.getPiece(row + colorIndex, col) == null){
            return true;
        }
//        capture left
        if(col == this.col - 1 && row == this.row + colorIndex && board.getPiece(row, col) != null){
            return true;
        }
//        capture right
        if(col == this.col + 1 && row == this.row + colorIndex && board.getPiece(row, col) != null){
            return true;
        }
//        en Passant left
        if(board.getTileNum(row, col) == board.getEnPassantTile() && col == this.col - 1 && row == this.row - colorIndex
                && board.getPiece(row + colorIndex, col) != null){
            return true;
        }
        //        en Passant right
        if(board.getTileNum(row, col) == board.getEnPassantTile() && col == this.col + 1 && row == this.row - colorIndex
                && board.getPiece(row + colorIndex, col) != null){
            return true;
        }
        return false;
    }
}
