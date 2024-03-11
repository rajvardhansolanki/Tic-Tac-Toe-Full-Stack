import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

const isString = (value: any) => typeof value === 'string';

@Schema({ timestamps: true })
export class Games extends Document {
  @Prop({ required: true, validate: [isString, 'gameId must be a string'] })
  gameId: string;

  @Prop({ required: true, validate: [isString, 'userId must be a string'] })
  userId: string;

  @Prop({ type: [String], required: true })
  board: string[];

  @Prop({ required: true })
  turn: string;

  @Prop({ required: true })
  result: string;

  @Prop({ required: true })
  oMovesCount: number;

  @Prop({ required: false })
  difficultyLevel: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ default: false })
  complete: boolean;

  @Prop()
  winner?: string;
}

export const GameBoardSchema = SchemaFactory.createForClass(Games);
export type GameDocument = Games & Document;
