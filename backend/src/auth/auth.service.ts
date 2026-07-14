
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByUsername(username);
    if (user.length === 0) {
      throw new UnauthorizedException("User not found");
    }
    const isMatch = await bcrypt.compare(pass, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException("Invalid password");
    }

    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }

  async signUp({
    username,
    email,
    firstName,
    lastName,
    password,
  }: User): Promise<any> {
    console.log("username: ", username);
    const user = await this.usersService.findUserByUsername(username);
    if (user.length > 0) {
      throw new UnauthorizedException('Username already exists');
    }

    const userByEmail = await this.usersService.findUserByEmail(email);
    if (userByEmail.length > 0) {
      throw new UnauthorizedException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.usersService.createUser({
      username,
      email,
      firstName,
      lastName,
      password: hashedPassword
    });

    return {
      message: 'User created successfully',
    }
  }
}
