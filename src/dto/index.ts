import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePostDto {
  notion_page_id: string;
}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
