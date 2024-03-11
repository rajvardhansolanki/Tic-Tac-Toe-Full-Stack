import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enum } from 'src/utils/enum';
import { v4 as uuidv4 } from 'uuid';
import { Games } from './game.model';

@Injectable()
export class TicTacToeService {
  private board: string[];
  private turn: string;
  private oMovesCount: number;
  private result: string;

  constructor(
    @InjectModel('Games') private readonly gameBoardModel: Model<Games>,
  ) {
    this.initializeGame();
  }

  private initializeGame() {
    this.board = Array(9).fill('E');
    this.turn = Enum.X;
    this.oMovesCount = 0;
    this.result = 'still running';
  }

  private isWinningMove(board: string[], player: string): boolean {
    const BoardData = board;

    for (let i = 0; i <= 6; i += 3) {
      if (
        BoardData[i] === player &&
        BoardData[i] === BoardData[i + 1] &&
        BoardData[i + 1] === BoardData[i + 2]
      ) {
        return true;
      }
    }

    for (let i = 0; i <= 2; i++) {
      if (
        BoardData[i] === player &&
        BoardData[i] === BoardData[i + 3] &&
        BoardData[i + 3] === BoardData[i + 6]
      ) {
        return true;
      }
    }

    for (let i = 0, j = 4; i <= 2; i += 2, j -= 2) {
      if (
        BoardData[i] === player &&
        BoardData[i] === BoardData[i + j] &&
        BoardData[i + j] === BoardData[i + 2 * j]
      ) {
        return true;
      }
    }

    return false;
  }

  private async makeAIMove(difficultyLevel): Promise<number> {
    const availableCells = this.emptyCells();

    switch (difficultyLevel) {
      case Enum.EASY:
        return availableCells[
          Math.floor(Math.random() * availableCells.length)
        ];

      case Enum.MEDIUM:
        for (const cellIndex of availableCells) {
          const tempBoard = [...this.board];
          tempBoard[cellIndex] = this.turn === Enum.X ? Enum.O : Enum.X;

          if (
            this.isWinningMove(
              tempBoard,
              this.turn === Enum.X ? Enum.O : Enum.X,
            )
          ) {
            return cellIndex;
          }
        }

        return availableCells[
          Math.floor(Math.random() * availableCells.length)
        ];

      case Enum.HARD:
        for (const cellIndex of availableCells) {
          const tempBoard = [...this.board];
          tempBoard[cellIndex] = Enum.O;

          if (this.isWinningMove(tempBoard, Enum.O)) {
            return cellIndex;
          }
        }

        for (const cellIndex of availableCells) {
          const tempBoard = [...this.board];
          tempBoard[cellIndex] = Enum.X;

          if (this.isWinningMove(tempBoard, Enum.X)) {
            return cellIndex;
          }
        }

        const bestMove = this.minimax(this.board, 5, this.turn === Enum.O);
        return bestMove.index;

      default:
        return availableCells[0];
    }
  }

  private minimax(
    board: string[],
    depth: number,
    maximizingPlayer: boolean,
  ): { score: number; index: number } {
    if (this.isWinningMove(board, Enum.X)) {
      return { score: -1, index: -1 };
    }

    if (this.isWinningMove(board, Enum.O)) {
      return { score: 1, index: -1 };
    }

    if (this.emptyCells().length === 0) {
      return { score: 0, index: -1 };
    }

    if (depth === 0) {
      return { score: 0, index: -1 };
    }

    const availableCells = this.emptyCells();
    const moves: { score: number; index: number }[] = [];

    for (const cellIndex of availableCells) {
      const move: { score: number; index: number } = {
        score: 0,
        index: cellIndex,
      };

      const tempBoard = [...board];
      tempBoard[cellIndex] = maximizingPlayer ? Enum.O : Enum.X;

      const result = this.minimax(tempBoard, depth - 1, !maximizingPlayer);

      move.score = result.score;
      moves.push(move);
    }

    let bestMoveIndex = 0;

    if (maximizingPlayer) {
      let bestScore = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMoveIndex = i;
        }
      }
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMoveIndex = i;
        }
      }
    }

    return moves[bestMoveIndex];
  }

  advanceTurn() {
    this.turn = this.turn === Enum.X ? Enum.O : Enum.X;
  }

  emptyCells(): number[] {
    return this.board.reduce((cells, cell, index) => {
      if (cell === 'E') cells.push(index);
      return cells;
    }, []);
  }

  isTerminal(): boolean {
    const BoardData = this.board;

    for (let i = 0; i <= 6; i += 3) {
      if (
        BoardData[i] !== 'E' &&
        BoardData[i] === BoardData[i + 1] &&
        BoardData[i + 1] === BoardData[i + 2]
      ) {
        this.result = BoardData[i] + '-won';
        return true;
      }
    }

    for (let i = 0; i <= 2; i++) {
      if (
        BoardData[i] !== 'E' &&
        BoardData[i] === BoardData[i + 3] &&
        BoardData[i + 3] === BoardData[i + 6]
      ) {
        this.result = BoardData[i] + '-won';
        return true;
      }
    }

    for (let i = 0, j = 4; i <= 2; i += 2, j -= 2) {
      if (
        BoardData[i] !== 'E' &&
        BoardData[i] === BoardData[i + j] &&
        BoardData[i + j] === BoardData[i + 2 * j]
      ) {
        this.result = BoardData[i] + '-won';
        return true;
      }
    }

    const available = this.emptyCells();
    if (available.length === 0) {
      this.result = 'draw';
      return true;
    } else {
      this.result = 'still running';
      return false;
    }
  }

  async startGame(
    userId: string,
    gameId: string,
    cellIndex: number,
    difficultyLevel: string,
  ) {
    let existingGame;

    if (!gameId) {
      gameId = uuidv4();
      this.initializeGame();
    } else {
      existingGame = await this.gameBoardModel.findOne({
        userId,
        gameId,
      });

      if (existingGame) {
        this.board = existingGame.board;
        this.turn = existingGame.turn;
        this.oMovesCount = existingGame.oMovesCount;
        this.result = existingGame.result;
      } else {
        return {
          status: 'error',
          message: 'Game not found',
        };
      }
    }

    const moveResult = await this.makeMove(cellIndex, difficultyLevel);

    if (!existingGame) {
      const newGame = new this.gameBoardModel({
        gameId,
        userId,
        board: this.board,
        turn: this.turn,
        result: this.result,
        oMovesCount: this.oMovesCount,
        difficultyLevel,
        createdAt: new Date(),
        updatedAt: new Date(),
        complete: moveResult.complete,
        winner: moveResult.winner,
      });
      await newGame.save();
    } else {
      existingGame.board = this.board;
      existingGame.turn = this.turn;
      existingGame.result = this.result;
      existingGame.oMovesCount = this.oMovesCount;
      existingGame.difficultyLevel = difficultyLevel;
      existingGame.updatedAt = new Date();
      existingGame.complete = moveResult.complete;
      existingGame.winner = moveResult.winner;
      await existingGame.save();
    }

    return {
      status: 'success',
      message: existingGame ? 'Game updated' : 'Game started',
      board: this.board,
      turn: this.turn,
      gameId,
      ...moveResult,
    };
  }

  private async makeMove(
    cellIndex: number,
    difficultyLevel: string,
  ): Promise<any> {
    if (this.board[cellIndex] === 'E' && this.result === 'still running') {
      this.board[cellIndex] = this.turn;
      if (this.turn === Enum.O) this.oMovesCount++;
      this.advanceTurn();

      if (!this.isTerminal()) {
        const aiMoveIndex = await this.makeAIMove(difficultyLevel);
        this.board[aiMoveIndex] = this.turn;
        if (this.turn === Enum.O) this.oMovesCount++;
        this.advanceTurn();
      }

      if (!this.isTerminal()) {
        return {
          status: 'success',
          message: 'Move successful',
          board: this.board,
          turn: this.turn,
          winner: null,
          complete: false,
          difficultyLevel: difficultyLevel,
        };
      }

      let winner = null;
      if (this.result.endsWith('-won')) {
        winner = this.result.substring(0, 1);
      }

      return {
        status: 'success',
        message: 'Move successful',
        board: this.board,
        turn: this.turn,
        winner: winner,
        complete: true,
        difficultyLevel: difficultyLevel,
      };
    } else {
      return {
        status: 'error',
        message: 'Invalid move',
        board: this.board,
        turn: this.turn,
        winner: null,
        complete: false,
        difficultyLevel: difficultyLevel,
      };
    }
  }
  async getGameBoard(userId: string) {
    const result = await this.gameBoardModel
      .findOne({ userId })
      .sort({ updatedAt: -1 })
      .exec();
    return result;
  }
}
