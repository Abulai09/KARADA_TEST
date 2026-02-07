import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, CreateLoginDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  async registration(@Body() dto: CreateAuthDto) {
    return await this.authService.registration(dto);
  }

  @Post('login')
  async login(@Body() dto: CreateLoginDto) {
    return await this.authService.login(dto);
  }
}
