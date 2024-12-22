import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

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

export class CreatePostDto {
  id: string;

  user_id: string;
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  publishedAt: string;
  @IsString()
  @IsNotEmpty()
  notion_page_id: string;
}
