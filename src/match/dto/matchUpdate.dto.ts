import { IsNotEmpty, IsString } from 'class-validator';

export class MatchUpdateScoreDto {
  @IsNotEmpty()
  @IsString()
  score: string;
}
