import type { User } from './user.interface';
import type { CreateUserDto } from '../dto/create-user.dto';
import type { UpdatePasswordDto } from '../dto/update-password.dto';

export interface UsersStore {
  getAllUsers(): User[];
  getUserById(id: string): User | null;
  create(user: CreateUserDto): User;
  updatePassword(data: UpdatePasswordDto): User;
  delete(id: string): void;
}
