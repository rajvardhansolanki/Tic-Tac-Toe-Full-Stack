import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TicTacToeService } from './game.service';

@Controller('tic-tac-toe')
export class TicTacToeController {
  constructor(private readonly ticTacToeService: TicTacToeService) {}

  @Post('game')
  startGame(
    @Body()
    body: {
      userId: string;
      gameid: string;
      cellindex: number;
      difficultylevel: string;
    },
  ) {
    const { userId, gameid, cellindex, difficultylevel } = body;
    return this.ticTacToeService.startGame(
      userId,
      gameid,
      cellindex,
      difficultylevel,
    );
  }

  @Get('get-board-data/:userId')
  async getGameBoard(@Param('userId') userId: string) {
    return this.ticTacToeService.getGameBoard(userId);
  }
}
