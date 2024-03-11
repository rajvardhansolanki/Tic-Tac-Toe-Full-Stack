import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new NotFoundException('User not found. Please create an account.');
    }

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async signIn(user: any): Promise<{ access_token: string }> {
    const payload = { email: user.email, userId: user._id };
    const accessToken = this.generateAccessToken(payload);
    return { access_token: accessToken };
  }

  private generateAccessToken(payload: any): string {
    return this.jwtService.sign(payload, { secret: 'tictaktoe' });
  }
}
