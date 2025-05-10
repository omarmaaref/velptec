import { Module } from '@nestjs/common';
import { ParticipantModule } from './participant/participant.module';

@Module({
  imports: [ParticipantModule],
})
export class AppModule {}
