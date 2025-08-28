import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimeEntry } from './entities/time-entry.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'timesheet.db',
      entities: [TimeEntry],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([TimeEntry]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
