import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantController } from './participant.controller';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

describe('ParticipantController', () => {
  let controller: ParticipantController;
  const validationPipe = new ValidationPipe({
    whitelist: true,
    transform: true,
  });
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipantController],
    }).compile();

    controller = module.get<ParticipantController>(ParticipantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('it should accept valid participant data', async ()=>{
    const validDto: CreateParticipantDto = {
      firstName: 'omar',
      lastName: 'maaref',
      email: 'omar@maaref.com',
      phone: '+491234567890',
      birthdate: '12.05.2000',
    };
    const validated = await validationPipe.transform(validDto,  
      {type: 'body',
      metatype: CreateParticipantDto,
    });
    const result = controller.create(validated);
    expect(result).toBeTruthy();
  });
  
  it('should throw error on invalid data', async () => {
    const invalidInput = {
      firstName: '', // too short
      phone: '123', // invalid format
      email: 'veltec@omar', // not an email
      birthdate: '31-12-1990', // invalid format
      random: 'random',
    };

    try {
      await validationPipe.transform(invalidInput, {
        type: 'body',
        metatype: CreateParticipantDto,
      });
      fail('The input if invalid but the response is valid');
    } catch (e) {
    
      const res = (e as BadRequestException).getResponse();
      console.log('res ',res)
      expect((res as any).message).toBeDefined();
      const errorList=(res as any).message;
      expect(errorList.length).toBe(6);
    }
  });
});
