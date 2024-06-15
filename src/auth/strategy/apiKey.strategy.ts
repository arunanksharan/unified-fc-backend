// https://medium.com/@alpercitak/nest-js-authenticate-with-both-api-key-and-jwt-4a22bf7b3049
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class APIKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'apikey',
) {
  constructor(private readonly authService: AuthService) {
    super(
      { header: 'x-api-key', prefix: '' },
      true,
      async (apikey, done, req) => {
        console.log('APIKEY STRATEGY', apikey);

        if (this.authService.validateApiKeyAndSignature(apikey, req)) {
          done(null, true);
        }
        done(new UnauthorizedException(), false);
      },
    );
  }
}
