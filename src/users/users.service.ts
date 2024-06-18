import { Injectable } from '@nestjs/common';
import { supabase } from '@/lib/supabase/supabase.client';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserResponseDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  async createUser({
    fid,
    name,
    pfp,
  }: CreateUserDto): Promise<CreateUserResponseDto> {
    try {
      // Todo: rename User to App
      // Case 1: Check if the user exists
      const { data: existingUser, error: existingUserError } = await supabase
        .from('users')
        .select('*')
        .eq('fid', fid)
        .single();

      console.log('line 21 user fetched', existingUser);

      if (existingUserError) {
        throw new Error(
          `Failed to fetch user line 22: ${existingUserError.message}`,
        );
      }

      // Case 1: If user exists, take no action
      // Case 2: If user doesn't exist, create a new user
      if (existingUser?.length === 0) {
        const { data: newUser, error: newUserError } = await supabase
          .from('users')
          .insert({ fid: fid, name: name, profile_pic: pfp })
          .select();

        console.log('line 53 new user', newUser);

        if (newUserError)
          throw new Error(`Failed to create user 52: ${newUserError.message}`);

        return {
          id: newUser[0].id,
          fid: newUser[0].fid,
          name: newUser[0].name,
          pfp: newUser[0].profile_pic,
        };
      }
      // Todo: Update name and profile pic if they have changed
      return {
        id: existingUser[0].id,
        fid: existingUser[0].fid,
        name: existingUser[0].name,
        pfp: existingUser[0].profile_pic,
      };
    } catch (error) {
      console.error('Failed to create new user:', error);
      throw error;
    }
  }
}
