import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async login(@Body() authDto: AuthDto): Promise<any> {
    const user = await this.authService.validateUser(
      authDto.email,
      authDto.password,
    );
    const token = await this.authService.signIn(user);

    const response = {
      user: { ...user, ...token },
    };

    return response;
  }
}
