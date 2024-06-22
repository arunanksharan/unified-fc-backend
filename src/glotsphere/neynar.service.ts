import neynarClient from '@/lib/neynar/neynar.client';
import { Injectable } from '@nestjs/common';
import { ViemLocalEip712Signer } from '@farcaster/hub-nodejs';
import { bytesToHex, hexToBytes } from 'viem';
import { mnemonicToAccount } from 'viem/accounts';
import { FARCASTER_DEVELOPER_MNEMONIC } from '@/lib/loadenv';

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

  async createSigner() {
    const signedKey = await this.getSignedKey();
    // Todo: Add the signedKey to the database
    return signedKey;
  }

  async getSigner(signer_uuid: string) {
    try {
      console.log('signerUuid', signer_uuid);
      const signer = await neynarClient.lookupSigner(signer_uuid);
      return signer;
    } catch (error) {
      console.log('error', error);
      return null;
    }
  }

  async getSignerStatus(signer_uuid: string) {
    try {
      console.log('signerUuid', signer_uuid);
      const signer = await neynarClient.lookupSigner(signer_uuid);
      return signer;
    } catch (error) {
      console.log('error', error);
      return null;
    }
  }

  async getdeveloperFid() {
    try {
      const developer_fid = this.getFid();
      return developer_fid;
    } catch (error) {
      console.log('error', error);
      return null;
    }
  }

  private async getSignedKey() {
    const createSigner = await neynarClient.createSigner();
    const { deadline, signature } = await this.generate_signature(
      createSigner.public_key,
    );

    if (deadline === 0 || signature === '') {
      throw new Error('Failed to generate signature');
    }

    const fid = await this.getFid();

    const signedKey = await neynarClient.registerSignedKey(
      createSigner.signer_uuid,
      fid,
      deadline,
      signature,
    );

    return signedKey;
  }

  private generate_signature = async (public_key: string) => {
    if (typeof FARCASTER_DEVELOPER_MNEMONIC === 'undefined') {
      throw new Error('FARCASTER_DEVELOPER_MNEMONIC is not defined');
    }

    // All linked to Developer Mnemonic
    const account = mnemonicToAccount(FARCASTER_DEVELOPER_MNEMONIC); // developer account
    const appAccountKey = new ViemLocalEip712Signer(account as any); // appAccountKey uusing developer account
    const FID = await this.getFid(); // developer's fid

    // Generates an expiration date for the signature (24 hours from now).
    const deadline = Math.floor(Date.now() / 1000) + 60 * 60 * 24;

    // All linked to user account
    const uintAddress = hexToBytes(public_key as `0x${string}`);

    const signature = await appAccountKey.signKeyRequest({
      requestFid: BigInt(FID), // developer's fid
      key: uintAddress, // user's public key
      deadline: BigInt(deadline), // expiration date for signature made by developer account
    });

    if (signature.isErr()) {
      return { deadline, signature: '' };
    }

    const sigHex = bytesToHex(signature.value);

    return { deadline, signature: sigHex };
  };

  private getFid = async () => {
    if (!process.env.FARCASTER_DEVELOPER_MNEMONIC) {
      throw new Error('FARCASTER_DEVELOPER_MNEMONIC is not set.');
    }

    const account = mnemonicToAccount(process.env.FARCASTER_DEVELOPER_MNEMONIC);

    // Lookup user details using the custody address.
    const { user: farcasterDeveloper } =
      await neynarClient.lookupUserByCustodyAddress(account.address);

    return Number(farcasterDeveloper.fid);
  };
}
