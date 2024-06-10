import { Injectable } from '@nestjs/common';
import { UserWithApiKeyResponseDto } from '@/users/dto/user.dto';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/lib/supabase/supabase.client';
import bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  async createUser(
    ethereumAddress: string,
    domain: string,
  ): Promise<UserWithApiKeyResponseDto> {
    try {
      // Case 1: Check if the user exists
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('ethereum_address', ethereumAddress)
        .single();

      if (userError) {
        throw new Error(`Failed to fetch user: ${userError.message}`);
      }

      // Case 1A: If user exists, fetch & return its user details with API key
      if (user) {
        const { data: apiKeyData, error: apiKeyError } = await supabase
          .from('api_keys')
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
        .from('users')
        .insert({ ethereum_address: ethereumAddress, domain: domain })
        .select();

      if (newUserError)
        throw new Error(`Failed to create user: ${newUserError.message}`);

      // Case 2A: Create a new API key for the new user
      const newApiKey = uuidv4().replace(/-/g, '');
      const newApiSecret = await bcrypt.hash(uuidv4(), 10);
      const { data: apiKeyData, error: apiKeyError } = await supabase
        .from('api_keys')
        .insert({
          api_key: newApiKey,
          user_id: newUser[0].id,
          api_secret: newApiSecret,
        })
        .select();

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
}
