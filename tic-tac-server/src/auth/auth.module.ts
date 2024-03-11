import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/user.model';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from './auth.constant';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ConfigModule.forRoot(),
    UserModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        privateKey: '',
        signOptions: { expiresIn: jwtConstants.expiresIn },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, UserService],
})
export class AuthModule {}
