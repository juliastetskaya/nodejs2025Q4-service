import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import InMemoryUsersStore, { USERS_STORE_TOKEN } from './users.store';

@Module({
  providers: [
    UsersService,
    {
      provide: USERS_STORE_TOKEN,
      useClass: InMemoryUsersStore,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
