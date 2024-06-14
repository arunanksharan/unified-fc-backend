import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDevResponseDto, SignupDevRequestDto } from './dto/siwe.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup/developer/eth')
  async signupDevWithEth(
    @Body() body: SignupDevRequestDto,
  ): Promise<SignupDevResponseDto> {
    try {
      const devWithApiKey =
        await this.authService.handleSignupDeveloperWithEth(body);
      if (!devWithApiKey) {
        throw new HttpException(
          'Failed to verify SIWE signature',
          HttpStatus.UNAUTHORIZED,
        );
      }
      return {
        message: 'Signup successful',
        ...devWithApiKey,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to verify SIWE signature',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
