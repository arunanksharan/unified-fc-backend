import { Injectable } from '@nestjs/common';
import { SignupRequestDto } from './dto/siwe.dto';
import { UsersService } from '@/users/users.service';
import { ethers } from 'ethers';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async handleSignupWithEth(body: SignupRequestDto): Promise<any> {
    try {
      console.log('validateSiwe', body);
      const { ethAddress, signature, nonce, domain } = body; // message is redundant

      const messageToVerify = `nonce:${nonce}::ethereumaddress:${ethAddress}::domain:${domain}`;

      const signerAddress = ethers.verifyMessage(messageToVerify, signature);
      if (signerAddress.toLowerCase() === ethAddress.toLowerCase()) {
        const userWithApiKey = await this.usersService.createUser(
          ethAddress,
          domain,
        );
        return userWithApiKey;
      }

      return null;
    } catch (error) {
      console.error('Failed to verify SIWE signature:', error);
      return null;
    }
  }
}
