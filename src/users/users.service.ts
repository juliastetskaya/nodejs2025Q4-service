import * as bcrypt from 'bcrypt';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();

    return users.map((user) => ({
      id: user.id,
      login: user.login,
      createdAt: Number(user.createdAt),
      updatedAt: Number(user.updatedAt),
      version: user.version,
    }));
  }

  async create(userData: CreateUserDto): Promise<UserEntity> {
    const timestamp = Date.now();
    const hashedPassword = await bcrypt.hash(
      userData.password,
      Number(process.env.CRYPT_SALT),
    );

    const user = await this.prisma.user.create({
      data: {
        login: userData.login,
        password: hashedPassword,
        createdAt: timestamp,
        updatedAt: timestamp,
        version: 1,
      },
    });

    return {
      id: user.id,
      login: user.login,
      createdAt: Number(user.createdAt),
      updatedAt: Number(user.updatedAt),
      version: user.version,
    };
  }

  async updatePassword(
    id: string,
    data: UpdatePasswordDto,
  ): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isOldPasswordValid = await bcrypt.compare(
      data.oldPassword,
      user.password,
    );

    if (!isOldPasswordValid) {
      throw new ForbiddenException('Old Password is wrong');
    }

    const hashedNewPassword = await bcrypt.hash(data.newPassword, 10);

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: hashedNewPassword,
        version: user.version + 1,
        updatedAt: Number(Date.now()),
      },
    });

    return {
      id: updatedUser.id,
      login: updatedUser.login,
      version: updatedUser.version,
      createdAt: Number(updatedUser.createdAt),
      updatedAt: Number(updatedUser.updatedAt),
    };
  }

  async getById(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: Number(user.createdAt),
      updatedAt: Number(user.updatedAt),
    };
  }

  async delete(id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.delete({ where: { id } });
  }
}
