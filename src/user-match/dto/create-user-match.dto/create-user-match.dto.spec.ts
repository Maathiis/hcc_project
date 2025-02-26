import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserMatchDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  matchId: number;
}
