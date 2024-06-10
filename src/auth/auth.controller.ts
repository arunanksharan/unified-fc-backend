import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupResponseDto, SignupRequestDto } from './dto/siwe.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup/eth')
  async signupWithEth(
    @Body() body: SignupRequestDto,
  ): Promise<SignupResponseDto> {
    try {
      const userWithApiKey = await this.authService.handleSignupWithEth(body);
      if (!userWithApiKey) {
        throw new HttpException(
          'Failed to verify SIWE signature',
          HttpStatus.UNAUTHORIZED,
        );
      }
      return {
        message: 'Signup successful',
        ...userWithApiKey,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to verify SIWE signature',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
