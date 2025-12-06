import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { USERS_STORE_TOKEN } from './users.store';
import { UsersStore } from './interfaces/users-store.interface';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_STORE_TOKEN) private readonly usersStore: UsersStore,
  ) {}

  getAll() {
    return this.usersStore.getAllUsers();
  }

  create(user: CreateUserDto) {
    return this.usersStore.create(user);
  }

  updatePassword(id: string, data: UpdatePasswordDto) {
    return this.usersStore.updatePassword(id, data);
  }

  getById(id: string) {
    return this.usersStore.getUserById(id);
  }

  delete(id: string) {
    return this.usersStore.delete(id);
  }
}
