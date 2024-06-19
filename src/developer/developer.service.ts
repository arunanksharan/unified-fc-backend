import { Injectable } from '@nestjs/common';
import { DeveloperWithApiKeyResponseDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { supabase } from '@/lib/supabase/supabase.client';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { SB_TABLE_API_KEYS, SB_TABLE_DEVELOPERS } from './constants/constants';

@Injectable()
export class DeveloperService {
  async createDeveloper(
    ethereumAddress: string,
    domain: string,
  ): Promise<DeveloperWithApiKeyResponseDto> {
    try {
      // Case 1: Check if the user exists
      const { data: user, error: userError } = await supabase
        .from(SB_TABLE_DEVELOPERS)
        .select('*')
        .eq('ethereum_address', ethereumAddress)
        .single();

      console.log('line 21 user fetched', user);

      if (userError) {
        throw new Error(`Failed to fetch user line 22: ${userError.message}`);
      }

      // Case 1A: If user exists, fetch & return its user details with API key
      if (user) {
        const { data: apiKeyData, error: apiKeyError } = await supabase
          .from(SB_TABLE_API_KEYS)
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (apiKeyError) {
          throw new Error(`Failed to fetch API key: ${apiKeyError.message}`);
        }
        return {
          id: user.id,
          ethAddress: user.ethereum_address,
          domain: user.domain,
          apiKey: apiKeyData.api_key,
          apiSecret: apiKeyData.api_secret,
        };
      }

      // Case 2: If user doesn't exist, create a new user
      const { data: newUser, error: newUserError } = await supabase
        .from(SB_TABLE_DEVELOPERS)
        .insert({ ethereum_address: ethereumAddress, domain: domain })
        .select();

      console.log('line 53 new user', newUser);

      if (newUserError)
        throw new Error(`Failed to create user 52: ${newUserError.message}`);

      // Case 2A: Create a new API key for the new user
      const newApiKey = uuidv4().replace(/-/g, '');
      const newApiSecret = await bcrypt.hash(uuidv4(), 10);
      const { data: apiKeyData, error: apiKeyError } = await supabase
        .from(SB_TABLE_API_KEYS)
        .insert({
          api_key: newApiKey,
          user_id: newUser[0].id,
          api_secret: newApiSecret,
        })
        .select();

      console.log('line 70 new api key', apiKeyData);

      if (apiKeyError)
        throw new Error(`Failed to create API key: ${apiKeyError.message}`);

      return {
        id: newUser[0].id,
        ethAddress: newUser[0].ethereum_address,
        domain: newUser[0].domain,
        apiKey: apiKeyData[0].api_key,
        apiSecret: apiKeyData[0].api_secret,
      };
    } catch (error) {
      console.error('Failed to create new user:', error);
      throw error;
    }
  }

  async getApiKeyDetails(apiKey: string) {
    const { data: apiKeyData, error } = await supabase
      .from(SB_TABLE_API_KEYS)
      .select('*')
      .eq('api_key', apiKey)
      .single();
    if (error) {
      throw new Error(`Failed to fetch API key: ${error.message}`);
    }
    return apiKeyData;
  }
  // Todo: Add these api endpoints

  findAll() {
    return `This action returns all developer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} developer`;
  }

  update(id: number, updateDeveloperDto: UpdateDeveloperDto) {
    console.log('line 104 updateDeveloperDto', updateDeveloperDto);
    return `This action updates a #${id} developer`;
  }

  remove(id: number) {
    return `This action removes a #${id} developer`;
  }
}
