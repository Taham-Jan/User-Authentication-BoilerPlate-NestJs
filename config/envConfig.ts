import { IsInt, IsString, Matches } from 'class-validator';

export class envConfig {
  @IsInt()
  port: number;

  @IsString()
  @Matches(/^mongodb\+srv:\/\/.*/)
  host: string;

  @IsString()
  jwtSecret: string;

  @IsString()
  jwtSecretexpiry: string;
}
