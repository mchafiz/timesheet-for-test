import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponse } from './types';
import { TimeEntry } from './entities/time-entry.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(TimeEntry)
    private timeEntryRepository: Repository<TimeEntry>,
  ) {}

  getHello(): string {
    return 'Timesheet API is running!';
  }

  async getTimeEntries(): Promise<ApiResponse<TimeEntry[]>> {
    const entries = await this.timeEntryRepository.find({
      order: { createdAt: 'DESC' },
    });

    return {
      success: true,
      data: entries,
      message: 'Time entries retrieved successfully',
    };
  }

  async createTimeEntry(
    timeEntryDto: Partial<TimeEntry>,
  ): Promise<ApiResponse<TimeEntry>> {
    const entry = this.timeEntryRepository.create({
      date: timeEntryDto.date || new Date().toISOString().split('T')[0],
      clockIn: timeEntryDto.clockIn || new Date().toISOString(),
      clockOut: timeEntryDto.clockOut,
      break: timeEntryDto.break || 0,
      notes: timeEntryDto.notes || '',
    });

    const savedEntry = await this.timeEntryRepository.save(entry);

    return {
      success: true,
      data: savedEntry,
      message: 'Time entry created successfully',
    };
  }

  async updateTimeEntry(
    id: number,
    timeEntryDto: Partial<TimeEntry>,
  ): Promise<ApiResponse<TimeEntry>> {
    const existingEntry = await this.timeEntryRepository.findOne({
      where: { id },
    });

    if (!existingEntry) {
      return {
        success: false,
        data: {} as TimeEntry,
        message: 'Time entry not found',
      };
    }

    const updatedEntry = await this.timeEntryRepository.save({
      ...existingEntry,
      ...timeEntryDto,
    });

    return {
      success: true,
      data: updatedEntry,
      message: 'Time entry updated successfully',
    };
  }
}
