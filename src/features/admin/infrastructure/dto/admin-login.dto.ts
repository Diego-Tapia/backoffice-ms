import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class AdminLoginDTO {
  @IsString()
  @IsNotEmpty()
  public readonly username: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  public readonly password: string;
}
