import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { AuthGuard } from './auth.guard';
import { Public } from 'src/decorators/public.decorator';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  tokenOptions = {
    httpOnly: true,
    secure: true,
  };
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Res({ passthrough: true }) res: Response,
    @Body() signInDto: SignInDto,
  ) {
    const { user, access_token } = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );

    res.cookie('access_token', access_token, this.tokenOptions);
    return { access_token, user };
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  signOut(@Res() res: Response) {
    return res
      .clearCookie('access_token', this.tokenOptions)
      .json({ message: 'User Logged Out' });
  }
}
