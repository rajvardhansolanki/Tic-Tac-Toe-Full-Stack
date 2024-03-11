import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserHandler } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './user.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserHandler],
  providers: [UserService],
})
export class UserModule {}
