import { IsNumber, IsString, IsDateString } from 'class-validator';

export class RegisterMatchDto {
  @IsNumber()
  id: number;

  @IsString()
  intitule: string;

  @IsDateString()
  dateMatch: Date;

  @IsString()
  adversaire: string;

  @IsString()
  score: string;

  @IsString()
  scoreFinal: string;
}
