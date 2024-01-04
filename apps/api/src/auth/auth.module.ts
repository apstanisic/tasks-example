import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: 'ONLY_FOR_DEV',
      global: true,
      signOptions: { expiresIn: '30 days' },
    }),
  ],
})
export class AuthModule {}
