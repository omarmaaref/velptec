// src/participants/participants.controller.ts
import { BadRequestException, Body, Controller, Get, Post, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { TokenValidationInterceptor } from '../token-validation/token-validation.interceptor';
import { AuthGuard } from '../auth/auth.guard';

@Controller('participant')
export class ParticipantController {
  
    @Post()
    @UsePipes(new ValidationPipe({
    forbidNonWhitelisted: true,    
    transform: true,
    // Optional: Wie würdest du die Fehlermeldungen so strukturieren, dass sie nutzerfreundlich?
    // normally exceptions in the DTO validations are returned as a list of raw messages, to make it frontend friendly
    // we should highlight the invalid properties for the frontend
    // using a custom exceptionFactory:
    exceptionFactory: (errors) => {
      return new BadRequestException(
        errors.map(e => ({
          field: e.property,
          errors: e.constraints?Object.values(e.constraints):[],
        }))
      );
    }
    }))
    create(@Body() dto: CreateParticipantDto) {
        // at this point, dto is guaranteed valid & typed
        return true;
    }

    @UseInterceptors(TokenValidationInterceptor)
    @UseGuards(AuthGuard)
    @Get()
    listParticipants(){
      return [];
    }
}
