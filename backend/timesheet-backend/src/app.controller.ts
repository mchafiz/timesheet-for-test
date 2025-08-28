import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { TimeEntryDto, ApiResponse } from './types';
import { TimeEntry } from './entities/time-entry.entity';

@Controller('api/timesheet')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('entries')
  async getTimeEntries(): Promise<ApiResponse<TimeEntry[]>> {
    return this.appService.getTimeEntries();
  }

  @Post('entries')
  async createTimeEntry(
    @Body() timeEntry: TimeEntryDto,
  ): Promise<ApiResponse<TimeEntry>> {
    return this.appService.createTimeEntry(timeEntry);
  }

  @Put('entries/:id')
  async updateTimeEntry(
    @Param('id') id: number,
    @Body() timeEntry: TimeEntryDto,
  ): Promise<ApiResponse<TimeEntry>> {
    return this.appService.updateTimeEntry(id, timeEntry);
  }
}
