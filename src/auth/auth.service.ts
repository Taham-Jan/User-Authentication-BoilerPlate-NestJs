import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/interfaces/user.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ user: User; access_token: string }> {
    try {
      const user = await this.userService.findOneByName(username);

      if (!user) throw new UnauthorizedException('User does not exist');

      if (user?.password !== pass) {
        throw new UnauthorizedException('Invalid Password');
      }
      const payload = {
        sub: user._id,
        username: user.username,
        emal: user.email,
        fullName: user.fullName,
      };
      const access_token = await this.jwtService.signAsync(payload);

      return {
        user,
        access_token,
      };
    } catch (error) {
      console.error('Error occurred during sign-in:', error.message);
      throw error;
    }
  }
}
