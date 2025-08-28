import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('time_entries')
export class TimeEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'datetime' })
  clockIn: string;

  @Column({ type: 'datetime', nullable: true })
  clockOut: string;

  @Column({ type: 'integer', default: 0 })
  break: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;
}
