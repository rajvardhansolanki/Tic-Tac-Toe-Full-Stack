import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserHandler {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(
    @Body() body: { name: string; email: string; password: string },
  ) {
    const { name, email, password } = body;
    const isUser = await this.userService.findUserByEmail(email);
    if (isUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const newUser = await this.userService.createUser(name, email, password);
    return newUser;
  }
}
