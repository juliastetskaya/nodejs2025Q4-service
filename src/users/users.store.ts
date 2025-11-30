/* eslint-disable @typescript-eslint/no-unused-vars */
import { v4 as uuidv4, validate } from 'uuid';
import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User, UserEntity } from './interfaces/user.interface';
import { UsersStore } from './interfaces/users-store.interface';

export const USERS_STORE_TOKEN = 'USERS_STORE';

@Injectable()
class InMemoryUsersStore implements UsersStore {
  private users: User[] = [];

  constructor() {
    this.users = [];
  }

  getAllUsers(): UserEntity[] {
    return this.users.map((user) => {
      const { password: _, ...rest } = user;
      return rest;
    });
  }

  getUserById(id: string): UserEntity {
    if (!validate(id)) {
      throw new Error('Invalid id');
    }

    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new Error('User not found');
    }

    const { password: _, ...rest } = user;
    return rest;
  }

  create(userData: CreateUserDto): UserEntity {
    const user = {
      ...userData,
      id: uuidv4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push(user);

    return {
      id: user.id,
      login: user.login,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      version: user.version,
    };
  }

  updatePassword(id: string, data: UpdatePasswordDto): UserEntity {
    if (!validate(id)) {
      throw new Error('Invalid id');
    }

    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new Error('User not found');
    }

    const { oldPassword, newPassword } = data;

    if (oldPassword !== user.password) {
      throw new Error('Password is incorrect');
    }

    if (user.password === newPassword) {
      const { password: _, ...rest } = user;
      return rest;
    }

    const newUser = {
      ...user,
      password: newPassword,
      updatedAt: Date.now(),
      version: user.version + 1,
    };

    this.users = this.users.map((user) =>
      user.id === newUser.id ? newUser : user,
    );

    const { password: _, ...rest } = newUser;
    return rest;
  }

  delete(id: string): void | string {
    if (!validate(id)) {
      throw new Error('Invalid id');
    }
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new Error('User not found');
    }

    this.users = this.users.filter((user) => user.id !== id);
  }
}

export default InMemoryUsersStore;
