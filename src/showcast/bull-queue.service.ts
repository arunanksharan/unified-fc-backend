// src/glotsphere/bull-queue.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import { SupabaseService } from './supabase.service'; // Assume this service handles Supabase interactions
import { QueueUserShowcastDto } from './dto/queue-showcast.dto';

@Injectable()
export class BullQueueService implements OnModuleInit {
  constructor(
    @InjectQueue('user')
    private readonly userQueue: Queue,
    private readonly supabaseService: SupabaseService,
  ) {}

  onModuleInit() {
    this.processRoomAssignmentJobs();
  }

  async addUserToQueueJob(queueUserDto: QueueUserShowcastDto) {
    /**
     * @dev addUserToQueueJob is called by /queue route to add user to the queue
     */
    console.log('Adding user  to queue', queueUserDto);
    return this.userQueue.add(queueUserDto, {
      removeOnComplete: true,
      removeOnFail: true,
    });
  }

  async processRoomAssignmentJobs() {
    /**
     * @dev processRoomAssignmentJobs is called by onModuleInit to process room assignment jobs from the queue
     */
    this.userQueue.process(async (job) => {
      try {
        // Extract data from the job: fid, roomId, actionType
        const { actionType, roomId, fid } = job.data;

        if (actionType == 'join') {
          this.processRoomJoinJobs(fid);
        } else if (actionType == 'leave') {
          this.processRoomLeaveJobs(roomId, fid);
        } else if (actionType == 'signout') {
          this.processRoomSignoutJobs(roomId, fid);
        }
      } catch (error) {
        console.error('Room assignment failed', error);
      }
    });
  }
  private async processRoomJoinJobs(fid: string) {
    // Case 1: get half rooms if any
    const halfRooms = await this.supabaseService.findHalfRooms();

    if (halfRooms.length > 0) {
      const room = await this.getRandomRoom(halfRooms);
      const roomId = await room.room_id;
      await this.supabaseService.updateHalfRoomToFull(roomId);
      await this.supabaseService.assignRoomToUser(roomId, fid);
      return roomId;
    }

    // If code reaches here => halfRooms.length == 0
    // Case 2: get vacant rooms
    const vacantRooms = await this.supabaseService.findVacantRooms();

    if (vacantRooms.length > 0) {
      const room = await this.getRandomRoom(vacantRooms);
      const roomId = await room.room_id;
      await this.supabaseService.updateVacantRoomToHalf(roomId);
      await this.supabaseService.assignRoomToUser(roomId, fid);
      return roomId;
    }
    // If code reaches here => vacantRooms.length == 0
    // Case 3: get a new room
    // Call Huddle to generate a new room
    // Insert to supabase tables
    const roomId = await this.createHuddleRoom();
    await this.supabaseService.insertNewRoomInSB(roomId);
    await this.supabaseService.assignRoomToUser(roomId, fid);
    return roomId;
  }
  private async processRoomLeaveJobs(roomId: string, fid: string) {
    console.log(roomId, fid);

    const room = await this.supabaseService.getRoomStatus(roomId);
    const roomStatus = await room[0].room_status;
    if (roomStatus == 'full') {
      await this.supabaseService.updateFullRoomToHalf(roomId);
    } else if (roomStatus == 'half') {
      await this.supabaseService.updateHalfRoomToVacant(roomId);
    }
    await this.supabaseService.removeAssignedRoomToUser(roomId, fid);
    await this.addUserToQueueJob({ fid, actionType: 'join', roomId: '1' });
    return roomId;
  }
  private async processRoomSignoutJobs(roomId: string, fid: string) {
    console.log(roomId, fid);

    const room = await this.supabaseService.getRoomStatus(roomId);
    const roomStatus = await room[0].room_status;
    if (roomStatus == 'full') {
      await this.supabaseService.updateFullRoomToHalf(roomId);
    } else if (roomStatus == 'half') {
      await this.supabaseService.updateHalfRoomToVacant(roomId);
    }
    await this.supabaseService.removeAssignedRoomToUser(roomId, fid);
    return roomId;
  }

  private createHuddleRoom = async () => {
    const response = await fetch(
      'https://api.huddle01.com/api/v1/create-room',
      {
        method: 'POST',
        body: JSON.stringify({
          title: 'Huddle01 Room',
        }),
        headers: {
          'Content-type': 'application/json',
          'x-api-key': process.env.HUDDLE_API_KEY || '',
        },
      },
    );
    const data = await response.json();
    const roomId = data.data.roomId;
    return roomId;
  };

  private async getRandomRoom(availableRooms: any) {
    const randomRoom =
      (await availableRooms[
        Math.floor(Math.random() * availableRooms.length)
      ]) || {};
    return randomRoom;
  }
}
