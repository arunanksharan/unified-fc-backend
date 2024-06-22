import { Injectable } from '@nestjs/common';
import { CreateCastDto } from './dto/create-glotsphere.dto';
import { UpdateGlotsphereDto } from './dto/update-glotsphere.dto';
import { NeynarService } from './neynar.service';
import {
  CreateSignerDto,
  UserSignerGetResponseDto,
} from './dto/user-signer.dto';
import { SupabaseService } from './supabase.service';

@Injectable()
export class GlotsphereService {
  constructor(
    private readonly neynarService: NeynarService,
    private readonly supabaseService: SupabaseService,
  ) {}
  create(createGlotsphereDto: CreateCastDto) {
    console.log('createGlotsphereDto', createGlotsphereDto);
    return 'This action adds a new glotsphere';
  }

  async createSigner(createSignerDto: CreateSignerDto) {
    const signerCreatedInNeynar = await this.neynarService.createSigner();
    console.log('signer 21 glotsphere service', signerCreatedInNeynar);
    const developerFid = await this.neynarService.getdeveloperFid();
    const developerFidString = developerFid.toString();
    console.log('develoepr fid', developerFid);
    const createSignerInDBDto = {
      signer_uuid: signerCreatedInNeynar.signer_uuid,
      public_key: signerCreatedInNeynar.public_key,
      status: signerCreatedInNeynar.status,
      signer_approval_url: signerCreatedInNeynar.signer_approval_url,
      developer_fid: developerFidString,
      user_fid: createSignerDto.fid,
    };
    const signerCreatedInDB =
      await this.supabaseService.createSignerInDB(createSignerInDBDto);
    console.log('signerCreatedInDB line 24 gs service', signerCreatedInDB);
    return signerCreatedInNeynar;
  }

  async updateSignerInDB(signer_uuid: string) {
    const signerUpdatedInDB =
      await this.supabaseService.updateSignerInDB(signer_uuid);
    console.log(signerUpdatedInDB);
    return signer_uuid;
  }

  async getSignerForFidFromDB(fid: string): Promise<UserSignerGetResponseDto> {
    const data = await this.supabaseService.getSignerForFidFromDB(fid);

    if (data.length > 0) {
      const signer = data[0];

      return {
        signer_uuid: signer.signer_uuid,
        public_key: signer.public_key,
        status: signer.status,
        signer_approval_url: signer.signer_approval_url,
        fid: signer.user_fid,
      };
    }

    return {
      signer_uuid: null,
      public_key: null,
      status: null,
      signer_approval_url: null,
      fid: null,
    };
  }

  findAll() {
    return `This action returns all glotsphere`;
  }

  findOne(id: number) {
    return `This action returns a #${id} glotsphere`;
  }

  update(id: number, updateGlotsphereDto: UpdateGlotsphereDto) {
    console.log('updateGlotsphereDto', updateGlotsphereDto);
    return `This action updates a #${id} glotsphere`;
  }

  remove(id: number) {
    return `This action removes a #${id} glotsphere`;
  }
}
