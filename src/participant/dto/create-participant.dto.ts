// src/participants/dto/create-participant.dto.ts

import {
  IsString,
  Length,
  IsEmail,
  Matches,
} from 'class-validator';

// I would like to mention that I used chatgpt to generate this class, I hope you don't mind that :D
export class CreateParticipantDto {
  @IsString({ message: 'First name must be text' })
  @Length(1, 50, {
    message: 'First name must be a string between $constraint1 and $constraint2 characters',
  })
  firstName: string;

  @IsString({ message: 'Last name must be text' })
  @Length(1, 50, {
    message: 'Last name must be between $constraint1 and $constraint2 characters',
  })
  lastName: string;

  @IsEmail({}, { message: 'E-mail must be a valid email address' })
  email: string;

  @Matches(/^\+?[0-9]{7,15}$/, {
    message:
      'Phone number must be digits (optionally starting with +), length 7–15',
  })
  
  phone: string;

  // to improve, this regex might be a bit limited, to solve this I can a custom validator with cutom date validation logic
  @Matches(/^\d{2}\.\d{2}\.\d{4}$/, {
    message: 'Birthday must be in format DD.MM.YYYY',
  })
  birthdate: string;
}
