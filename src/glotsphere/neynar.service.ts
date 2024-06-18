import neynarClient from '@/lib/neynar/neynar.client';
import { Injectable } from '@nestjs/common';

// Todo: Frontend - let usr add signer throguh Nextjs app
// Todo: APIKey based auth for Nestjs Backend
@Injectable()
export class NeynarService {
  private neynar = neynarClient;

  async publishCast(castText: string, signerUuid: string): Promise<any> {
    // Placeholder function to post data to Neynar's API
    // Implement the actual API calling logic here
    console.log('Posting data to Neynar API');
    console.log('Cast:', castText);
    console.log('SignerUUID', signerUuid);

    const resNeynar = await this.neynar.publishCast(signerUuid, castText);
    return resNeynar;
  }
}
