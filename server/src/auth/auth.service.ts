import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto, CreateLoginDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  private generateWebToken(user: User) {
    return this.jwtService.sign({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  }

  async registration(dto: CreateAuthDto) {
    if (dto.password !== dto.password_confirmation) {
      throw new BadRequestException('Passwords do not match');
    }

    const candidate = await this.userRepo.findOne({
      where: [{ username: dto.username }, { email: dto.email }],
    });

    if (candidate) {
      throw new BadRequestException('User already exists');
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);

    const user = this.userRepo.create({
      username: dto.username,
      email: dto.email,
      password: hashPassword,
    });

    await this.userRepo.save(user);

    return {
      message: 'Registered successfully',
      token: this.generateWebToken(user),
    };
  }

  async login(dto: CreateLoginDto) {
    const user = await this.userRepo.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      token: this.generateWebToken(user),
    };
  }
}
