import { Injectable } from '@nestjs/common';
import { SignupDevRequestDto } from './dto/siwe.dto';
import { DeveloperService } from '@/developer/developer.service';
import { ethers } from 'ethers';
import { createHmac } from 'crypto';
import { SIGNATURE_ALGORITHM } from './constants';

@Injectable()
export class AuthService {
  constructor(private readonly developerService: DeveloperService) {}

  async handleSignupDeveloperWithEth(body: SignupDevRequestDto): Promise<any> {
    try {
      console.log('validateSiwe', body);
      const { ethAddress, signature, nonce, domain } = body; // message is redundant

      const messageToVerify = `nonce:${nonce}::ethereumaddress:${ethAddress}::domain:${domain}`;

      const signerAddress = ethers.verifyMessage(messageToVerify, signature);
      if (signerAddress.toLowerCase() === ethAddress.toLowerCase()) {
        const developerWithApiKey = await this.developerService.createDeveloper(
          ethAddress,
          domain,
        );
        return developerWithApiKey;
      }

      return null;
    } catch (error) {
      console.error('Failed to verify SIWE signature:', error);
      return null;
    }
  }

  async validateApiKeyAndSignature(
    apikey: string,
    req: Request,
  ): Promise<boolean> {
    console.log('validateApiKey', apikey);
    console.log('validateApiKey APIKEY', apikey);

    const apiKeyDetails = await this.developerService.getApiKeyDetails(apikey);
    console.log('validateApiKey apiKeyDetails', apiKeyDetails);
    if (!apiKeyDetails) {
      return false;
    }

    const apiSecret = apiKeyDetails.api_secret;
    const signature = req.headers['x-signature'] as string;
    if (!signature) {
      return false;
    }
    console.log('validateApiKey signature', signature);

    const nonce = req.headers['x-nonce'] as string;
    if (!nonce) {
      return false;
    }
    console.log('validateApiKey nonce', nonce);

    if (!this.verifySignature(apiSecret, { nonce: nonce }, signature)) {
      return false;
    }

    return true;
  }

  private verifySignature(
    secret: string,
    payload: { nonce: string },
    signature: string,
  ): boolean {
    console.log('verifySignature', secret, payload, signature);
    const computedSignature = createHmac(SIGNATURE_ALGORITHM, secret)
      .update(JSON.stringify(payload))
      .digest('hex');
    console.log('computedSignature', computedSignature);
    return computedSignature === signature;
  }
}
