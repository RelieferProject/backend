import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  token: string;
}
