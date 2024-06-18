// src/glotsphere/supabase.service.ts

import { supabase } from '@/lib/supabase/supabase.client';
import { Injectable } from '@nestjs/common';
import { SB_TABLE_ROOMS, SB_TABLE_ROOM_USER_MAPPING } from './types/types';

@Injectable()
export class SupabaseService {
  private supabase = supabase;

  async findHalfRooms(): Promise<any> {
    const { data, error } = await this.supabase
      .from(SB_TABLE_ROOMS)
      .select('*')
      .eq('room_status', 'half');
    if (error) throw new Error(error.message);
    return data;
  }

  async updateHalfRoomToFull(roomId: string) {
    const { data, error } = await this.supabase
      .from(SB_TABLE_ROOMS)
      .update({ room_status: 'full' })
      .eq('room_id', roomId)
      .select();
    if (error) throw new Error(error.message);
    return data;
  }

  async findVacantRooms(): Promise<any> {
    const { data, error } = await this.supabase
      .from(SB_TABLE_ROOMS)
      .select('*')
      .eq('room_status', 'vacant');

    if (error) throw new Error(error.message);
    console.log('vacant rooms', data);
    return data;
  }

  async updateVacantRoomToHalf(roomId: string) {
    const { data, error } = await this.supabase
      .from(SB_TABLE_ROOMS)
      .update({ room_status: 'half' })
      .eq('room_id', roomId)
      .select();
    if (error) throw new Error(error.message);
    return data;
  }

  async insertNewRoomInSB(roomId: string) {
    const { data, error } = await this.supabase
      .from(SB_TABLE_ROOMS)
      .insert({ room_id: roomId, room_status: 'half' })
      .select();
    if (error) throw new Error(error.message);
    return data;
  }

  async assignRoomToUser(fid: string, roomId: string) {
    const { data, error } = await this.supabase
      .from(SB_TABLE_ROOM_USER_MAPPING)
      .select('*')
      .eq('fid', fid);

    if (error) {
      console.log('error', error.message);
    }

    if (data.length == 0) {
      // No such fid exists
      // Insert fid and its roomId pairing
      const { data: newUserRoom, error: newUserRoomError } = await this.supabase
        .from(SB_TABLE_ROOM_USER_MAPPING)
        .insert({ fid: fid, room_id: roomId })
        .select();
      if (newUserRoomError) {
        console.log('error', newUserRoomError);
      }
      return newUserRoom;
    }

    const { data: updateUserRoom, error: updateUserRoomError } =
      await this.supabase
        .from(SB_TABLE_ROOM_USER_MAPPING)
        .update({ room_id: roomId })
        .eq('fid', fid);

    if (updateUserRoomError) {
      console.error('Error:', updateUserRoomError.message);
    }
    return updateUserRoom;
  }

  // Leave Room DB Interactions
  async getRoomStatus(roomId: string) {
    const { data, error } = await this.supabase
      .from(SB_TABLE_ROOMS)
      .select('*')
      .eq('room_id', roomId);

    if (error) {
      console.log('error:', error);
    }
    return data;
  }

  async updateFullRoomToHalf(roomId: string) {
    const { data, error } = await this.supabase
      .from(SB_TABLE_ROOMS)
      .update({ room_status: 'half' })
      .eq('room_id', roomId)
      .select();
    if (error) throw new Error(error.message);
    return data;
  }
  async updateHalfRoomToVacant(roomId: string) {
    const { data, error } = await this.supabase
      .from(SB_TABLE_ROOMS)
      .update({ room_status: 'vacant' })
      .eq('room_id', roomId)
      .select();
    if (error) throw new Error(error.message);
    return data;
  }
  async removeAssignedRoomToUser(roomId: string, fid: string) {
    // Find the room_user row using fid
    // set the room_id to null
    const { data, error } = await this.supabase
      .from(SB_TABLE_ROOM_USER_MAPPING)
      .update({ room_id: null })
      .eq('fid', fid)
      .select();

    if (error) throw new Error(error.message);
    return data;
  }
}
