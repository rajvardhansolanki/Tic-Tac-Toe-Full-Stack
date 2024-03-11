import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicTacToeController } from './game.controller';
import { TicTacToeService } from './game.service';
import { GameBoardSchema } from './game.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Games', schema: GameBoardSchema }]),
  ],
  controllers: [TicTacToeController],
  providers: [TicTacToeService],
})
export class TicTacModule {}
