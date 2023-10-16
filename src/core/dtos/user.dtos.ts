import { IsNotEmpty } from 'class-validator';

export class UserVerifyDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  faculty: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  student_id: string;
}
