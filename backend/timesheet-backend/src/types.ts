export interface TimeEntry {
  id: number;
  date: string;
  clockIn: string;
  clockOut?: string;
  break?: number;
  notes?: string;
  createdAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface TimeEntryDto {
  date?: string;
  clockIn?: string;
  clockOut?: string;
  break?: number;
  notes?: string;
}
