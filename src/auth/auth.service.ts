import {
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<{ id: string; message: string }> {
    const { login, password } = signupDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { login },
    });

    if (existingUser) {
      throw new BadRequestException('User with this login already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const timestamp = Date.now();

    const user = await this.prisma.user.create({
      data: {
        login,
        password: hashedPassword,
        createdAt: timestamp,
        updatedAt: timestamp,
        version: 1,
      },
    });

    return { id: user.id, message: 'User created successfully' };
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { login, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: { login },
    });

    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid credentials');
    }

    const payload = { userId: user.id, login: user.login };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME || '1h',
    });

    return { accessToken };
  }
}
