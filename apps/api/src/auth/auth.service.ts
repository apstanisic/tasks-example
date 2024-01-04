import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  // not production data
  users = [{ id: 1, email: 'test@example.com', password: 'password' }];
  constructor(private jwtService: JwtService) {}
  async login(data: LoginDto) {
    const user = this.users.find(
      (user) => user.email === data.email && user.password === data.password
    );
    if (!user) throw new BadRequestException('Email or password invalid');

    const token = await this.jwtService.signAsync({ email: user.email });
    return { token, email: user.email };
  }
}
