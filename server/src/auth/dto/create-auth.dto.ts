import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @MinLength(3, { message: 'Имя должно быть минимум 3 символа' })
  username: string;

  @IsEmail({}, { message: 'Некорректный email' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Пароль минимум 6 символов' })
  password: string;

  @IsString()
  @MinLength(6, { message: 'Подтверждение пароля минимум 6 символов' })
  password_confirmation: string;
}

export class CreateLoginDto {
  @IsEmail({}, { message: 'Некорректный email' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Пароль минимум 6 символов' })
  password: string;
}
