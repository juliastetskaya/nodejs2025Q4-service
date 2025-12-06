import type { UserEntity } from './user.interface';
import type { CreateUserDto } from '../dto/create-user.dto';
import type { UpdatePasswordDto } from '../dto/update-password.dto';

export interface UsersStore {
  getAllUsers(): UserEntity[];
  getUserById(id: string): UserEntity;
  create(user: CreateUserDto): UserEntity;
  updatePassword(id: string, data: UpdatePasswordDto): UserEntity;
  delete(id: string): void;
}
